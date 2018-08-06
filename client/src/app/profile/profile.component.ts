import { Component, OnInit } from '@angular/core';
import { Http } from '../../../node_modules/@angular/http';
import { notifService } from '../../services/notif.service';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  notif: Array<Object> = [];
  
  constructor(private http: Http, private session: SessionService, private notifService: notifService) { 
    this.notifService.getNotif()
    .subscribe(data => this.notif = data);
    console.log("Siiiii")
  }

  ngOnInit() {
  }



}
