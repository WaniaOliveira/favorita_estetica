/* =========================================================
   FAVORITA ESTÉTICA — Interações
   JavaScript puro, sem dependências externas.
========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- HEADER: fundo ao rolar ---------- */
  const header = document.querySelector('.header');
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- MENU HAMBÚRGUER ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  const toggleMenu = (open) => {
    if (!hamburger || !mobileMenu) return;
    const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('active');
    hamburger.classList.toggle('active', isOpen);
    mobileMenu.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('menu-open', isOpen);
  };

  hamburger?.addEventListener('click', () => toggleMenu());

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  /* ---------- ROLAGEM SUAVE PARA ÂNCORAS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- CARROSSEL HERO ---------- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDotsWrap = document.querySelector('.hero-dots');
  let heroIndex = 0;
  let heroTimer = null;

  function goToHeroSlide(i) {
    if (!heroSlides.length) return;
    heroSlides[heroIndex]?.classList.remove('active');
    heroDotsWrap?.children[heroIndex]?.classList.remove('active');
    heroIndex = (i + heroSlides.length) % heroSlides.length;
    heroSlides[heroIndex]?.classList.add('active');
    heroDotsWrap?.children[heroIndex]?.classList.add('active');
  }

  function startHeroAutoplay() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => goToHeroSlide(heroIndex + 1), 6000);
  }

  if (heroSlides.length) {
    heroSlides[0].classList.add('active');
    heroSlides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => { goToHeroSlide(i); startHeroAutoplay(); });
      heroDotsWrap?.appendChild(dot);
    });

    document.querySelector('.hero-prev')?.addEventListener('click', () => {
      goToHeroSlide(heroIndex - 1); startHeroAutoplay();
    });
    document.querySelector('.hero-next')?.addEventListener('click', () => {
      goToHeroSlide(heroIndex + 1); startHeroAutoplay();
    });

    // Suporte a toque (swipe) no celular
    const heroEl = document.querySelector('.hero');
    let touchStartX = 0;
    heroEl?.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    heroEl?.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) {
        goToHeroSlide(heroIndex + (diff < 0 ? 1 : -1));
        startHeroAutoplay();
      }
    }, { passive: true });

    startHeroAutoplay();
  }

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item.active').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-a');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
          other.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('active', !isActive);
      question.setAttribute('aria-expanded', String(!isActive));
      if (answer) answer.style.maxHeight = !isActive ? answer.scrollHeight + 'px' : null;
    });
  });

  /* ---------- DEPOIMENTOS (CARROSSEL) ---------- */
  const depoSlides = document.querySelectorAll('.depo-slide');
  const depoDotsWrap = document.querySelector('.depo-dots');
  let depoIndex = 0;
  let depoTimer = null;

  function goToDepo(i) {
    if (!depoSlides.length) return;
    depoSlides[depoIndex]?.classList.remove('active');
    depoDotsWrap?.children[depoIndex]?.classList.remove('active');
    depoIndex = (i + depoSlides.length) % depoSlides.length;
    depoSlides[depoIndex]?.classList.add('active');
    depoDotsWrap?.children[depoIndex]?.classList.add('active');
  }

  if (depoSlides.length) {
    depoSlides[0].classList.add('active');
    depoSlides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Ver depoimento ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToDepo(i));
      depoDotsWrap?.appendChild(dot);
    });
    depoTimer = setInterval(() => goToDepo(depoIndex + 1), 5500);
  }

  /* ---------- ANIMAÇÕES AO ROLAR (reveal) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- BANNER DE COOKIES ---------- */
  const cookieBanner = document.querySelector('.cookie-banner');
  const cookieAccept = document.querySelector('.cookie-accept');
  if (cookieBanner) {
    if (!localStorage.getItem('favoritaCookiesAceitos')) {
      setTimeout(() => cookieBanner.classList.add('show'), 1200);
    }
    cookieAccept?.addEventListener('click', () => {
      localStorage.setItem('favoritaCookiesAceitos', 'sim');
      cookieBanner.classList.remove('show');
    });
  }

  /* ---------- FORMULÁRIO DE CONTATO (somente visual) ----------
     Este site é apenas frontend/institucional: não há backend
     nem banco de dados. O formulário abaixo NÃO envia nem
     armazena os dados em nenhum servidor. Ao ser enviado, ele
     apenas monta e abre uma mensagem de WhatsApp já preenchida
     com os dados digitados, para o contato ser concluído por lá. */
  const contatoForm = document.querySelector('#form-contato');
  const formMsg = document.querySelector('.form-msg');
  contatoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = contatoForm.nome.value.trim();
    const telefone = contatoForm.telefone.value.trim();
    const email = contatoForm.email.value.trim();
    const mensagem = contatoForm.mensagem.value.trim();

    const texto = `Olá! Meu nome é ${nome}.%0AE-mail: ${email}%0ATelefone: ${telefone}%0A%0AMensagem: ${mensagem}`;
    const whatsappUrl = `https://wa.me/5561993865297?text=${texto}`;

    if (formMsg) {
      formMsg.textContent = 'Abrindo o WhatsApp com sua mensagem preenchida...';
      formMsg.classList.add('show');
    }
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    contatoForm.reset();
  });

});
