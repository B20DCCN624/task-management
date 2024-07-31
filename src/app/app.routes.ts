import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostTaskComponent } from './components/post-task/post-task.component';
import { ViewComponent } from './components/view/view.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'post', component: PostTaskComponent},
  {path: 'view/:id', component: ViewComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];
