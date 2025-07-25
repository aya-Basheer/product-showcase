 const slider = document.getElementById('slider');
    const cards = document.querySelectorAll('.product-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const modal = document.getElementById('productModal');
    const closeModalBtn = document.getElementById('closeModal');

    let index = 0;
    const cardWidth = cards[0].offsetWidth + 24; // card width + margin

    // Automatic sliding
    let slideInterval = setInterval(() => moveSlide(1), 3000);

    // Manual navigation
    prevBtn.addEventListener('click', () => { moveSlide(-1); resetInterval(); });
    nextBtn.addEventListener('click', () => { moveSlide(1); resetInterval(); });

    function moveSlide(dir) {
      index = (index + dir + cards.length) % cards.length;
      slider.style.transform = `translateX(${-index * cardWidth}px)`;
    }

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => moveSlide(1), 3000);
    }

    // Modal functionality
    cards.forEach(card => {
      card.addEventListener('click', () => {
        document.getElementById('modalImage').src = card.dataset.image;
        document.getElementById('modalName').textContent = card.dataset.name;
        document.getElementById('modalCompany').textContent = card.dataset.company;
        document.getElementById('modalDescription').textContent = card.dataset.description;
        document.getElementById('modalPrice').textContent = card.dataset.price;
        // Populate stars
        const rating = parseInt(card.dataset.rating);
        const stars = document.querySelectorAll('.modal-star');
        stars.forEach((s, i) => s.classList.toggle('text-yellow-400', i < rating));
        modal.classList.remove('hidden');
      });
    });
    closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

    // Interactive rating in modal
    document.getElementById('modalStars').addEventListener('click', (e) => {
      if (!e.target.classList.contains('modal-star')) return;
      const stars = Array.from(document.querySelectorAll('.modal-star'));
      const idx = stars.indexOf(e.target);
      stars.forEach((s, i) => s.classList.toggle('text-yellow-400', i <= idx));
      // Update original card
      const currentName = document.getElementById('modalName').textContent;
      const originalCard = Array.from(cards).find(c => c.dataset.name === currentName);
      originalCard.dataset.rating = idx + 1;
      const origStars = originalCard.querySelectorAll('.star');
      origStars.forEach((s, i) => s.classList.toggle('text-yellow-400', i <= idx));
    });