import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'configuration',
    loadChildren: () => import('./pages/configuration/configuration.module').then( m => m.ConfigurationPageModule)
  },
  {
    path: 'insertcurrency',
    loadChildren: () => import('./pages/insertcurrency/insertcurrency.module').then( m => m.InsertcurrencyPageModule)
  },
  {
    path: 'updatecurrency/:id',
    loadChildren: () => import('./pages/updatecurrency/updatecurrency.module').then( m => m.UpdatecurrencyPageModule)
  },
  {
    path: 'updatecurrency',
    loadChildren: () => import('./pages/updatecurrency/updatecurrency.module').then( m => m.UpdatecurrencyPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
