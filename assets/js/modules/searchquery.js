export default function initSearchQuery() {
    const searchBtn = document.getElementById('search-toggle');
    const searchIcon = document.getElementById('search-toggle-icon');
    const searchInput = document.getElementById('search-input');
    if (!searchBtn || !searchIcon || !searchInput) return;
    
    const activeClass = 'plumeo-search__input--active';
    
    const openSearch = () => {
        searchInput.classList.add(activeClass);
        searchIcon.classList.remove('fa-magnifying-glass');
        searchIcon.classList.add('fa-x');
        searchInput.focus();
    };
    
    const closeSearch = () => {
        searchInput.classList.remove(activeClass);
        searchIcon.classList.remove('fa-x');
        searchIcon.classList.add('fa-magnifying-glass');
        searchInput.value = '';
    };
    
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchInput.classList.contains(activeClass) ? closeSearch() : openSearch();
    });
    
    document.addEventListener('click', (e) => {
        if (!searchInput.classList.contains(activeClass)) return;
        if (!searchBtn.contains(e.target) && !searchInput.contains(e.target)) {
            closeSearch();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                window.location.href = `/search/?q=${encodeURIComponent(searchQuery)}`;
            } else {
                closeSearch();
            }
        }
    });
}
