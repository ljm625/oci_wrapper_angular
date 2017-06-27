import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {routing, APP_ROUTER_PROVIDERS} from "./app.routes";
import {Auth} from "./services/auth";
import {AddApi} from "./services/api/api/AddApi";
import {DeleteApi} from "./services/api/api/DeleteApi";
import {ModifyApi} from "./services/api/api/ModifyApi";
import {QueryApi} from "./services/api/api/QueryApi";
import {DataService} from "./services/dataservice";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {LoginComponent} from "./components/login/login.component";
import {DashBoard} from "./components/dashboard/dashboard.component";
import {HeadNav} from "./components/ui/headnav";
import {DataTable} from "./components/ui/table";
import {Datasource} from "./components/datasource/datasource.component";
import {DataModal} from "./components/ui/modal";
import {FakeContent, FakeAction, FakeAccordition, FakeAccorditionContent} from "./components/ui/fake";
import {MultiSelect} from "./components/ui/selector";
import {ApiDoc} from "./components/api_doc/api_doc.component";
import {Footer} from "./components/ui/footer";
import {ThresholdDef} from "./components/threshold_def/threshold_def.component";
import {Threshold} from "./components/threshold/threshold.component";
import {RuleSet} from "./components/ruleset/ruleset.component";
import {Popup} from "./components/ui/popup";
import {RuleGroup} from "./components/rulegroup/rulegroup.component";
import {NgSemanticModule} from "ng-semantic/ng-semantic";
import {DragulaModule} from "ng2-dragula";
import {OrderConfig} from "./components/order_config/orderconfig.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoard,
    HeadNav,
    DataTable,
    Datasource,
    DataModal,
    FakeContent,
    FakeAction,
    MultiSelect,
    FakeAccordition,
    FakeAccorditionContent,
    ApiDoc,
    Footer,
    ThresholdDef,
    Threshold,
    RuleSet,
    Popup,
    RuleGroup,
    OrderConfig

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    NgSemanticModule,
    DragulaModule
  ],
  providers: [
    APP_ROUTER_PROVIDERS,
    Auth,
    AddApi,
    DeleteApi,
    ModifyApi,
    QueryApi,
    DataService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
