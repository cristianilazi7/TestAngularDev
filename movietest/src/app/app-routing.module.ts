import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  {path: '', loadChildren: () => import ('./layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard]},
  {path: 'signin', component: SignInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
