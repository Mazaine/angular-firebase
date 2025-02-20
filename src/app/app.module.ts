import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './enviroments/environments';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), //firebase összekötése az angularrel
    provideFirestore(() => getFirestore()), //firestore összekötése az angularrel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
