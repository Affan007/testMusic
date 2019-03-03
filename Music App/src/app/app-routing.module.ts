
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PreloadSelectedModulesList } from './services/preload_selected_modules_list';
// import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [

  // place: canActivate: [AuthGuard] when connecting full app
  { path: '', loadChildren: './pages/pages.module#PagesModule' },
  // { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],  //initialNavigation: 'enabled' for removing flick
  exports: [RouterModule],
})
export class AppRoutingModule {
}
