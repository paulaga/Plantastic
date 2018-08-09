import { Injectable } from "@angular/core";
import { environment } from '../environments/environment';
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

const { BASEURL } = environment;

@Injectable()
export class plantsService {
  plant;
  tip;
  options: object = { withCredentials:true };

  constructor(private http: Http) {}

  getPlants(author){
    return this.http.get(`${BASEURL}/api/plants/list/${author}`, this.options)
    .pipe(map(res => res.json()));
  }

  getOnePlant(id){
    return this.http.get(`${BASEURL}/api/plants/${id}`, this.options)
    .pipe(map((res:Response) => {
      this.plant = res.json();
      return this.plant;
    }));
  }

  newPlant(plant){
    return this.http.post(`${BASEURL}/api/plants/`, plant, this.options)
    .pipe(map(res => res.json()));
  }

  updatePlant(id, update){
    console.log("Service last Water" + update)
    return this.http.put(`${BASEURL}/api/plants/${id}`, {update}, this.options)
    .pipe(map(res => res.json()));
  }

  removePlant(id){
    return this.http.delete(`${BASEURL}/api/plants/${id}`, this.options)
    .pipe(map(res => res.json()));
  }

  // Plant Tips
  createTips(tip){
    return this.http.post(`${BASEURL}/api/tips/`, tip, this.options)
    .pipe(map(res => res.json()));
  }

  getTips(plantId){
    return this.http.get(`${BASEURL}/api/tips/${plantId}`, this.options)
    .pipe(map(res => res.json()));
  }
}