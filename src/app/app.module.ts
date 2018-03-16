import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule,  } from '@angular/core';
import { HttpModule, } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToasterModule, ToasterService } from 'angular5-toaster';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { GlobalService } from './global.service';
import { BigvaluePipe } from './bigvalue.pipe';
import { MstotimePipe } from './mstotime.pipe';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';


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
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ToasterModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
