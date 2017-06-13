import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CardsPage } from '../pages/cards/cards';
import { ContentPage } from '../pages/content/content';
import {FirstRunPage, MainPage} from '../pages/pages';
import { ListMasterPage } from '../pages/list-master/list-master';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MenuPage } from '../pages/menu/menu';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ConnectionsPage } from '../pages/connections/connections';
import { ConnectionPage } from '../pages/connection/connection';

import { Settings } from '../providers/providers';

import { TranslateService } from '@ngx-translate/core'

import { User } from '../providers/user';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
        <button menuClose ion-item (click)="logout()">
            Logout
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {

  rootPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    // { title: 'Login', component: LoginPage },
    { title: 'Dashboard', component: DashboardPage },
    { title: 'Connections', component: ConnectionsPage },

    // { title: 'Tutorial', component: TutorialPage },
    // { title: 'Welcome', component: WelcomePage },
    // { title: 'Tabs', component: TabsPage },
    // { title: 'Cards', component: CardsPage },
    // { title: 'Content', component: ContentPage },
    //
    // { title: 'Signup', component: SignupPage },
    // { title: 'Map', component: MapPage },
    // { title: 'Master Detail', component: ListMasterPage },
    // { title: 'Menu', component: MenuPage },
    // { title: 'Settings', component: SettingsPage },
    // { title: 'Search', component: SearchPage },

  ]

  constructor(private translate: TranslateService,
              private platform: Platform,
              settings: Settings,
              private config: Config,
              private user : User,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen) {
    this.initTranslate();

    this.user.isAuthenticated().then((isAuthenticated) => {
      if(isAuthenticated) {
        this.rootPage = MainPage;
      }else{
        this.rootPage = LoginPage;
      }
    }, (err) => {
      this.rootPage = LoginPage;
    });


  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.platform.registerBackButtonAction(() => {
      //
      //
      //   //uncomment this and comment code below to to show toast and exit app
      //   // if (this.backButtonPressedOnceToExit) {
      //   //   this.platform.exitApp();
      //   // } else if (this.nav.canGoBack()) {
      //   //   this.nav.pop({});
      //   // } else {
      //   //   this.showToast();
      //   //   this.backButtonPressedOnceToExit = true;
      //   //   setTimeout(() => {
      //
      //   //     this.backButtonPressedOnceToExit = false;
      //   //   },2000)
      //   // }
      //
      //   if(this.nav.canGoBack()){
      //     this.nav.pop();
      //   }else{
      //
      //   }
      // });
    });
  }

  initTranslate() {
    // Set the default-list language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    this.nav.setRoot(page.component);
  }

  logout() {
    this.user.logout();
    this.nav.setRoot(LoginPage);
  }
}
