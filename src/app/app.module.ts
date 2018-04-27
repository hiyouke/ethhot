import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SupportPage } from '../pages/support-record/support-record';
import { CreateRecordPage } from '../pages/create-record/create-record';
import { OwnerPage } from '../pages/owner/owner';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EthHotService } from "../providers/eth-hot.service"

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SupportPage,
    CreateRecordPage,
    OwnerPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SupportPage,
    CreateRecordPage,
    OwnerPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EthHotService
  ]
})
export class AppModule { }
