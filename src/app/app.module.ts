import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

/*Servicios */

import{HttpClientModule} from '@angular/common/http';

/*Componentes de pagina */
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { HeaderPromotionComponent } from './modules/header-promotion/header-promotion.component';
import { HeaderMobileComponent } from './modules/header-mobile/header-mobile.component';
import { NewlederComponent } from './modules/newleder/newleder.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { SearchComponent } from './pages/search/search.component';
import { Eror404Component } from './pages/eror404/eror404.component';
import { HomeBannerComponent } from './pages/home/home-banner/home-banner.component';
import { HomeFeacturesComponent } from './pages/home/home-feactures/home-feactures.component';
import { HomePromotionsComponent } from './pages/home/home-promotions/home-promotions.component';
import { HomeHotTodayComponent } from './pages/home/home-hot-today/home-hot-today.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderPromotionComponent,
    HeaderMobileComponent,
    NewlederComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    ProductsComponent,
    SearchComponent,
    Eror404Component,
    HomeBannerComponent,
    HomeFeacturesComponent,
    HomePromotionsComponent,
    HomeHotTodayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
