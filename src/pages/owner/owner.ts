import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { EthHotService } from '../../providers/eth-hot.service';

/**
 * Generated class for the OwnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-owner',
  templateUrl: 'owner.html',
})
export class OwnerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public ethHotSrvc: EthHotService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OwnerPage');
  }

  ionViewWillUnload() {
    //console.log('ionViewWillUnload OwnerPage');
  }

  OnWithdrawClick() {
    let loader = this.loadingCtrl.create({
      content: "请等待...",
      duration: 60 * 1000
    });
    loader.present();

    this.ethHotSrvc.Withdraw().then(ret => {
      alert("取款成功");

      loader.dismiss();
    }).catch(err => {
      console.log(err);
    });
  }
}
