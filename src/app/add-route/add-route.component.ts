import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { StopService } from '../services/stop.service';
import { Stop } from '../models/stops.model';
import { RouteService } from '../services/route.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss'],
})
export class AddRouteComponent implements OnInit {
  stop: string = '';
  routeForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER];
  stops: Stop[] = [];
  stopsList: Stop[] = [];
  routeId: string | undefined;
  getRouteSubscription: Subscription | undefined
  getStopsSubscription: Subscription | undefined
  constructor(
    private formBuilder: FormBuilder,
    private stopService: StopService,
    private routeService: RouteService,
    private route: ActivatedRoute,
    private toastService: ToastrService
  ) {
    this.routeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.routeId = params['id'];
        this.getRouteById(params['id']);
      }
    });

    this.getStopsSubscription = this.stopService.getStops().subscribe((stops) => {
      this.stopsList = stops.map((stop) => {
        return { ...stop.payload.doc.data(), id: stop.payload.doc.id };
      });
      this.stopService.stopsList = this.stopsList;
    });
  }

  getRouteById(id: string) {
    this.routeService.getRouteById(id).subscribe((route) => {
      let routeData = route.data();
      if (!routeData) return;
      this.routeForm.patchValue({
        name: routeData.name,
        direction: routeData.direction,
        status: routeData.status,
      });
      this.stops = routeData.stops || [];
    });
  }

  remove(removedStop: Stop): void {
    // make flag false if spot is removed
    this.stops = this.stops.filter((stop) => stop.id !== removedStop.id);
  }

  add(index: number): void {
    // skip if the stop is already added
    let findIndex = this.stops?.findIndex(
      (stop) => stop.id === this.stopsList[index].id
    ) || -1;
    if (findIndex !== -1)return;
    this.stops.push(this.stopsList[index]);
    this.stop = '';
  }

  addRoute() {
    if(!this.routeForm.valid){
      this.toastService.error('invalid Form')
      return
    }
    if (this.routeId)
      this.routeService.updateRoute(this.routeId,{
        ...this.routeForm.value,
        stops: this.stops,
      });
    else
      this.routeService.addRoute({
        ...this.routeForm.value,
        stops: this.stops,
      });
  }

  ngOnDestroy(): void {
    this.getRouteSubscription?.unsubscribe()
    this.getStopsSubscription?.unsubscribe()
  }
}
