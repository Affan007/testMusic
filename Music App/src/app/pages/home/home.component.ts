import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http-service';
import { Router } from '@angular/router';
import { Globals } from '../../Globals';
import { map } from 'rxjs/operators';
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
  previewDataFromServer = [];
  constructor(private httpService: HttpService, private router: Router) {
  }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.httpSub$ = this.httpService.getRequest(this.globals.urls.getAlldata)
      .pipe(
      map(res => res.data),
    )
      .subscribe(
      data => {
        this.isLoadingResults = false;
        this.previewDataFromServer = data;
      },
      err => {
        this.isLoadingResults = false;
        // this.httpService.showError(err);
      }
      );
  }
  goto(data) {
    this.router.navigate(['/player'], { queryParams: { songId: data._id }, queryParamsHandling: 'merge' });
  }
}