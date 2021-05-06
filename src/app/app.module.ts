import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlipCardModule } from './flip-card/flip-card.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminConsoleComponent } from './admin-console/admin-console.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchFormComponent,
    AdminConsoleComponent
    ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    FlipCardModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
