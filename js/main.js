document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadPartial('partials/header.html', 'site-header'),
    loadPartial('partials/footer.html', 'site-footer')
  ]);
  initNav();
  initPhotoStacks();
});

async function loadPartial(url, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const res = await fetch(url);
    // outerHTML (not innerHTML) so the placeholder div doesn't wrap the
    // result — a wrapper exactly the height of .nav leaves position:sticky
    // with no room to stick, so .nav must become a direct child of body.
    target.outerHTML = await res.text();
  } catch (err) {
    console.error('Kunne ikke laste ' + url, err);
  }
}

function initPhotoStacks() {
  // :hover fans the stack out on desktop; click/tap toggles the same
  // state via .fanned so the component also works on touch devices.
  document.querySelectorAll('.photo-stack').forEach(stack => {
    stack.addEventListener('click', () => stack.classList.toggle('fanned'));
  });
}

function initNav() {
  const currentPage = document.body.dataset.page;
  document.querySelectorAll('.nav a[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });
  const hamburger = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (hamburger && links) {
    hamburger.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
}
