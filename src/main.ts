/*
 * Copyright 2020 James Lyne
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import { createApp } from 'vue'
import App from './App.vue'
import {store} from "@/store";

import 'leaflet/dist/leaflet.css';
import 'normalize-scss/sass/normalize/_import-now.scss';
import '@/scss/style.scss';

const splash = document.getElementById('splash'),
	splashSpinner = document.getElementById('splash__spinner'),
	splashError = document.getElementById('splash__error'),
	splashErrorMessage = document.getElementById('splash__error-message'),
	splashRetry = document.getElementById('splash__error-retry'),
	splashAttempt = document.getElementById('splash__error-attempt'),
	svgs = import.meta.globEager('/assets/icons/*.svg');

window.hideSplash = function() {
	requestAnimationFrame(function() {
		if(splash) {
			splash.style.opacity = '0';
		}
	});
};

window.showSplashError = function(message: string, fatal: boolean, attempts: number) {
	if(splashError) {
		splashError.setAttribute('aria-hidden', 'false');
	}

	if(splashErrorMessage) {
		splashErrorMessage.innerText = message || 'Unknown error';
	}

	if(splashSpinner && fatal) {
		splashSpinner.style.visibility = 'hidden';
	}

	if(splashAttempt && splashRetry) {
		if(fatal) {
			splashAttempt.hidden = splashRetry.hidden = true;
		} else if(attempts) {
			splashAttempt.hidden = splashRetry.hidden = false;
			splashAttempt.textContent = attempts.toString();
		}
	}
};

if(splash) {
	splash.addEventListener('transitionend', function(e) {
		if(e.target === splash) {
			splash.hidden = true;
		}
	});
}

console.info(`LiveAtlas version ${store.state.version} - https://github.com/JLyne/LiveAtlas`);

const app = createApp(App).use(store);

// app.config.performance = true;
app.mount('#mcmap');