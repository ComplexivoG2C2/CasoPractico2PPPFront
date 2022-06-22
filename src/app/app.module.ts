import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {UserComponent} from "./layout/user/user.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {MaterialModule} from "../material/material.module";
import { PrincipalComponent } from './modules/principal/principal.component';
import { CardsComponent } from './modules/principal/cards/cards.component';
import { InstitucionComponent } from './modules/principal/institucion/institucion.component';
import { ContactosComponent } from './modules/principal/contactos/contactos.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FooterComponent,
    PrincipalComponent,
    CardsComponent,
    InstitucionComponent,
    ContactosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
