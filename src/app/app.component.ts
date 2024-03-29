import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { ScrolldownComponent } from './scrolldown/scrolldown.component';
import { IntroComponent } from './intro/intro.component';
import { SkillsComponent } from './skills/skills.component';
import { SvgLoaderService } from './svg-loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
      RouterOutlet, 
      HeaderComponent, 
      ScrolldownComponent,
      IntroComponent,
      SkillsComponent
    ],
    providers:[
      SvgLoaderService
    ]

})
export class AppComponent {
  constructor(private svgLoaderService:SvgLoaderService){}
}
