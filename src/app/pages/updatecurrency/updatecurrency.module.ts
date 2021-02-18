import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatecurrencyPageRoutingModule } from './updatecurrency-routing.module';

import { UpdatecurrencyPage } from './updatecurrency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdatecurrencyPageRoutingModule
  ],
  declarations: [UpdatecurrencyPage]
})
export class UpdatecurrencyPageModule {}
