document.addEventListener('DOMContentLoaded', () => {
  const cards = [...document.querySelectorAll('.property-card')];
  const positions = ['0 0', '50% 0', '100% 0', '0 100%', '50% 100%', '100% 100%'];

  cards.forEach((card, index) => {
    const image = card.querySelector('.property-image');
    const img = image?.querySelector('img');
    if (!image) return;

    image.style.backgroundImage = "url('assets/ai-property-sprite.webp')";
    image.style.backgroundRepeat = 'no-repeat';
    image.style.backgroundSize = '300% 200%';
    image.style.backgroundPosition = positions[index % positions.length];
    image.style.backgroundColor = '#102b42';

    if (img) {
      img.style.opacity = '0';
      img.setAttribute('aria-hidden', 'true');
    }
  });
});
