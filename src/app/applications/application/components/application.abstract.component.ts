import { Directive, OnInit, inject, ViewChild } from '@angular/core';

import {
  NgbNav,
  NgbNavItem,
  NgbNavLink,
  NgbNavContent,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import { applicationStatusOptions } from '../../../proxy/applications/application-status.enum';
import type { ApplicationDto } from '../../../proxy/applications/models';
import { ApplicationViewService } from '../services/application.service';
import { ApplicationDetailViewService } from '../services/application-detail.service';
import { VisaComponent } from '../../visa/components/visa-child.component';

export const ChildTabDependencies = [NgbNav, NgbNavItem, NgbNavLink, NgbNavContent, NgbNavOutlet];

export const ChildComponentDependencies = [VisaComponent];

@Directive()
export abstract class AbstractApplicationComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(ApplicationViewService);
  public readonly serviceDetail = inject(ApplicationDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected title = '::Applications';
  protected isActionButtonVisible: boolean | null = null;
  protected isChildEntitiesPermitted: boolean | null = null;

  applicationStatusOptions = applicationStatusOptions;

  @ViewChild('applicationTable') table: any;

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

  update(record: ApplicationDto) {
    this.serviceDetail.update(record);
  }

  delete(record: ApplicationDto) {
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

    const childPermissions = ['VisaFlowApp.Visas'];
    this.isChildEntitiesPermitted = childPermissions.some(permission =>
      this.permissionService.getGrantedPolicy(permission),
    );
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.Applications.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.Applications.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
