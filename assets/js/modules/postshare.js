export default function initShareToggler() {
    const shareToggler = document.getElementById('share-toggle-button');
    const sharer = document.getElementById('share-post');
    
    if (!shareToggler && !sharer) {
        return;
    }
    const toggledClass = 'plumeo-article__share--toggled';
    function isSharerToggled() {
        return sharer.classList.contains(toggledClass);
    }
    
    const toggleSharer = (forceClose = false) => {
        if (forceClose) {
            sharer.classList.remove(toggledClass);
        }
        else if (isSharerToggled()) {
            sharer.classList.remove(toggledClass);
        }
        else {
            sharer.classList.add(toggledClass)
        }
    }
    
    shareToggler.addEventListener('click', () => {
        toggleSharer();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleSharer(true);
        }
    });
    
    document.addEventListener('click', (e) => {
        const shareIcons = document.getElementById('share-icons');
        if (!(shareToggler.contains(e.target) || shareIcons.contains(e.target))) {
            toggleSharer(true);
        }
    });
}
