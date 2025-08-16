import initMenuToggler
    from './modules/menu.js';
import initThemeToggler
    from './modules/theme.js';
import initContactForm
    from './modules/contact.js';
import initShareToggler
    from "./modules/postshare.js";
import initSearchQuery
    from "./modules/searchquery.js";
import initSearchResults
    from "./modules/searchresults.js";
import initCopyCodeBlock
    from "./modules/copycodeblock.js";
import initSlider
    from "./modules/slider.js";


/**
 * Initializes all UI modules once the DOM is fully loaded.
 * Modules include:
 * - Theme toggler
 * - Mobile menu toggler
 * - Featured Post Slider
 * - Search Query & Results
 * - Code block copy functionality
 * - Content share buttons toggler
 * - Contact form submission handler
 */
document.addEventListener('DOMContentLoaded', () => {
    initMenuToggler();
    initThemeToggler();
    initContactForm();
    initShareToggler();
    initSearchQuery();
    initSearchResults();
    initCopyCodeBlock();
    initSlider();
});

