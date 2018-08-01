import { Injectable } from "../../node_modules/@angular/core";
import { environment } from '../environments/environment';
import { Http } from "../../node_modules/@angular/http";
import { map } from "../../node_modules/rxjs/operators";

const { BASEURL } = environment;

@Injectable()
export class plantsService {
  constructor(private http: Http) {}

  getPlants(author){
    return this.http.get(`${BASEURL}/api/plants/list/${author}`)
    .pipe(map(res => res.json()));
  }

  getOnePlant(id){
    return this.http.get(`${BASEURL}/api/plants/${id}`)
    .pipe(map(res => res.json()));
  }

  newPlant(plant){
    return this.http.post(`${BASEURL}/api/plants/`, plant)
    .pipe(map(res => res.json()));
  }

  removePlant(id){
    return this.http.delete(`${BASEURL}/api/plants/${id}`)
    .pipe(map(res => res.json()));
  }
}