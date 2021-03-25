import { Component, OnInit } from '@angular/core';
import { SpreedlyService } from '../spreedly.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.less']
})
export class PurchaseListComponent implements OnInit {

  transactions: any[] = [];

  constructor(private spreedlyService: SpreedlyService) { }

  getTransaction(): void {
    this.spreedlyService.getTransaction()
        .subscribe(transactions => this.transactions = transactions);
  }

  ngOnInit(): void {
    this.getTransaction()
  }

}