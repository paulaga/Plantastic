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

  updateNotif(id, last){
    return this.http.put(`${BASEURL}/api/notif/${id}`, last )
    .pipe(map(res => res.json()));
  }

}