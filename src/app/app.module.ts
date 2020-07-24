import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { HeaderPromotionComponent } from './modules/header-promotion/header-promotion.component';
import { HeaderMobileComponent } from './modules/header-mobile/header-mobile.component';
import { NewlederComponent } from './modules/newleder/newleder.component';
import { FooterComponent } from './modules/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderPromotionComponent,
    HeaderMobileComponent,
    NewlederComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
