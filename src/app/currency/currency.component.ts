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
  lastCurrencies: any = [];
  currentCurrencies: any = [];
  error: any = null;
  pollingInterval: number;

  constructor(public rest: RestService, private config: AppConfigService) { }

  ngOnInit() {
    this.pollingInterval = this.config.currencyPollingInterval;
    this.getCurrencies();
    this.getPolledCurrencies();
  }

  getCurrencies() {
    this.rest.getCurrencies().subscribe((data: {}) => {
      this.updateCurrencies(data);
    });
  }

  getPolledCurrencies() {
    interval(this.pollingInterval).pipe(
      switchMap(() => this.rest.getCurrencies().pipe(
        map(res => res)
      )),
    ).subscribe(data => {
      this.updateCurrencies(data);
    });
  }

  updateCurrencies(data) {
    if (data.error == null) {
        this.lastCurrencies = this.currentCurrencies;
        this.currentCurrencies = this.addOldCurrenciesValues(data, this.lastCurrencies);
        this.error = null;
     } else {
        this.error = data;
     }
  }

  addOldCurrenciesValues(currentCurrencies, lastCurrencies) : any {
    currentCurrencies.forEach((bank, bankIndex) => {
        bank.exchange.forEach((currency, currencyIndex) => {
          currency.buyRateVariation = "equal";
          currency.sellRateVariation = "equal";
        })
    });
    
    try {
      if (currentCurrencies.length > 0 && (lastCurrencies.length == currentCurrencies.length)) {
        currentCurrencies.forEach((bank, bankIndex) => {
            bank.exchange.forEach((currency, currencyIndex) => {
              let lastBuyRate = lastCurrencies[bankIndex].exchange[currencyIndex].buyRate;
              let lastSellRate = lastCurrencies[bankIndex].exchange[currencyIndex].sellRate;
              
              currency.buyRateVariation = (currency.buyRate - lastBuyRate > 0) ? "up" : (currency.buyRate - lastBuyRate < 0) ? "down" : "equal";
              currency.sellRateVariation = (currency.sellRate - lastSellRate > 0) ? "up" : (currency.sellRate - lastSellRate < 0) ? "down" : "equal";
            })
        });
      }
    } catch(e) {
      console.log(e);
    }

    return currentCurrencies;
  }
}
