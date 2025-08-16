/**
 * Slider for featured posts.
 *
 * DOM Requirements:
 * - .plumeo-slide class for the slider section/parent container.
 * - .plumeo-slider__wrapper class for the slider wrapper.
 * - #slider-btn-prev/#slider-btn-prev ID's for the slider buttons.
 */
export default function initSlider() {
    const wrapper = document.querySelector(".plumeo-slider__wrapper");
    const slides = document.querySelectorAll(".plumeo-slide");
    const prevBtn = document.getElementById('slider-btn-prev');
    const nextBtn = document.getElementById('slider-btn-next');
    
    if (!wrapper || !slides || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    
    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        wrapper.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
    }
    
    prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));
    
    setInterval(() => showSlide(currentIndex + 1), 6000);
}
