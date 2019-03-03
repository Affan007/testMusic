import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { Subscription, forkJoin } from 'rxjs';
import { HttpService } from 'src/app/services/http-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../Globals';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { TooltipPosition } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { StorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public globals = Globals;
  private httpSub$: Subscription = null;
  // Type boolean variables
  isLoadingResults = true;
  previewDataFromServer=[];
  constructor(public storageService: StorageService, public zone: NgZone, private httpService: HttpService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
    this.storageService.store('activeTab', 'home');
  }
  ngOnInit() {
   this.getData();
  }

  getData(){

    this.httpSub$ = this.httpService.getRequest(this.globals.urls.getAlldata)
    .pipe(
      map(res => res.data),
    )
    .subscribe(
      data => {
        this.isLoadingResults = false;
        this.previewDataFromServer=data;
      console.log(data);
        // this.httpService.showSuccess('User signed In successfully', 'Sign In');
      },
      err => {
        this.isLoadingResults = false;
        // this.httpService.showError(err);
      }
    );
  }
  goto(data){
    this.router.navigate(['/player'], { queryParams: { songId: data._id}, queryParamsHandling: 'merge' });
  }
  
}