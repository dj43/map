import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { Stop } from '../models/stops.model';

@Injectable({
  providedIn: 'root',
})
export class StopService {
  private stopCollection: AngularFirestoreCollection<Stop>;
  stopsList: Stop[] = []
  Stops: Observable<DocumentChangeAction<Stop>[]>;

  constructor(private firestore: AngularFirestore, private toastService: ToastrService) {
    this.stopCollection = firestore.collection<Stop>('stop');
    this.Stops = this.stopCollection.snapshotChanges() ;
  }

  getStops() {
    return this.Stops
  }

  addStop(item: Stop) {
    this.stopCollection.add(item).then(() => {
      this.toastService.success('route added')
    });

  }
}
