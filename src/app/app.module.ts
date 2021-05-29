import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlipCardModule } from './flip-card/flip-card.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchFormComponent,
    AdminConsoleComponent,
    EditDialogComponent,
    ConfirmDialogComponent
    
    ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    FlipCardModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[EditDialogComponent]
})
export class AppModule { }
