import { Injectable } from "@angular/core";
import { environment } from '../environments/environment';
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

const { BASEURL } = environment;

@Injectable()
export class wishService {
  wish;

  options: object = { withCredentials:true };

  constructor(private http: Http) {}
    
  getWishes(author){
    return this.http.get(`${BASEURL}/api/wishlist/${author}`, this.options)
    .pipe(map(res => res.json()));
  }
  
  newWish(wish){
    return this.http.post(`${BASEURL}/api/wishlist/`, wish, this.options)
    .pipe(map(res => res.json()));
  }
  
  removeWish(id){
    return this.http.delete(`${BASEURL}/api/wishlist/${id}`, this.options)
    .pipe(map(res => res.json()));
  }

}



