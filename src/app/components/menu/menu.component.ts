import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from '../../services/auth-service.service';

import { MarketServiceService } from '../../services/market-service.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  logAuth: any;
  constructor( private authservice: AuthServiceService,
               public marketService: MarketServiceService,
               public router: Router ) {
    this.logAuth = this.authservice;
  }

  ngOnInit() {
  }


}
