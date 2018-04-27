import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { SupportPage } from '../pages/support-record/support-record';
import { CreateRecordPage } from '../pages/create-record/create-record';
import { OwnerPage } from '../pages/owner/owner';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HomePage the root (or first) page
  rootPage = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
  ) {
    // set our app's pages
    this.pages = [
      { title: '所有热点', component: HomePage },
      { title: '支持热点', component: SupportPage },
      { title: '提交热点', component: CreateRecordPage },
      { title: "管理员功能", component: OwnerPage },
      { title: "关于我们", component: AboutPage },
    ];
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
