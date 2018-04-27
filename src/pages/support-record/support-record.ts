import { Component, ChangeDetectorRef } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { EthHotService } from '../../providers/eth-hot.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'page-support-record',
  templateUrl: 'support-record.html'
})
export class SupportPage {

  recordChange: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public ethHotSrvc: EthHotService, public changeDetector: ChangeDetectorRef) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SupportPage');

    this.recordChange = this.ethHotSrvc.recordLengthChange.subscribe(data => this.Refresh());
  }

  ionViewWillUnload() {
    //console.log('ionViewWillUnload SupportPage');

    this.recordChange.unsubscribe();
  }

  Refresh() {
    this.changeDetector.detectChanges();
  }

  OnSupportClick(record: any[]) {
    let loader = this.loadingCtrl.create({
      content: "请等待...",
      duration: 60 * 1000
    });
    loader.present();

    this.ethHotSrvc.SupportRecord(record).then(ret => {
      //console.log('OnSupportClick ret : ' + ret);
      loader.dismiss();

      alert("感谢支持！！！");

      this.ethHotSrvc.GetRecordCount();
    }).catch(err => console.log(err));
  }
}
