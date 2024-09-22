import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';

// icons
import {TablerIconsModule} from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import {UiComponentsRoutes} from './ui-components.routing';

// ui components
import {AppRequestComponent} from './Request/requestcomponent';
import {AppListsComponent} from './lists/lists.component';
import {AppMenuComponent} from './menu/menu.component';
import {AppTooltipsComponent} from './tooltips/tooltips.component';
import {MatNativeDateModule} from '@angular/material/core';
import {AppWorkflowComponent} from './workflow/workflow.component';
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {DatePipe} from "@angular/common";
import { WorkflowDialogComponent } from './workflow-dialog/workflow-dialog.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    TableModule,
    DialogModule,
    DatePipe,
  ],
  declarations: [
    AppWorkflowComponent,
    WorkflowDialogComponent,
    AppRequestComponent,
    AppListsComponent,
    AppMenuComponent,
    AppTooltipsComponent,
  ],
})
export class UicomponentsModule {
}
