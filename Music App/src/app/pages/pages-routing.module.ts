import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MusicPlayerComponent } from 'src/app/pages/music-player/music-player.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  // canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'player',
      component: MusicPlayerComponent
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
