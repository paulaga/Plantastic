import { Injectable } from "@angular/core";
import { environment } from '../environments/environment';
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

const { BASEURL } = environment;

@Injectable()
export class playListService {

  constructor(private http: Http) {}

  getPlaylist(){
    return this.http.get(`${BASEURL}/api/play`)
    .pipe(map(res => res.json()));
  }
  
}



