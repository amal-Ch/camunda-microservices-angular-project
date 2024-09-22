import { Routes } from '@angular/router';


import { AppRequestComponent } from './Request/requestcomponent';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import {AppWorkflowComponent} from "./workflow/workflow.component";
export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'workflow',
        component: AppWorkflowComponent,
      },
      {
        path: 'Request',
        component: AppRequestComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
    ],
  },
];
