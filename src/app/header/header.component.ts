import {Component, DoCheck} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {Button} from "primeng/button";
import {MenubarModule} from "primeng/menubar";
import {NgClass, NgIf} from "@angular/common";
import {MenuItem, PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {Router, RouterOutlet} from "@angular/router"
import {CookieService} from 'ngx-cookie-service';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AvatarModule,
    BadgeModule,
    Button,
    MenubarModule,
    NgIf,
    PrimeTemplate,
    Ripple,
    NgClass,
    RouterOutlet,
    TieredMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements DoCheck{
  items: MenuItem[] | undefined;
  userMenu: MenuItem[] | undefined;
  isLogin:boolean = false;
  constructor(private cookieService: CookieService,private router: Router,) {
  }
  ngDoCheck():void{
    console.log('docheck')
    const token =this.cookieService.get("token");

    if(token){
    this.isLogin = true;
    }else {
      this.isLogin = false;
    }


  }

  ngOnInit() {

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'Features',
        icon: 'pi pi-star'
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Core',
            icon: 'pi pi-bolt',
            shortcut: '⌘+S'
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
            shortcut: '⌘+B'
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
            shortcut: '⌘+U'
          },
          {
            separator: true
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
                badge: '2'
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
                badge: '3'
              }
            ]
          }
        ]
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        badge: '3'
      }
    ];


    this.userMenu = [
      {
        label: '個人資料',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate(['/profile']);
        }
      },
      {
        label: '登出',
        icon: 'pi pi-link',
        command: () => {
          this.cookieService.delete("token");
          this.cookieService.delete("id");
          this.router.navigate(['/login']);
        }
      }
    ];
  }
}
