import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { IsSecureGuard } from './service/ssl-redirect.service';

import { MainComponent } from './homepage/main/main.component';
import { CatLevel1MainComponent } from './cat-level1/cat-level1-main/cat-level1-main.component';
import { BrandMainComponent } from './brand/brand-main/brand-main.component';
import { CategoryMainComponent } from './category/category-main/category-main.component';
import { ProductDetMainComponent } from './product-detail/product-det-main/product-det-main.component';
import { DisclaimerComponent } from './others/disclaimer/disclaimer.component';
import { PrivacyComponent } from './others/privacy/privacy.component';
import { OverviewComponent } from './others/overview/overview.component';
import { InvestorsComponent } from './others/investors/investors.component';
import { MilestoneComponent } from './others/milestone/milestone.component';
import { EventspageComponent } from './others/eventspage/eventspage.component';
import { CsrComponent } from './others/csr/csr.component';
import { ContactUsComponent } from './others/contact-us/contact-us.component';
import { SearchMainComponent } from './search/search-main/search-main.component';
import { StoreMainComponent } from './store-locator/store-main/store-main.component';
import { PageNotFoundComponent } from './others/page-not-found/page-not-found.component';
import { SitemapComponent } from './others/sitemap/sitemap.component';
import { WarrantyComponent } from './others/warranty/warranty.component';
import { AccessoriesComponent } from './others/accessories/accessories.component';
import { BlogComponent } from './others/blog/blog.component';
import { BlogsComponent } from './others/blogs/blogs.component';



//let htmlCnf = new HtmlComponentFactory();
const routes: Routes = [
    {
        path:'investors',component: InvestorsComponent
    },{
        path: 'disclaimer', component: DisclaimerComponent
    },{
        path:'privacy',component: PrivacyComponent
    },{
        path:'overview',component: OverviewComponent
    },{
        path:'investors',component: InvestorsComponent
    },{
        path:'milestone',component: MilestoneComponent
    },{
        path:'events',component: EventspageComponent
    },{
        path:'csr',component: CsrComponent
    },{
        path:'contactUs',component: ContactUsComponent
    },{
        path:'warranty',component: WarrantyComponent
    },{
        path:'accessories',component: AccessoriesComponent
    },{
        path:'sitemap',component: SitemapComponent
    },/*{
        path:'blogs',component: BlogsComponent
    },{
        path:'blog/:id/:title',component: BlogComponent
    },*/{
        path: 'search',component: SearchMainComponent
    },{
        path: 'storeLocator',component: StoreMainComponent
    },{
        path: '404',component: PageNotFoundComponent
    },{
        path: 'product/:id/:blurb',component: ProductDetMainComponent
    },{
        path: ':brand', component: BrandMainComponent
    }, {
        path: ':brand/:category',component: CatLevel1MainComponent
    },{
        path: ':brand/:category/:subCategory',component: CategoryMainComponent
        //Note:naming is slightly different from what we have at backend
    },{
        path: '',component: MainComponent
    },{
     path: '**',component: PageNotFoundComponent
    },{
        path: '',redirectTo: '',pathMatch: 'full'
    }
    //htmlCnf.provideComponent({path:'overview',htmlPath:'/assets/html/overview.html',as:'Overview'})
    //new HtmlRoute({ path:'/overview', templateUrl: './assets/html/overview.html',as: 'Impressum' })


/*    {
        path: 'home',component: MainComponent
    },{
        path: ':brand', component: BrandMainComponent,
        children:[{
            path: ':category',
            component: CatLevel1MainComponent,
            children:[{
                path:'',component: CatLevel1MainComponent},{
                path: ':subCategory',component: CategoryMainComponent},{
                path: 'product/:id',component: CategoryMainComponent}
            ]}
        ]
    },{
        path: '',redirectTo: '/home',pathMatch: 'full'
    }*/
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {
    //private IsSecureGuard: IsSecureGuard - PUT below
    constructor(){}
}