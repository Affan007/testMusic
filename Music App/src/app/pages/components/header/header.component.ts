import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http-service';
import { StorageService } from '../../../services/localStorage.service';
import { Globals } from '../../../Globals';
import { of as observableOf, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute,NavigationEnd  } from '@angular/router';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Public Functions
  public globals = Globals;

  // store the logged in user credentials
  loggedInUser: any;
  userData: any;
  token: any;
  notificationsData: any; // notifications data

  // Class Subscription
  notifications$: Subscription = null;

  // number
  resultsLength: number = 0;
  activeTab: string
  activateRoute: boolean = false;
  isNavbarCollapsed = true;
  doNotShow:boolean=false;
  hideTooltip:boolean=false;
  isReadBit:boolean=false;
  blockUser:boolean=true;

  constructor(public storageService: StorageService, public service: HttpService, private router: Router, private route: ActivatedRoute) {
    // this.alive = true;
    // this.interval = 40000; // every 40 seconds
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if(this.router.url=='/signup'){
            this.doNotShow=true;
          }
          else{
            this.doNotShow=false;
          }
        }
      }
    )

    this.storageService.changes.subscribe(res => {
      this.activeTab = this.storageService.getItem('activeTab');
    });

   
    
  }
  
  ngOnInit() {

    this.userData = JSON.parse(sessionStorage.getItem('Music'));
    this.token = JSON.parse(localStorage.getItem('token'));
    // this.loggedInUser = JSON.parse(localStorage.getItem('boon4-admin'));
    console.log("asdasdasd");
    this.storageService.changes.subscribe(res => {
      this.userData = JSON.parse(sessionStorage.getItem('Music'));
    this.token = JSON.parse(localStorage.getItem('token'));
    if(this.userData && this.userData.stripeConnected==false){
      this.blockUser=true;
    }
    else{
      this.blockUser=false;
    }
    });

    if (this.userData&& this.token) {
      this.activateRoute = true;
      this.getNotifications();
    }
    else {
      this.activateRoute = false;
    }
    if(this.userData && this.userData.name.length<9){
      this.hideTooltip=true;
    }

    if(this.userData && this.userData.stripeConnected==false){
      this.blockUser=true;
    }
    else{
      this.blockUser=false;
    }

  }
  logOut() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // get header notifications
  getNotifications() {
  
  }
  isRead(){
    this.isReadBit=true;
  }
  goto(notification){
    if(notification.redirection==1){
      this.router.navigate(['/packages']);
    }
    else{
      this.router.navigate(['/trips/active']);
    }
  }


  // ng on destroy
  ngOnDestroy(): void {
    if (this.notifications$) this.notifications$.unsubscribe();
    // this.alive = false;
  }

}
