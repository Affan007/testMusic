import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-music-meta',
  templateUrl: './music-meta.component.html',
  styleUrls: ['./music-meta.component.scss']
})
export class MusicMetaComponent implements OnInit {
  @Input() PreviewData: any;
  constructor() { }

  ngOnInit() {
  }

}
