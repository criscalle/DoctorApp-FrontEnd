import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  Username = '';


  constructor(private router: Router, private sharedService: SharedService)
  {  }

  ngOnInit(): void {
    const session = this.sharedService.getSession();
    if (session) 
      { 
      this.Username = session.username;
    }
  }

  closesession(){
    this.sharedService.deleteSession();
    this.router.navigate(['login']);
  }

}
