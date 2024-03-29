import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const loadingElement = document.querySelector('.app-loading');
const appElement = document.querySelector('app-root');

bootstrapApplication(AppComponent, appConfig)
// remove the loading element after the transition is complete to prevent swallowed clicks
	.then(() => setTimeout(() => {
		appElement?.classList.add('loaded');
		loadingElement?.remove();
	}, 1500))
	.catch((err) => console.error(err));
