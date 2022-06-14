import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Route } from '../models/route.model';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss'],
})
export class RouteListComponent implements OnInit, OnDestroy {
  dataSource: Route[] = [];
  routeList: Route[] = [];
  displayedColumns: string[] = [
    'select',
    'name',
    'direction',
    'status',
    'action',
  ];
  actions: string[] = ['update', 'delete'];
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Route>(true, []);
  mapRoutes: Route[] = [];
  viewRoute = false
  getRoutesSubscription: Subscription | undefined ;

  constructor(private routeService: RouteService, private router: Router) {}


  ngOnInit(): void {
    this.getRoutesSubscription = this.routeService.getRoutes().subscribe((routes) => {
      this.routeList = routes.map((route) => {
        return { ...route.payload.doc.data(), id: route.payload.doc.id };
      });
    });
  }

  toggleRoute(row: Route, status: any): void {
    if (!status) this.mapRoutes.push(row);
    else {
      let index = this.mapRoutes.findIndex((routes) => routes.id === row.id);
      this.mapRoutes.splice(index, 1);
    }
  }

  performAction(action: string,row: Route){
    if(action == 'update')
     this.router.navigate(['update-route',row.id])
    else if(action == 'delete')
      this.routeService.deleteRoute(row.id)
  }

  ngOnDestroy(): void {
    this.getRoutesSubscription?.unsubscribe()
  }
}
