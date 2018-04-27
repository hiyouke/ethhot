import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { EthHotService } from '../../providers/eth-hot.service';

import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the CreateRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-record',
  templateUrl: 'create-record.html',
})
export class CreateRecordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public ethHotSrvc: EthHotService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CreateRecordPage');
  }

  ionViewWillUnload() {
    //console.log('ionViewWillUnload CreateRecordPage');
  }

  OnBidClick(name: HTMLInputElement, link: HTMLInputElement, price: HTMLInputElement) {
    //console.log("name : " + name.value, link.value, price.value);
    if (name.value.length <= 0) {
      alert("请输入文案");
      return;
    }
    if (name.value.length > 20) {
      alert("文案不能超过20个字符");
      return;
    }
    if (link.value.length <= 0) {
      alert("请输入链接");
      return;
    }
    if (link.value.length > 50) {
      alert("链接不能超过50个字符");
      return;
    }

    let loader = this.loadingCtrl.create({
      content: "请等待...",
      duration: 60 * 1000
    });
    loader.present();

    this.ethHotSrvc.CreateRecord(name.value, link.value, price.value).then(ret => {
      alert("提交竞价成功");
      loader.dismiss();
      this.navCtrl.setRoot(HomePage);
    }).catch(err => console.log(err));
  }
}
