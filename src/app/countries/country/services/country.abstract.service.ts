import { inject, computed, signal } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { filter, switchMap, finalize } from 'rxjs/operators';
import type { GetCountriesInput, CountryDto } from '../../../proxy/countries/models';
import { CountryService } from '../../../proxy/countries/country.service';

export abstract class AbstractCountryViewService {
  protected readonly proxyService = inject(CountryService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly list = inject(ListService);

  data: PagedResultDto<CountryDto> = {
    items: [],
    totalCount: 0,
  };

  selectionType = SelectionType;
  selected = signal<CountryDto[]>([]);
  allSelected = signal(false);
  selectedCount = computed(() => this.selected().length);

  filters = {} as GetCountriesInput;

  protected clearAllSelection() {
    this.selected.set([]);
    this.allSelected.set(false);
  }

  protected bulkDeleteRequest() {
    const ids = this.selected().map(({ id }) => id);

    const request = !this.allSelected()
      ? this.proxyService.deleteByIds(ids)
      : this.proxyService.deleteAll({
          filterText: this.list.filter,
          ...this.filters,
        });

    return request.pipe(finalize(this.list.get));
  }

  delete(record: CountryDto) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.proxyService.delete(record.id)),
      )
      .subscribe(this.list.get);
  }

  bulkDelete() {
    if (this.selectedCount() < 1) {
      return;
    }

    let message = '::';
    let messageParam = null;

    if (this.allSelected()) {
      message += 'DeleteAllRecords';
    } else {
      message += 'DeleteSelectedRecords';
      messageParam = this.selectedCount().toString();
    }

    this.confirmationService
      .warn(message, 'AbpUi::AreYouSure', {
        messageLocalizationParams: [messageParam],
      })
      .pipe(
        filter(result => result === Confirmation.Status.confirm),
        switchMap(() => this.bulkDeleteRequest()),
      )
      .subscribe();
  }

  selectAll() {
    this.allSelected.set(!this.allSelected());
    this.selected.set(this.allSelected() ? [...this.data.items] : []);
  }

  onSelect({ selected }) {
    if (selected.length < 1) {
      this.clearAllSelection();
      return;
    }

    if (selected.length === this.data.totalCount) {
      this.allSelected.set(true);
      this.selected.set(selected);
      return;
    }

    if (selected.length !== this.data.totalCount && this.allSelected()) {
      this.allSelected.set(false);
    }

    if (selected.length === 1) {
      this.selected.set([...this.selected()]);
      return;
    }

    this.selected.set(selected);
  }

  hookToQuery() {
    const getData = (query: ABP.PageQueryParams) =>
      this.proxyService.getList({
        ...query,
        ...this.filters,
        filterText: query.filter,
      });

    const setData = (list: PagedResultDto<CountryDto>) => {
      this.data = list;

      if (this.selectedCount() > 0) {
        this.clearAllSelection();
      }
    };

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetCountriesInput;
    this.list.get();
  }
}
