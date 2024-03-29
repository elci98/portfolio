import { Component, ElementRef, Input } from '@angular/core';
import { SvgComponent } from '../../svg/svg.component';
import { NgStyle } from '@angular/common';

@Component({
  	selector: 'app-skill-item',
  	standalone: true,
  	imports: [SvgComponent, NgStyle],
	templateUrl: './skill-item.component.html',
	styleUrl: './skill-item.component.scss'
})
export class SkillItemComponent {

  @Input() name='';
  @Input() text='';
  @Input() width=30;

  constructor(public el: ElementRef){}
}
