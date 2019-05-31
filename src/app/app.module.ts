import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { NgHttpLoaderModule } from 'ng-http-loader';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { CurrencyComponent } from './currency/currency.component';

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
    CurrencyComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
