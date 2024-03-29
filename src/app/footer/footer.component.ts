import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [SvgComponent],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
