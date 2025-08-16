/**
 * Toggles the mobile navigation menu.
 * Changes icon based on menu state and toggles `active` class on navigation.
 *
 * DOM Requirements:
 * - #menu-toggle: Menu toggler button.
 * - #menu-toggle-icon: clickable icon element
 * - .nav-links: container of navigation links
 */
export default function initMenuToggler() {
    const toggler = document.getElementById('menu-toggle');
    const toggleIcon = document.getElementById('menu-toggle-icon');
    const navLinks = document.querySelector('.plumeo-menu__list');
    
    if (!toggler || !toggleIcon || !navLinks) return;
    const activeClass = 'plumeo-menu__list--active';
    
    const isMenuActive = () => {
        return navLinks.classList.contains(activeClass);
    }
    const openMenu = () => {
        navLinks.classList.add(activeClass);
        toggleIcon.classList.remove('fa-bars-staggered');
        toggleIcon.classList.add('fa-x');
    };
    const closeMenu = () => {
        navLinks.classList.remove(activeClass);
        toggleIcon.classList.remove('fa-x');
        toggleIcon.classList.add('fa-bars-staggered');
    };
    toggler.addEventListener('click', () => {
        if (isMenuActive()) {
            closeMenu();
        }
        else {
            openMenu();
        }
    });
    navLinks.querySelectorAll('.plumeo-menu__item').forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });
    
    document.addEventListener('keydown', (e) => {
        if ((e.key === 'Escape') && isMenuActive()) {
            closeMenu();
        }
    });
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navLinks.contains(e.target) || toggler.contains(e.target);
        if (!isClickInsideMenu && isMenuActive()) {
            closeMenu();
        }
    });
}
