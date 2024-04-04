import { Component,  ElementRef,  HostListener, Renderer2, ViewChild } from '@angular/core';
import { SkillItemComponent } from './skill-item/skill-item.component';
import { staticSkillsList } from './skills.list';
import { NgClass, NgFor } from '@angular/common';

@Component({
	selector: 'app-skills',
	standalone: true,
	imports: [SkillItemComponent, NgFor, NgClass],
	templateUrl: './skills.component.html',
	styleUrl: './skills.component.scss',
})
export class SkillsComponent {

	selectedPage = 1;
	private static numOfPages = 0;
	private static elementsWidthRem = 0;
	private static previousPage = 0;
	private static fontSize = 0;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	animationInterval:any = undefined;

	constructor(private renderer: Renderer2){}

	@ViewChild('skillsListWrraper') skillsListWrraper?: ElementRef;
	@ViewChild('skillsListItem') skillsListItem?: SkillItemComponent;
	@ViewChild('skillsList') skillsList?: ElementRef;
	
	elementWidthFactor = 30;

	@HostListener('window:resize', ['$event'])
	@HostListener('window:load', ['$event'])
	onload() {
		//get screen width
		const elementWidthPx = this.skillsListItem?.el?.nativeElement.getBoundingClientRect().width;

		// get parent width
		const parentWidthPx = this.skillsListWrraper?.nativeElement.parentElement.getBoundingClientRect().width;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const parentHeightPx = this.skillsListWrraper?.nativeElement.parentElement.getBoundingClientRect().height;

		//calculate num of items that can fit in screen
		const numOfItems = Math.floor(parentWidthPx / elementWidthPx);
		SkillsComponent.numOfPages = Math.ceil(this.staticSkillsList.length / numOfItems);
		
		SkillsComponent.fontSize = elementWidthPx / this.elementWidthFactor;

		// calculate also padding
		const paddingPx = (numOfItems-1)* (SkillsComponent.fontSize);

		// set skillsListWrraper size
		SkillsComponent.elementsWidthRem = (elementWidthPx * numOfItems + paddingPx)/ SkillsComponent.fontSize;
		this.renderer.setStyle(this.skillsListWrraper?.nativeElement, 'width', `${ SkillsComponent.elementsWidthRem }rem`);
		console.log(`width updated to: ${SkillsComponent.elementsWidthRem}rem`);

		// return div to starting point
		this.skillsList?.nativeElement?.scrollTo(0, 0);
		this.selectedPage = 1;
		SkillsComponent.previousPage = 0;
		this.handleInterval(false);
	}

	handleInterval(hoverEvent:boolean){
		if(hoverEvent && this.animationInterval){
			clearInterval(this.animationInterval);
			this.animationInterval = undefined;
		}
		else if(!this.animationInterval){
			this.animationInterval = setInterval(()=>{
				this.scrollToNextPage();
			}, 5000);
		}
	}
	
	scrollTo(pageNumber:number){
		//calculate if need to scroll forward or backward
		const scrollOffsetRem = (pageNumber < this.selectedPage ? -1 : 1) * SkillsComponent.elementsWidthRem * Math.abs(pageNumber - this.selectedPage);
		this.skillsList?.nativeElement?.scrollBy(scrollOffsetRem * SkillsComponent.fontSize, 0);
		this.selectedPage=pageNumber;
	}

	scrollToNextPage(){
		let scrollOffsetRem = 0;

		if(this.selectedPage === SkillsComponent.numOfPages || 
			SkillsComponent.previousPage > this.selectedPage && this.selectedPage > 1) {
			SkillsComponent.previousPage = this.selectedPage;
			this.selectedPage = this.selectedPage - 1;
			scrollOffsetRem = -1 * SkillsComponent.elementsWidthRem;
		}else{
			SkillsComponent.previousPage = this.selectedPage;
			this.selectedPage = this.selectedPage + 1;
			scrollOffsetRem = SkillsComponent.elementsWidthRem;
		}
		console.log(`scrolling from ${SkillsComponent.previousPage} to ${this.selectedPage}`);
		//calculate if need to scroll forward or backward
		this.skillsList?.nativeElement?.scrollBy(scrollOffsetRem * SkillsComponent.fontSize , 0);
	}

	// HTML getters
	get staticSkillsList(){
		return staticSkillsList;
	}

	get Array(){
		return Array(SkillsComponent.numOfPages);
	}
}
