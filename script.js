document.addEventListener('DOMContentLoaded', function() {
  // Configurações globais
  const WHATSAPP_PHONE = '5517981276481';
  const SERVICES = [
    'Hidráulica',
     'Reparos',
    'Outros'
  ];

  // 1. MENU MOBILE RESPONSIVO
  function initMenuMobile() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = navMenu?.querySelectorAll('a[href^="#"]');

    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Fechar menu ao clicar em link
    navLinks?.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Fechar menu em tela grande
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('open');
      }
    });
  }

  // 2. SCROLL SUAVE PARA ÂNCHORAS
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // 3. ANIMAÇÕES AO SCROLL COM INTERSECTION OBSERVER
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Anima apenas uma vez
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  // 4. EFEITOS DE HOVER NOS BOTÕES
  function initButtonHovers() {
    const buttons = document.querySelectorAll('.btn, .chat-btn');

    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.classList.add('hover');
      });
      btn.addEventListener('mouseleave', () => {
        btn.classList.remove('hover');
      });
    });
  }

  // 5. BOT DE ATENDIMENTO INTERATIVO
  function initChatBot() {
    const chatBtn = document.querySelector('.chat-btn');
    const modal = document.querySelector('.chat-modal');
    const closeBtn = modal?.querySelector('.close');
    const form = modal?.querySelector('#chatForm');

    if (!chatBtn || !modal || !form) return;

    // Abrir modal
    chatBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Previne scroll
    });

    // Fechar modal
    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });

    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      form.reset();
    }

    // Validação e envio para WhatsApp
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      // Validações
      if (!name) return alert('Por favor, informe seu nome.');
      if (!phone || phone.length < 10) return alert('Por favor, informe um telefone válido.');
      if (!service) return alert('Por favor, selecione um serviço.');
      if (!message) return alert('Por favor, digite uma mensagem.');

      // Formatar mensagem para WhatsApp
      const whatsappText = `Olá! *Novo Contato da Landing Page Casa 3 Irmãos Tudo em Reparos*\n\n` +
                          `👤 *Nome:* ${name}\n` +
                          `📱 *Telefone:* ${phone}\n` +
                          `🔧 *Serviço:* ${service}\n` +
                          `💬 *Mensagem:* ${message}`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappText)}`;

      // Abrir WhatsApp e fechar modal
      window.open(whatsappUrl, '_blank');
      closeModal();
    });
  }

  // Inicializar todas as funcionalidades
  initMenuMobile();
  initSmoothScroll();
  initScrollAnimations();
  initButtonHovers();
  initChatBot();

  console.log('Landing Page Casa 3 Irmãos - JS inicializado com sucesso!');
});
