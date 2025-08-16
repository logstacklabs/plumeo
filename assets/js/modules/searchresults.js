export default function initSearchResults() {
    const searchTitle = document.getElementById('search-title');
    const searchResultsCards = document.getElementById('search-results');
    if (!searchTitle && !searchResultsCards) return;
    
    const query = new URLSearchParams(window.location.search).get('q');
    if (!query) return;
    
    const lcQuery = query.toLowerCase();
    
    const escapeHTML = str =>
        str.replace(/[&<>"']/g, m => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m]));
    
    fetch('/index.json')
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(posts => {
            const results = posts.filter(post =>
                [post.title, post.excerpt, post.author, post.thumb_sm, post.thumb_md, post.thumb_lg, post.permalink, ...(post.tags || [])]
                    .some(field => field?.toLowerCase().includes(lcQuery))
            );
            
            if (!results.length) {
                searchResultsCards.innerHTML = `<p>No results found for "${escapeHTML(query)}"</p>`;
                document.title = `No results for "${escapeHTML(query)}" | {{ $.Site.Title }}`;
                return;
            }
            
            document.title = `Search results for "${escapeHTML(query)}" | {{ $.Site.Title }}`;
            
            searchTitle.innerHTML = `<h2>Search results for "${escapeHTML(query)}"</h2>`;
            
            searchResultsCards.innerHTML = `
                ${results.map(post => `
                    <article class="plumeo-post__card">
                        <a href="${post.permalink}">
                            <div class="plumeo-card__content">
                                <div class="plumeo-card__thumbnail">
                                    <picture>
                                        <source media="(max-width: 400px)" srcset="${post.thumb_sm}" type="image/webp"/>
                                        <source media="(max-width: 672px)" srcset="${post.thumb_md}" type="image/webp"/>
                                        <source media="(min-width: 673px)" srcset="${post.thumb_lg}" type="image/webp"/>
                                        <img srcset="${post.thumb_sm} 450w, ${post.thumb_md} 600w, ${post.thumb_lg} 750w"
                                            sizes="(max-width: 400px) 480px, (max-width: 672px) 640px, 800px"
                                            src="${post.thumb_lg}" width="800" height="450"
                                            alt="${escapeHTML(post.title)}" loading="lazy">
                                    </picture>
                                </div>
                                <div class="plumeo-card__excerpt">
                                    <h3>${escapeHTML(post.title)}</h3>
                                    <p>${escapeHTML(post.excerpt)}</p>
                                    <div class="plumeo-card__tags">
                                        <i class="fa-solid fa-lg fa-tags"></i>
                                        ${(post.tags || []).slice(0, 3).map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}
                                    </div>
                                    <div class="plumeo-card__meta">
                                        <span>
                                            <i class="fa-regular fa-lg fa-user"></i>${escapeHTML(post.author)}
                                        </span>
                                        <span>
                                            <i class="fa-regular fa-lg fa-calendar-days"></i>
                                            <time datetime="${post.date}">
                                                ${new Date(post.date).toLocaleDateString()}
                                            </time>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </article>
                `).join('')}
            `;
        })
        .catch(error => {
            searchResultsCards.innerHTML = `
                <p>Error loading search results for <strong>${escapeHTML(query)}</strong></p>
                <p>Error: <strong>${escapeHTML(error.message)}</strong></p>
            `;
        });
}
