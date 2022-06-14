import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private routeCollection: AngularFirestoreCollection<Route>;
  routeList: Route[] = []
  routes: Observable<DocumentChangeAction<Route>[]>;
  constructor(private firestore: AngularFirestore, private toastService: ToastrService) {
    this.routeCollection = firestore.collection<Route>('route');
    this.routes = this.routeCollection.snapshotChanges() ;

  }

  getRoutes() {
    return this.routes
  }

  getRouteById(id: string) {

    return this.routeCollection.doc(id).get() ;

  }

  addRoute(route: Route) {
    this.routeCollection.add(route).then(() => {
      this.toastService.success('route added')
    });
  }

  updateRoute(id: string, route: Route) {
    this.routeCollection.doc(id).update(route).then(() => {
      this.toastService.success('route updated')
    });
  }

  deleteRoute(id: string) {
    this.routeCollection.doc(id).delete().then(() => {
      this.toastService.success('route deleted')
    });
  }
}
