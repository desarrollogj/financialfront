import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { NgHttpLoaderModule } from 'ng-http-loader';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { CurrencyComponent } from './currency/currency.component';
import { AppConfigService } from './appconfig.service';
import { CurrencyValueChangeDirective } from './currency-value-change.directive';

const appRoutes: Routes = [
  {
    path: 'currencies',
    component: CurrencyComponent,
    data: { title: 'Currencies List' }
  },
  { path: '',
    redirectTo: '/currencies',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CurrencyComponent,
    CurrencyValueChangeDirective
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [{
    provide: APP_INITIALIZER,
    multi: true,
    deps: [AppConfigService],
    useFactory: (appConfigService: AppConfigService) => {
      return () => {
        return appConfigService.loadAppConfig();
      };
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
