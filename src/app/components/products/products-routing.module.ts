import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ProductsComponent } from './products.component';
import { SaveComponent } from './save/save.component';

const routes: Routes = [

  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'save',
    component: SaveComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
