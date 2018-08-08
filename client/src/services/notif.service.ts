import { Injectable } from "@angular/core";
import { environment } from '../environments/environment';
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

const { BASEURL } = environment;

@Injectable()
export class notifService {

  constructor(private http: Http) {}
    
  getNotif(user){
    return this.http.post(`${BASEURL}/api/notif/`,{user})
    .pipe(map(res => res.json()));
  }

  removeNotif(id){
    return this.http.delete(`${BASEURL}/api/notif/${id}`)
    .pipe(map(res => res.json()));
  }

}