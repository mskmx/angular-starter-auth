import { Menu } from './../../../interfaces/menu';
import { MenuService } from './../../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.pug',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];

  constructor(private _menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu() {
    this._menuService.getMenu().subscribe((data) => {
      this.menu = data;
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
