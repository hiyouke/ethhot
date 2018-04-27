import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EthHotService } from '../../providers/eth-hot.service';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public ethHotSrvc: EthHotService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AboutPage');
  }

  ionViewWillUnload() {
    //console.log('ionViewWillUnload AboutPage');
  }

}
