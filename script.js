/**
 * LÓGICA DE NAVEGACIÓN Y COMPORTAMIENTO INTERACTIVO
 * Cibercultura para mi Comunidad - Portafolio Digital UMAD
 */

document.addEventListener('DOMContentLoaded', () => {
  // Manejo del Menú Responsive en Móviles
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // Soporte para carga por hash en URL (ej: index.html#act2)
  const currentHash = window.location.hash.replace('#', '');
  if (currentHash && document.getElementById(currentHash)) {
    switchTab(currentHash);
  }
});

/**
 * Cambia la pestaña/sección visible de manera dinámica sin recargar la página
 * @param {string} tabId - ID de la sección HTML a mostrar
 */
function switchTab(tabId) {
  // 1. Ocultar todos los paneles
  const panes = document.querySelectorAll('.tab-pane');
  panes.forEach(pane => {
    pane.classList.remove('active');
  });

  // 2. Desactivar todos los enlaces del menú
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  // 3. Activar el panel seleccionado
  const activePane = document.getElementById(tabId);
  if (activePane) {
    activePane.classList.add('active');
  }

  // 4. Marcar botón correspondiente como activo
  const matchingButton = Array.from(navLinks).find(btn => {
    const clickAttr = btn.getAttribute('onclick');
    return clickAttr && clickAttr.includes(`'${tabId}'`);
  });

  if (matchingButton) {
    matchingButton.classList.add('active');
  }

  // 5. Cerrar menú móvil si estaba abierto
  const navMenu = document.getElementById('navMenu');
  if (navMenu && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
  }

  // 6. Desplazar suavemente a la parte superior
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // Actualizar historial de navegación
  history.pushState(null, null, `#${tabId}`);
}

/**
 * Abre el visor modal de imagen a pantalla completa
 */
function openImageModal(imgSrc, captionText) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');

  if (modal && modalImg) {
    modalImg.src = imgSrc;
    if (modalCaption) {
      modalCaption.textContent = captionText || '';
    }
    modal.style.display = 'flex';
  }
}

/**
 * Cierra el visor modal al hacer clic en la cruz o fuera de la imagen
 */
function closeImageModal(event) {
  const modal = document.getElementById('imageModal');
  // Se cierra si se hace clic en el fondo oscuro o en el botón de cerrar
  if (event.target.id === 'imageModal' || event.target.classList.contains('modal-close')) {
    modal.style.display = 'none';
  }
}