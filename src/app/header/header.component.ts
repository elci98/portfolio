import { CommonModule, NgIf } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule, NgIf],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  displayMenu=false;
  constructor(private renderer: Renderer2){}
}
