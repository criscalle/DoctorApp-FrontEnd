import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  Username = '';

  constructor(private router: Router, 
              private sharedService: SharedService,
              private cookieService: CookieService)
  {  }

  ngOnInit(): void {
    const Usersession = this.sharedService.getSession();
    if (Usersession!=null) 
      { 
      this.Username = Usersession;
    }
  }

  closesession(){
    this.sharedService.deleteSession();
    this.cookieService.delete('Authorization','/')
    this.router.navigate(['login']);
  }

}
