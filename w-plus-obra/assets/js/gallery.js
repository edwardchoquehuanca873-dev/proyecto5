(function () {
  const root = document.querySelector("[data-gallery]");
  if (!root) return;
  const items = Array.isArray(window.WPLUS_GALLERY) ? window.WPLUS_GALLERY : [];
  const grid = root.querySelector("[data-gallery-grid]");
  const empty = root.querySelector("[data-gallery-empty]");
  const filters = root.querySelectorAll("[data-filter]");
  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImg = lightbox?.querySelector("img");

  const render = (category) => {
    if (!grid) return;
    const visible = items.filter((item) => !category || category === "all" || item.category === category);
    grid.innerHTML = "";
    if (!visible.length) {
      if (empty) {
        empty.hidden = false;
        const copy = empty.querySelector("p");
        if (copy && items.length) {
          copy.textContent = "No hay imágenes en esta categoría todavía.";
        }
      }
      return;
    }
    if (empty) empty.hidden = true;
    visible.forEach((item) => {
      const fig = document.createElement("figure");
      fig.className = "gallery-item";
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt || item.title || "Trabajo de W+ OBRA";
      img.loading = "lazy";
      img.decoding = "async";
      const cap = document.createElement("figcaption");
      cap.textContent = item.title || "";
      fig.append(img, cap);
      fig.addEventListener("click", () => {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = item.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("is-open");
      });
      grid.append(fig);
    });
  };

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      render(btn.getAttribute("data-filter"));
    });
  });

  lightbox?.addEventListener("click", () => lightbox.classList.remove("is-open"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox?.classList.remove("is-open");
  });

  render("all");
})();
