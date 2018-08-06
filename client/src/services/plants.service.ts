import { Injectable } from "@angular/core";
import { environment } from '../environments/environment';
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

const { BASEURL } = environment;

@Injectable()
export class plantsService {
  plant;
  tip;

  constructor(private http: Http) {}

  getPlants(author){
    return this.http.get(`${BASEURL}/api/plants/list/${author}`)
    .pipe(map(res => res.json()));
  }

  getOnePlant(id){
    return this.http.get(`${BASEURL}/api/plants/${id}`)
    .pipe(map((res:Response) => {
      this.plant = res.json();
      return this.plant;
    }));
  }

  newPlant(plant){
    return this.http.post(`${BASEURL}/api/plants/`, plant)
    .pipe(map(res => res.json()));
  }

  removePlant(id){
    return this.http.delete(`${BASEURL}/api/plants/${id}`)
    .pipe(map(res => res.json()));
  }

  // Plant Tips
  createTips(tip){
    return this.http.post(`${BASEURL}/api/tips/`, tip)
    .pipe(map(res => res.json()));
  }

  getTips(plantId){
    return this.http.get(`${BASEURL}/api/tips/${plantId}`)
    .pipe(map(res => res.json()));
  }
}