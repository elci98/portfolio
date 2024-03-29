import { Component,  ElementRef,  HostListener, Renderer2, ViewChild } from '@angular/core';
import { SkillItemComponent } from './skill-item/skill-item.component';
import { skillsList } from './skills.list';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SkillItemComponent, NgFor],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  constructor(private renderer: Renderer2){}

  @ViewChild('skillsListWrraper') skillsListWrraper?: ElementRef;
  @ViewChild('skillsListItem') skillsListItem?: SkillItemComponent;
  
  elementWidthFactor = 30

  @HostListener('window:resize', ['$event'])
  @HostListener('window:load', ['$event'])
  onload(event:any) {

    const elementWidth = this.skillsListItem?.el?.nativeElement.getBoundingClientRect().width;
    const parentWidth = this.skillsListWrraper?.nativeElement.parentElement.getBoundingClientRect().width;
    const numOfItems =  Math.min(Math.floor(parentWidth / elementWidth), 3);
    const padding = (numOfItems-1)* (elementWidth/30);
    this.renderer.setStyle(this.skillsListWrraper?.nativeElement, "width", `${ elementWidth * numOfItems + padding }px`);
    console.log(`width updated to: ${numOfItems * elementWidth + padding}`);
  }

  get skillsList(){
    return skillsList;
  }
}
