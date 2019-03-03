import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common'; 
import { PagesRoutingModule } from './pages-routing.module';
import { HeaderComponent } from 'src/app/pages/components/header/header.component';
import {
  MatProgressSpinnerModule,
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { HomeComponent } from './home/home.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MusicMetaComponent } from './music-meta/music-meta.component';
// import { CommonPagesModule } from './common-pages/common-pages.module';
const PAGES_COMPONENTS = [
  PagesComponent,
  HeaderComponent,
  HomeComponent,
];
@NgModule({
  imports: [
    NgbModule,
    MatProgressSpinnerModule,
    PagesRoutingModule,
    CommonModule,
  ],
  exports: [
    MatProgressSpinnerModule,
  ],

  providers: [],

  declarations: [
    ...PAGES_COMPONENTS,
    MusicPlayerComponent,
    MusicMetaComponent,
  ],
})
export class PagesModule {
}
