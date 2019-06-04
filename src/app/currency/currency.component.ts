import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  currencies: any = [];
  pollingInterval = 300000; // 5 minutes

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
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
