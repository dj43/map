import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Route } from '../models/route.model';

@Component({
  selector: 'app-map-route',
  templateUrl: './map-route.component.html',
  styleUrls: ['./map-route.component.scss'],
})
export class MapRouteComponent implements OnInit {
  @Input() routes: Route[] = [];

  zoom: number = 8;
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>[] =
    [];
  options: google.maps.MapOptions = {};

  constructor(private mapDirectionsService: MapDirectionsService) {}

  mapRoute() {
    this.routes.forEach((route, index) => {
      if (route && route.stops?.length > 1) {
        let waypoints: google.maps.DirectionsWaypoint[] = [];
        if (route.stops.length > 2) {
          for (let i = 1; i < route.stops.length - 1; i++) {
            waypoints.push({
              location: new google.maps.LatLng(
                +route.stops[i].latitude,
                +route.stops[i].longitude
              ),
              stopover: true,
            });
          }
        }
        const request: google.maps.DirectionsRequest = {
          destination: {
            lat: +route.stops[route.stops.length - 1].latitude,
            lng: +route.stops[route.stops.length - 1].longitude,
          },
          waypoints: waypoints,
          origin: {
            lat: +route.stops[0].latitude,
            lng: +route.stops[0].longitude,
          },
          travelMode: google.maps.TravelMode.DRIVING,
        };

        this.directionsResults$[index] = this.mapDirectionsService
          .route(request)
          .pipe(map((response) => response.result));

        this.options = {
          // center: { lat: 28.681766, lng: 77.457125 },

          center: {
            lat: +route.stops[0].latitude,
            lng: +route.stops[0].longitude,
          },
          zoom: 14,
        };
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.mapRoute();
  }

  ngOnInit(): void {}
}
