(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initSlider();
  });

  function initSlider() {
    var cards = document.querySelectorAll('.article-card');
    if (!cards.length) return;

    var slides = [];
    var max = Math.min(cards.length, 3);

    for (var i = 0; i < max; i++) {
      var card = cards[i];
      var img = card.querySelector('.card-image img');
      var link = card.querySelector('h4 a');
      if (!img || !link) continue;
      slides.push({
        image: img.src.replace('/styles/medium/', '/styles/wide/'),
        title: link.textContent.trim(),
        href: link.href,
      });
    }

    if (!slides.length) return;

    var slidesEl = document.querySelector('.hero-slides');
    var dotsEl = document.querySelector('.hero-dots');
    if (!slidesEl || !dotsEl) return;

    slides.forEach(function (data, idx) {
      var slide = document.createElement('div');
      slide.className = 'hero-slide' + (idx === 0 ? ' active' : '');
      slide.style.backgroundImage = 'url(' + data.image + ')';

      var content = document.createElement('div');
      content.className = 'hero-slide-content';

      var title = document.createElement('h2');
      title.textContent = data.title;

      var btn = document.createElement('a');
      btn.href = data.href;
      btn.textContent = 'Read More';

      content.appendChild(title);
      content.appendChild(btn);
      slide.appendChild(content);
      slidesEl.appendChild(slide);

      var dot = document.createElement('button');
      dot.className = 'hero-dot' + (idx === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (idx + 1));
      dot.addEventListener('click', (function (n) {
        return function () { goTo(n); };
      })(idx));
      dotsEl.appendChild(dot);
    });

    var current = 0;
    var timer = setInterval(function () { goTo((current + 1) % slides.length); }, 5000);

    function goTo(n) {
      var allSlides = slidesEl.querySelectorAll('.hero-slide');
      var allDots = dotsEl.querySelectorAll('.hero-dot');
      allSlides[current].classList.remove('active');
      allDots[current].classList.remove('active');
      current = n;
      allSlides[current].classList.add('active');
      allDots[current].classList.add('active');
      clearInterval(timer);
      timer = setInterval(function () { goTo((current + 1) % slides.length); }, 5000);
    }
  }
})();
