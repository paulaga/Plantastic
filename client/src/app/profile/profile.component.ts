import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { notifService } from '../../services/notif.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  notif: Array<Object> = [];
  
  constructor(private http: Http, private session: SessionService, private notifService: notifService) { 
  }

  ngOnInit() {
  }



}
