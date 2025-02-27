import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './enviroments/environments';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CustomerComponent } from "./components/customer/customer.component";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  AppComponent,
  CustomerComponent
],
imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule
],
  providers: [
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), //firebase összekötése az angularrel
    provideFirestore(() => getFirestore()), //firestore összekötése az angularrel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
