import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductComponent } from './product/product.component';
import { TestComponent } from './test/test.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';

import { BillComponent } from './bill/bill.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SorterPipe } from './pipe/sorter.pipe';
import { ProductPropertyFilterPipe } from './pipe/product-property-filter.pipe';
import { SearchbarComponent } from './common/searchbar/searchbar.component';
import { TestEditorComponent } from './editor/test-editor/test-editor.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProductComponent,
    TestComponent,
    OrderComponent,
    CategoryComponent,
    CustomerComponent,

    BillComponent,
    TestEditorComponent,

    FilterPipe,

    SorterPipe,

    ProductPropertyFilterPipe,

    SearchbarComponent,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
