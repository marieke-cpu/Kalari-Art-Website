(() => {
  const setupNav = (nav) => {
    if (!nav || nav.dataset.sharedNavReady) return;
    const menu = nav.querySelector(':scope > div');
    const projectCta = nav.querySelector(':scope > a:last-child');
    if (!menu || !projectCta) return;

    nav.dataset.sharedNavReady = 'true';
    const menuId = `site-nav-menu-${Math.random().toString(36).slice(2, 8)}`;
    menu.id = menuId;

    const toggle = document.createElement('button');
    toggle.className = 'site-nav-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', menuId);
    toggle.innerHTML = '<span></span><span></span><span></span>';
    nav.insertBefore(toggle, menu);

    const mobileCta = projectCta.cloneNode(true);
    mobileCta.classList.add('site-nav-mobile-cta');
    menu.appendChild(mobileCta);
  };

  const setupAll = () => document.querySelectorAll('nav').forEach(setupNav);
  const closeNav = (nav) => {
    const toggle = nav?.querySelector('.site-nav-toggle');
    if (!nav || !toggle) return;
    nav.removeAttribute('data-mobile-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  };

  document.addEventListener('click', (event) => {
    const toggle = event.target.closest('.site-nav-toggle');
    if (toggle) {
      const nav = toggle.closest('nav');
      const open = nav.getAttribute('data-mobile-open') === 'true';
      if (open) closeNav(nav);
      else {
        nav.setAttribute('data-mobile-open', 'true');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close navigation menu');
      }
      return;
    }
    document.querySelectorAll('nav[data-mobile-open="true"]').forEach((nav) => {
      if (!nav.contains(event.target) || event.target.closest('a')) closeNav(nav);
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') document.querySelectorAll('nav[data-mobile-open="true"]').forEach(closeNav);
  });

  setupAll();
  new MutationObserver(setupAll).observe(document.documentElement, { childList: true, subtree: true });
})();
