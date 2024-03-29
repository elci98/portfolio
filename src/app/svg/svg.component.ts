import {
	Component,
  	effect,
  	input,
} from '@angular/core';
import { SvgLoaderService } from '../svg-loader.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
	selector: 'app-svg',
	standalone: true,
	imports: [],
	templateUrl: './svg.component.html',
	styleUrl: './svg.component.scss',
})
export class SvgComponent {
	iconname = input.required<string>();

	iconsvg?: SafeHtml;

  	constructor(
    private svgloader: SvgLoaderService,
    private _sanitizer: DomSanitizer
  	) {
    	effect(() => {
      	this.iconsvg = this.svgloader.svgs[this.iconname()];
    	});
  	}
}
