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

//import {  AgmCoreModule} from '@agm/core';

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
import { ProductEditorComponent } from './editor/product-editor/product-editor.component';
import { Test2EditorComponent } from './editor/test2-editor/test2-editor.component';
import { EditorComponent } from './editor/editor.component';
import { ToastrModule } from 'ngx-toastr';

import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(), // ToastrModule added
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    DragDropModule,
    CommonModule,
    A11yModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    //     AgmCoreModule.forRoot({
    //       apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    //     })
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

    ProductEditorComponent,

    Test2EditorComponent,

    EditorComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
