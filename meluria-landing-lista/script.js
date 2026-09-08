const productos = [
  { precio: 55000 },
  { precio: 55000 },
  { precio: 50000 },
  { precio: 40000 },
  { precio: 40000 },
  { precio: 45000 },
  { precio: 45000 },
  { precio: 45000 },
  { precio: 55000 },
  { precio: 55000 },
  { precio: 35000 },
  { precio: 40000 },
  { precio: 35000 },
  { precio: 55000 },
  { precio: 45000 },
  { precio: 40000 },
  { precio: 35000 },
  { precio: 50000 },
  { precio: 55000 },
  { precio: 55000 }
];

// Productos que aparecerán como OFERTA
const ofertas = {
  1: { antes: 65000, ahora: 55000 },
  3: { antes: 60000, ahora: 50000 },
  5: { antes: 50000, ahora: 40000 },
  7: { antes: 55000, ahora: 45000 },
  9: { antes: 65000, ahora: 55000 },
  11: { antes: 45000, ahora: 35000 },
  13: { antes: 45000, ahora: 35000 },
  17: { antes: 45000, ahora: 35000 }
};

const whatsapp = "573216108320";

function formatoPrecio(numero) {
  return "$" + numero.toLocaleString("es-CO");
}

// Crear ventana del producto
const modal = document.createElement("div");
modal.className = "product-modal";
modal.innerHTML = `
  <div class="modal-overlay"></div>
  <div class="modal-box">
    <button class="modal-close">&times;</button>
    <img class="modal-image" src="" alt="">
    <div class="modal-content">
      <span class="modal-tag"></span>
      <h2 class="modal-title"></h2>
      <p class="modal-description">Talla única · Disponible</p>
      <div class="modal-price"></div>
      <a class="modal-buy" href="#" target="_blank">
        Pedir por WhatsApp
      </a>
    </div>
  </div>
`;

document.body.appendChild(modal);

const modalImage = modal.querySelector(".modal-image");
const modalTag = modal.querySelector(".modal-tag");
const modalTitle = modal.querySelector(".modal-title");
const modalPrice = modal.querySelector(".modal-price");
const modalBuy = modal.querySelector(".modal-buy");

function abrirProducto(card, numero) {
  const imagen = card.querySelector("img");
  const tag = card.querySelector(".tag");
  const titulo = card.querySelector("h3");

  modalImage.src = imagen.src;
  modalImage.alt = imagen.alt;
  modalTag.textContent = tag.textContent;
  modalTitle.textContent = titulo.textContent;

  const oferta = ofertas[numero];

  if (oferta) {
    modalPrice.innerHTML = `
      <span class="price-old">${formatoPrecio(oferta.antes)}</span>
      <span class="price-new">${formatoPrecio(oferta.ahora)}</span>
      <span class="offer-label">OFERTA</span>
    `;
  } else {
    modalPrice.innerHTML = `
      <span class="price-normal">
        ${formatoPrecio(productos[numero - 1].precio)}
      </span>
    `;
  }

  const mensaje = encodeURIComponent(
    `Hola Meluria, quiero información sobre la prenda ${titulo.textContent}.`
  );

  modalBuy.href = `https://wa.me/${whatsapp}?text=${mensaje}`;

  modal.classList.add("active");
  document.body.classList.add("modal-open");
}

// Hacer clic en cada producto
document.querySelectorAll(".product").forEach((card, index) => {
  card.style.cursor = "pointer";

  card.addEventListener("click", function(e) {
    if (e.target.closest("a")) return;

    abrirProducto(card, index + 1);
  });
});

// Cerrar ventana
modal.querySelector(".modal-close").addEventListener("click", cerrarModal);
modal.querySelector(".modal-overlay").addEventListener("click", cerrarModal);

function cerrarModal() {
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    cerrarModal();
  }
});
