import { Component } from '@angular/core';

@Component({
  selector: 'app-header-expanded',
  templateUrl: './header-expanded.component.html',
  styleUrls: ['./header-expanded.component.css']
})
export class HeaderExpandedComponent  {
   panelOpenState: boolean = false;
}
