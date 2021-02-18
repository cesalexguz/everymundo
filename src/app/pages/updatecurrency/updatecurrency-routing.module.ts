import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatecurrencyPage } from './updatecurrency.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatecurrencyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatecurrencyPageRoutingModule {}
