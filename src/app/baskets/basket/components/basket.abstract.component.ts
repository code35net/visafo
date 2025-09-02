import { Directive, OnInit, inject, ViewChild } from '@angular/core';

import {
  NgbNav,
  NgbNavItem,
  NgbNavLink,
  NgbNavContent,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import type { BasketWithNavigationPropertiesDto } from '../../../proxy/baskets/models';
import { BasketViewService } from '../services/basket.service';
import { BasketDetailViewService } from '../services/basket-detail.service';
import { BasketItemComponent } from '../../basket-item/components/basket-item-child.component';

export const ChildTabDependencies = [NgbNav, NgbNavItem, NgbNavLink, NgbNavContent, NgbNavOutlet];

export const ChildComponentDependencies = [BasketItemComponent];

@Directive()
export abstract class AbstractBasketComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(BasketViewService);
  public readonly serviceDetail = inject(BasketDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected title = '::Baskets';
  protected isActionButtonVisible: boolean | null = null;
  protected isChildEntitiesPermitted: boolean | null = null;

  @ViewChild('basketTable') table: any;

  ngOnInit() {
    this.service.hookToQuery();
    this.checkActionButtonVisibility();
    this.checkChildEntityPermissions();
  }

  clearFilters() {
    this.service.clearFilters();
  }

  showForm() {
    this.serviceDetail.showForm();
  }

  create() {
    this.serviceDetail.selected = undefined;
    this.serviceDetail.showForm();
  }

  update(record: BasketWithNavigationPropertiesDto) {
    this.serviceDetail.update(record);
  }

  delete(record: BasketWithNavigationPropertiesDto) {
    this.service.delete(record);
  }

  exportToExcel() {
    this.service.exportToExcel();
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  checkChildEntityPermissions() {
    if (this.isChildEntitiesPermitted !== null) {
      return;
    }

    const childPermissions = ['VisaFlowApp.BasketItems'];
    this.isChildEntitiesPermitted = childPermissions.some(permission =>
      this.permissionService.getGrantedPolicy(permission),
    );
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.Baskets.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.Baskets.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
