import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/tabs/home',
    pathMatch: 'full', 
  }, 
  {
    path: 'tabs', 
    component: TabsPage,
    children: [
      {
        path: 'camera', 
        loadChildren: () => import('./tabs/camera/camera.module').then(m => m.CameraPageModule) //lazy loading 
      }, 
      {
        path: 'recipes', 
        loadChildren: () => import('./tabs/recipes/recipes.module').then(m => m.RecipesPageModule)
      },
      {
        path: 'favorites', 
        loadChildren: () => import('./tabs/favorites/favorites.module').then(m => m.FavoritesPageModule)
      },
      {
        path: 'home', 
        loadChildren: () => import('./tabs/home/home.module').then(m => m.HomePageModule)
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
