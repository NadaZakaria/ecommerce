import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepassComponent } from './changepass/changepass.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { ChangephotoComponent } from './changephoto/changephoto.component';

const routes: Routes = [
  {path:" " , redirectTo:"changePass" , pathMatch:"full"},
  {path:"changePass", component:ChangepassComponent},
  {path:"forgetPass", component:ForgetpassComponent},
  {path:"changePhoto" , component:ChangephotoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
