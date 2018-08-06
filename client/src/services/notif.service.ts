import { Injectable } from "../../node_modules/@angular/core";
import { environment } from '../environments/environment';
import { Http } from "../../node_modules/@angular/http";
import { map } from "../../node_modules/rxjs/operators";

const { BASEURL } = environment;

@Injectable()
export class notifService {

  constructor(private http: Http) {}
    
  getNotif(){
    return this.http.get(`${BASEURL}/api/notif/`)
    .pipe(map(res => res.json()));
  }

}