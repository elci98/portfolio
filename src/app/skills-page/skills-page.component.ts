/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, ViewChild } from '@angular/core';
import { staticSkillsList } from './skills.list';
import { SkillItemComponent } from '../skills/skill-item/skill-item.component';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [SkillItemComponent, NgClass, NgFor],
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss',
})
export class SkillsPageComponent {
  @ViewChild('skillsListItem') skillsListItem?: SkillItemComponent;

  @Input() pageNumber = 0;
  @Input() numOfElements = 1;
  @Input() elementWidthFactor = 30;


  get staticSkillsList(): { name: string; text: string }[] {
    return staticSkillsList;
  }

  get subArray(){
		return this.staticSkillsList.slice(this.pageNumber*this.numOfElements, this.pageNumber*this.numOfElements+this.numOfElements);
	}
}
