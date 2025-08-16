/**
 * Allows for copyig the contents of codeblock.
 *
 * DOM Requirements:
 * - .plumeo-codeblock class for the codeblock container
 * - .plumeo-codeblock__copycode class for the copy buttons
 * - .plumeo-codeblock__content class for the codeblock contents
 */
export default function initCopyCodeBlock() {
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('.plumeo-codeblock__copycode');
        if (!btn) return;
        
        const codeBlock = btn.closest('.plumeo-codeblock').querySelector('.plumeo-codeblock__content');
        if (!codeBlock) return;
        
        const codeElement = codeBlock.querySelector('td:nth-child(2) code');
        if (!codeElement) return;
        
        const lines = Array.from(codeElement.querySelectorAll('.line'))
            .map(line => line.innerText.replace(/\r?\n$/, ''));
        
        const code = lines.length ? lines.join('\n') : codeElement.innerText;
        
        try {
            await navigator.clipboard.writeText(code);
            
            const icon = btn.querySelector('i');
            const originalIcon = icon.className;
            icon.className = 'fa-solid fa-xs fa-check';
            
            setTimeout(() => {
                icon.className = originalIcon;
            }, 1500);
        } catch (err) {
            alert(`Failed to copy code: ${err}`);
        }
    });
}
