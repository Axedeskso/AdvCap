import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { GlobalService } from './global.service';
import { BigvaluePipe } from './bigvalue.pipe';
import { MstotimePipe } from './mstotime.pipe';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    BigvaluePipe,
    MstotimePipe,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
