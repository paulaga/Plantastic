import { Injectable } from "../../node_modules/@angular/core";
import { environment } from '../environments/environment';
import { Http } from "../../node_modules/@angular/http";
import { map } from "../../node_modules/rxjs/operators";

const { BASEURL } = environment;

@Injectable()
export class wishService {
  wish;

  constructor(private http: Http) {}
    
  getWishes(author){
    return this.http.get(`${BASEURL}/api/wishlist/${author}`)
    .pipe(map(res => res.json()));
  }
  
  newWish(wish){
    return this.http.post(`${BASEURL}/api/wishlist/`, wish)
    .pipe(map(res => res.json()));
  }
  
  removeWish(id){
    return this.http.delete(`${BASEURL}/api/wishlist/${id}`)
    .pipe(map(res => res.json()));
  }

}



