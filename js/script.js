const targetValues = {
    days: 15,
    hours: 8,
    minutes: 45
};

// Counter Animation Function
function animateCounter(id, targetValue, duration = 2000) {
    const element = document.getElementById(id);
    if (!element) return;

    let startTimestamp = null;
    const startValue = 0;

    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // Current animated number calculation
        const currentValue = Math.floor(progress * (targetValue - startValue) + startValue);

        // Single digit numbers par leading zero (05, 08) add karein
        element.innerText = String(currentValue).padStart(2, '0');

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

// Page load hone par animation trigger karein
document.addEventListener("DOMContentLoaded", () => {
    animateCounter("days", targetValues.days);
    animateCounter("hours", targetValues.hours);
    animateCounter("minutes", targetValues.minutes);
});
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.bsm-card');
    const mainImg = document.getElementById('activeImg');
    let currentIndex = 0;
    let autoplayTimer = null;
    const intervalTime = 3000; // 3 seconds per slide

    function activateCard(index) {
        // Remove active class from all cards
        cards.forEach(card => card.classList.remove('active'));

        // Add active class to selected card
        const targetCard = cards[index];
        targetCard.classList.add('active');

        // Image Swap with Fade Effect
        const newImgSrc = targetCard.getAttribute('data-img');
        if (newImgSrc && mainImg.getAttribute('src') !== newImgSrc) {
            mainImg.style.opacity = '0.2';
            setTimeout(() => {
                mainImg.setAttribute('src', newImgSrc);
                mainImg.style.opacity = '1';
            }, 150);
        }

        currentIndex = index;
    }

    function nextSlide() {
        let nextIndex = (currentIndex + 1) % cards.length;
        activateCard(nextIndex);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, intervalTime);
    }

    function stopAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
    }

    // Click Event Listener
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            activateCard(index);
            startAutoplay(); // Reset autoplay timer on click
        });
    });

    // Pause autoplay on mouse hover (Optional UI improvement)
    const container = document.querySelector('.form-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoplay);
        container.addEventListener('mouseleave', startAutoplay);
    }

    // Initialize first card active & start autoplay
    activateCard(0);
    startAutoplay();
}); 