import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { SiteNavigationService } from './service/site-navigation.service';
import { BreadcrumbService } from './service/breadcrumb.service';
import { MapsService } from './service/maps.service';
import { MatchMediaService } from './service/match-media-service.service';
import { GetLocalTextData } from './service/get-local-text-data.service';
import { GetLocalJsonData } from './service/get-local-JSON-data.service';

import { CarouselModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { CycleOfChoiceComponent } from './homepage/cycle-of-choice/cycle-of-choice.component';
import { HeroCarouselComponent } from './cmp/hero-carousel/hero-carousel.component';
import { NavMenuComponent } from './cmp/nav-menu/nav-menu.component';
import { NavMenuItemComponent } from './cmp/nav-menu-item/nav-menu-item.component';
import { CommunityComponent } from './homepage/community/community.component';
import { PageCarouselComponent } from './cmp/page-carousel/page-carousel.component';
import { EventsComponent } from './homepage/events/events.component';
import { MainComponent } from './homepage/main/main.component';
import { CatLevel1MainComponent } from './cat-level1/cat-level1-main/cat-level1-main.component';
import { BrandMainComponent } from './brand/brand-main/brand-main.component';
import { CategoryMainComponent } from './category/category-main/category-main.component';
import { CategoryHeaderComponent } from './category/category-header/category-header.component';
import { CategoryFilterComponent } from './category/category-filter/category-filter.component';
import { CategoryProductsComponent } from './category/category-products/category-products.component';
import { CategoryProductComponent } from './category/category-product/category-product.component';
import { QuickViewModalComponent } from './cmp/quick-view-modal/quick-view-modal.component';
import { ProductDetMainComponent } from './product-detail/product-det-main/product-det-main.component';
import { ProdHeaderComponent } from './product-detail/prod-header/prod-header.component';
import { ProdSpecificationComponent } from './product-detail/prod-specification/prod-specification.component';
import { ProdCarouselComponent } from './product-detail/prod-carousel/prod-carousel.component';
import { ProdSimilarProductsComponent } from './product-detail/prod-similar-products/prod-similar-products.component';
import { ProdViewedProductsComponent } from './product-detail/prod-viewed-products/prod-viewed-products.component';
import { SalientFeaturesComponent } from './product-detail/salient-features/salient-features.component';
import { CompareProductSelectorComponent } from './product-detail/compare-product-selector/compare-product-selector.component';
import { DisclaimerComponent } from './others/disclaimer/disclaimer.component';
import { PrivacyComponent } from './others/privacy/privacy.component';
import { OverviewComponent } from './others/overview/overview.component';
import { InvestorsComponent } from './others/investors/investors.component';
import { MilestoneComponent } from './others/milestone/milestone.component';
import { EventspageComponent } from './others/eventspage/eventspage.component';
import { CsrComponent } from './others/csr/csr.component';
import { NumFlyoutComponent } from './homepage/num-flyout/num-flyout.component';
import { CompareProdPopUpComponent } from './product-detail/compare-prod-pop-up/compare-prod-pop-up.component';
import { ContactUsComponent } from './others/contact-us/contact-us.component';
import { PageNotFoundComponent } from './others/page-not-found/page-not-found.component';
import { EvenoddPipe } from './pipe/evenodd.pipe';
import { SearchMainComponent } from './search/search-main/search-main.component';
import { BottomBarComponent } from './cmp/bottom-bar/bottom-bar.component';
import { StoreMainComponent } from './store-locator/store-main/store-main.component';


@NgModule({
  declarations: [
    AppComponent,
    CycleOfChoiceComponent,
    HeroCarouselComponent,
    NavMenuComponent,
    NavMenuItemComponent,
    CommunityComponent,
    PageCarouselComponent,
    EventsComponent,
    MainComponent,
    CatLevel1MainComponent,
    BrandMainComponent,
    CategoryMainComponent,
    CategoryHeaderComponent,
    CategoryFilterComponent,
    CategoryProductsComponent,
    CategoryProductComponent,
    QuickViewModalComponent,
    ProductDetMainComponent,
    ProdHeaderComponent,
    ProdSpecificationComponent,
    ProdCarouselComponent,
    ProdSimilarProductsComponent,
    ProdViewedProductsComponent,
    SalientFeaturesComponent,
    CompareProductSelectorComponent,
    DisclaimerComponent,
    PrivacyComponent,
    OverviewComponent,
    InvestorsComponent,
    MilestoneComponent,
    EventspageComponent,
    CsrComponent,
    NumFlyoutComponent,
    CompareProdPopUpComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    EvenoddPipe,
    SearchMainComponent,
    BottomBarComponent,
    StoreMainComponent
  ],
  imports: [
    BrowserModule,
      HttpModule,
      AppRoutingModule,
      FormsModule,
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyAe5Y7Rfb2DNJxFPtvqqGhy7YA4GyiBEwE',//'AIzaSyDbggqB9QbkICzRiAkgkb9xHd9zy22-ZXU',
          libraries: ["places"]
          }),
      CarouselModule.forRoot(),
      ModalModule.forRoot()
  ],
  providers: [SiteNavigationService,
                BreadcrumbService,
                MapsService,
                MatchMediaService,
                GetLocalTextData,
                GetLocalJsonData],
  bootstrap: [AppComponent]
})

export class AppModule {
}
