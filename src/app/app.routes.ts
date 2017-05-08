/**
 * Created by jiaminli on 2017/5/4.
 */
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "app/services/authguard";
import {DashBoard} from "app/components/dashboard/dashboard.component";
import {Datasource} from "app/components/datasource/datasource.component";
import {ApiDoc} from "app/components/api_doc/api_doc.component";
import {ThresholdDef} from "app/components/threshold_def/threshold_def.component";
import {Threshold} from "app/components/threshold/threshold.component";
import {RuleSet} from "app/components/ruleset/ruleset.component";
import {RuleGroup} from "app/components/rulegroup/rulegroup.component";
import {LoginComponent} from "app/components/login/login.component";

export const routes: Routes = [
  { path: '', component: DashBoard, pathMatch: 'full' },
  // {   path: 'reviews',
  //     component: ReviewComponent,
  //     children: [
  //         { path: '', component: StatisticReviewComponent },
  //         { path: 'add', component: AddReviewComponent }
  //     ]
  // },
  { path: 'datasource', component: Datasource },
  { path: 'threshold_def', component: ThresholdDef },
  { path: 'threshold', component: Threshold },
  { path: 'ruleset', component: RuleSet },
  { path: 'rulegroup', component: RuleGroup },
  { path: 'api', component: ApiDoc },
  { path: 'login', component: LoginComponent }
];

export const APP_ROUTER_PROVIDERS: Array<{}> = [
  AuthGuard,
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
