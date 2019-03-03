import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HeaderComponent } from 'src/app/pages/components/header/header.component';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule,
  MatCheckboxModule,
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatToolbarModule, MatDialogModule } from '@angular/material';
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
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatCardModule,
    NgxChartsModule,
    MatToolbarModule,
    MatCheckboxModule,
    PagesRoutingModule,
  ],
  exports: [
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatCardModule,
    AgmCoreModule,
    NgxChartsModule,
    MatToolbarModule,
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
