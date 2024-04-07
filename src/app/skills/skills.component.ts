import { Component,  ElementRef,  HostListener, Renderer2, ViewChild } from '@angular/core';
import { staticSkillsList } from '../skills-page/skills.list';
import { NgClass, NgFor } from '@angular/common';
import { SkillsPageComponent } from '../skills-page/skills-page.component';

@Component({
	selector: 'app-skills',
	standalone: true,
	imports: [SkillsPageComponent, NgFor, NgClass],
	templateUrl: './skills.component.html',
	styleUrl: './skills.component.scss',
})
export class SkillsComponent {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pages:number[]=[];
	selectedPage = 1;
	private static numOfPages = 0;
	private static numOfItems = 1;
	private static elementsWidthRem = 0;
	private static previousPage = 0;
	private static fontSize = 0;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	animationInterval:any = undefined;
	itemToShow = 1;

	constructor(private renderer: Renderer2){}

	@ViewChild('skillsListWrraper') skillsListWrraper?: ElementRef;
	@ViewChild('skillsList') skillsList?: ElementRef;
	@ViewChild('skillsPage') skillsPage?: SkillsPageComponent;
	
	elementWidthFactor = 30;

	@HostListener('window:resize', ['$event'])
	@HostListener('window:load', ['$event'])
	onload() {
		//get screen width
		const elementWidthPx = this.skillsPage?.skillsListItem?.el?.nativeElement.getBoundingClientRect().width;

		// get parent width
		const parentWidthPx = this.skillsListWrraper?.nativeElement.parentElement.getBoundingClientRect().width;

		//calculate num of items that can fit in screen
		SkillsComponent.numOfItems = Math.min(Math.floor(parentWidthPx / elementWidthPx), 2);
		SkillsComponent.numOfPages = Math.ceil(this.staticSkillsList.length / SkillsComponent.numOfItems);
		SkillsComponent.fontSize = elementWidthPx / this.elementWidthFactor;

		// calculate also padding
		const paddingPx = (SkillsComponent.numOfItems-1)* (SkillsComponent.fontSize);

		// set skillsListWrraper size
		SkillsComponent.elementsWidthRem = (elementWidthPx * SkillsComponent.numOfItems + paddingPx)/ SkillsComponent.fontSize;
		this.renderer.setStyle(this.skillsListWrraper?.nativeElement, 'width', `${ SkillsComponent.elementsWidthRem }rem`);
		console.log(`width updated to: ${SkillsComponent.elementsWidthRem}rem`);

		// return div to starting point
		this.scrollToPage(1);
		this.selectedPage = 1;
		SkillsComponent.previousPage = 0;
		this.handleInterval(false);
	}

	handleInterval(hoverEvent:boolean){
		if(hoverEvent && this.animationInterval){
			clearInterval(this.animationInterval);
			this.animationInterval = undefined;
			console.log('animation stopped due to hover on element');
		}
		else if(!this.animationInterval){
			this.animationInterval = setInterval(()=>{
				this.scrollToNextPage();
			}, 5000);
		}
	}
	
	scrollToPage(pageNumber:number){
		console.log(`scrolling to page: ${pageNumber}`);
		document.getElementsByClassName(`skill-page-${pageNumber}`)[0].scrollIntoView({behavior: 'smooth', block: 'nearest'});
		this.selectedPage=pageNumber;
	}

	scrollToNextPage(){
		if(this.selectedPage === SkillsComponent.numOfPages || 
			SkillsComponent.previousPage > this.selectedPage && this.selectedPage > 1) {
			SkillsComponent.previousPage = this.selectedPage;
			this.selectedPage = this.selectedPage - 1;
		}else{
			SkillsComponent.previousPage = this.selectedPage;
			this.selectedPage = this.selectedPage + 1;
		}
		this.scrollToPage(this.selectedPage);
	}

	btnClicked(event:Event){
		event.stopPropagation();
		// event.preventDefault();
	}

	// HTML getters
	get staticSkillsList(){
		return staticSkillsList;
	}

	get Array(){
		return SkillsComponent.numOfPages?  Array(SkillsComponent.numOfPages) : Array(1);
	}



	get numOfItems(){
		return SkillsComponent.numOfItems;
	}
}
