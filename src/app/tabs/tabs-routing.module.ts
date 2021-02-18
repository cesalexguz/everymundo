import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'config',
        loadChildren: () => import('../pages/configuration/configuration.module').then(m => m.ConfigurationPageModule)
      },
      {
        path: 'insertcurrency',
        loadChildren: () => import('../pages/insertcurrency/insertcurrency.module').then(m => m.InsertcurrencyPageModule)
      },
      {
        path: 'updatecurrency/:id',
        loadChildren: () => import('../pages/updatecurrency/updatecurrency.module').then( m => m.UpdatecurrencyPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
