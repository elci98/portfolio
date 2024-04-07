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

	@HostListener('window:scroll', [])
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onScroll(){
		const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollPosition >= 200 && this.previousScrollPosition < 200 ||
			scrollPosition <= 200 && this.previousScrollPosition > 200){
			this.whiteBackground = !this.whiteBackground;
		}
		this.previousScrollPosition=scrollPosition;
	}

	onAboutClicked(){
		document.getElementById('intro')!.scrollIntoView({behavior: 'smooth'});
	}

	onContactClicked(){
		document.getElementById('footer')!.scrollIntoView({behavior: 'smooth'});
	}
}
