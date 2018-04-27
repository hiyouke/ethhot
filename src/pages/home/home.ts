import { Component, ChangeDetectorRef } from '@angular/core';

import { EthHotService } from '../../providers/eth-hot.service';

import { Subscription } from 'rxjs';

import { } from "eth-lightwallet/";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  recordChange: Subscription;

  constructor(public ethHotSrvc: EthHotService, public changeDetector: ChangeDetectorRef) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HomePage');

    this.recordChange = this.ethHotSrvc.recordLengthChange.subscribe(data => this.Refresh());

    this.ethHotSrvc.GetRecordCount();
  }

  ionViewWillUnload() {
    //console.log('ionViewWillUnload HomePage');

    this.recordChange.unsubscribe();
  }

  Refresh() {
    this.changeDetector.detectChanges();
  }

  OnItemTapped(record) {
    window.open(record[3], '_blank')
  }

}
