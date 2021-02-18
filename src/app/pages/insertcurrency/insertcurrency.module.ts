import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertcurrencyPageRoutingModule } from './insertcurrency-routing.module';

import { InsertcurrencyPage } from './insertcurrency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InsertcurrencyPageRoutingModule
  ],
  declarations: [InsertcurrencyPage]
})
export class InsertcurrencyPageModule {}
