import { Stop } from "./stops.model";

export interface Route {
  id: string;
  name: string;
  direction: string;
  status: boolean;
  stops: Stop[]

}
