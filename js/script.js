// Page load hone par animation trigger karein
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
document.addEventListener("DOMContentLoaded", () => {
    const durationDays = 15;
    const durationHours = 8;
    const durationMinutes = 45;

    // Calculate Target Date (Current Time + Duration)
    const targetDate = new Date().getTime() +
        (durationDays * 24 * 60 * 60 * 1000) +
        (durationHours * 60 * 60 * 1000) +
        (durationMinutes * 60 * 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            return;
        }

        // Time conversion math
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        // Output values with 2-digit format
        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    }

    // Run immediately and update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
});