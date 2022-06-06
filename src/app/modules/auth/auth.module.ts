import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../../../material/material.module";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import { LoginempresaComponent } from './loginempresa/loginempresa.component';

const routes: Routes = [
  {
    path: 'inicio_sesion',
    component: IniciosesionComponent
  },{
    path: 'loginempresa',
    component: LoginempresaComponent
  }
];

@NgModule({
  declarations: [
    IniciosesionComponent,
    LoginempresaComponent
  ],
  exports:[RouterModule],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
  ],providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '371406246655-jr38sv71j7pog0vmatbqu6e2oiik9lc8.apps.googleusercontent.com'

            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ]
})
export class AuthModule { }
