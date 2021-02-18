import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertcurrencyPage } from './insertcurrency.page';

const routes: Routes = [
  {
    path: '',
    component: InsertcurrencyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertcurrencyPageRoutingModule {}
