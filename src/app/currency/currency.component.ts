import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { interval } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AppConfigService } from '../appconfig.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  currencies: any = [];
  pollingInterval: number;

  constructor(public rest: RestService, private config: AppConfigService) { }

  ngOnInit() {
    this.pollingInterval = this.config.currencyPollingInterval;
    this.getCurrencies();
    this.getPolledCurrencies();
  }

  getCurrencies() {
    this.rest.getCurrencies().subscribe((data: {}) => {
      this.currencies = data;
    });
  }

  getPolledCurrencies() {
    interval(this.pollingInterval).pipe(
      switchMap(() => this.rest.getCurrencies().pipe(
        map(res => res)
      )),
    ).subscribe(data => {
      this.currencies = data;
    });
  }
}
