/**
 * Easy theme detection and switching.
 *
 * DOM Requirements:
 * - #theme-toggle ID for the theme toggler button.
 * - #theme-toggle-icon ID for the theme toggle icons in the button.
 */
export default function initThemeToggler() {
    const docElem = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-toggle-icon');
    
    if (!docElem || !themeIcon || !themeToggle) return;
    
    const applyTheme = (theme) => {
        docElem.setAttribute('data-theme', theme);
        const baseClass = 'fa-regular fa-xl fa-';
        themeIcon.className = baseClass + ((theme === 'dark') ? 'moon' : 'sun');
    };
    
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyTheme(savedTheme);
    
    docElem.style.visibility = 'visible'; // Remove FOUC guard
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = docElem.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
    
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', ({ matches }) => {
        if (!localStorage.getItem('theme')) {
            const currentTheme = matches ? 'light' : 'dark';
            applyTheme(currentTheme);
        }
    });
}
