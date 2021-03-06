import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSave() {
    if (this.router.url === "/shopping-list") {
      this.dataStorageService.storeShoppingList().subscribe(
        (response: Response) => {
          console.log(response);
        }
      )
    } else {
      this.dataStorageService.storeRecipes().subscribe(
        (response: Response) => {
          console.log(response);
        }
      )
    }
  }

  onFetch() {
    if (this.router.url === "/shopping-list")
      this.dataStorageService.getShoppingList()
    else
      this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
