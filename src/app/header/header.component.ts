import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener, Renderer2 } from '@angular/core';
import {
	trigger,
	state,
	style,
	animate,
	transition,
} from '@angular/animations';

@Component({
	selector: 'app-header',
	standalone: true,
	imports:[CommonModule, NgIf],
	animations:[
		trigger('changeBackground', [
			state('transparent', style({
				backgroundColor: 'transparent'
			})),
			state('white', style({
				backgroundColor: 'white'
			})),
			transition('transparent => white', [
				animate('0.2s')
			]),
			transition('white => transparent', [
				animate('0.2s')
			])
		])
	],
	templateUrl: './header.component.html',
})
export class HeaderComponent {

	displayMenu=false;
	whiteBackground=false;
	previousScrollPosition = 0;

	constructor(private renderer: Renderer2){
		
	}

	@HostListener('window:mousewheel', [])
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onScroll(){
		if(document.body.scrollTop >= 400 && this.previousScrollPosition < 400 ||
			document.body.scrollTop <= 400 && this.previousScrollPosition > 400){
			this.whiteBackground = !this.whiteBackground;
		}
		this.previousScrollPosition=document.body.scrollTop;
	}

	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
	}
}
