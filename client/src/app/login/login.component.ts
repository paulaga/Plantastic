import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private sessionService:SessionService, private router : Router) { }

  ngOnInit() {
  }

  login(username:string, password:string){
    this.sessionService.login(username,password).subscribe( user => {
      this.router.navigate(['/profile']);
    });
  }
}
