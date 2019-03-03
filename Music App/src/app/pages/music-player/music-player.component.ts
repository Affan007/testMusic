import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../Globals';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { }
  public globals = Globals;
  private httpSub$: Subscription = null;
  // Type boolean variables
  isLoadingResults = true;
  previewDataFromServer: any = {};
  musicId: string;
  @ViewChild('player') player: ElementRef;
  ngOnInit() {
    this.musicId = this.route.snapshot.queryParamMap.get("songId")
    this.getData();
  }
  ngAfterViewInit() {
    this.player.nativeElement.play();
  }

  getData() {
    let url = this.globals.urls.getSingleSongData;
    url = url.replace(':id', this.musicId.toString());

    this.httpSub$ = this.httpService.getRequest(url)
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
}
