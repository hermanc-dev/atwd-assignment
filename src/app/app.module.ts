import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlipCardModule } from './flip-card/flip-card.module';
import { SearchFormComponent } from './search-form/search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    FlipCardModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
