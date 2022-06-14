import { MapRouteComponent } from './map-route/map-route.component';
import { RouteListComponent } from './route-list/route-list.component';
import { AddRouteComponent } from './add-route/add-route.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStopComponent } from './add-stop/add-stop.component';

const routes: Routes = [
  { path: 'add-route', component: AddRouteComponent },
  { path: 'update-route/:id', component: AddRouteComponent },

  { path: 'add-stop', component: AddStopComponent },
  {
    path: 'route-list',
    component: RouteListComponent,
    // children: [
    //   {
    //     path: 'route-list',
    //     component: MapRouteComponent,
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
