import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ChangepassComponent } from './changepass/changepass.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { ChangephotoComponent } from './changephoto/changephoto.component';


@NgModule({
  declarations: [
    ChangepassComponent,
    ForgetpassComponent,
    ChangephotoComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
