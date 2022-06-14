import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddRouteComponent } from './add-route/add-route.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStopComponent } from './add-stop/add-stop.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RouteListComponent } from './route-list/route-list.component';
import { MatTableModule } from '@angular/material/table'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MapRouteComponent } from './map-route/map-route.component';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent, AddRouteComponent, AddStopComponent, RouteListComponent, MapRouteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    MatToolbarModule

  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
