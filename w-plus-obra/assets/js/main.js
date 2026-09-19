(function () {
  const cfg = window.WPLUS_CONFIG || {};
  const page = document.body.getAttribute("data-page") || "";

  document.querySelectorAll("[data-nav] a").forEach((link) => {
    const key = link.getAttribute("data-nav-key");
    if (key && key === page) {
      link.setAttribute("aria-current", "page");
    }
  });

  const header = document.querySelector("[data-header]");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.querySelector("[data-open-menu]");
  const mobile = document.querySelector("[data-mobile-nav]");
  const closeBtn = document.querySelector("[data-close-menu]");
  const setMenu = (open) => {
    if (!mobile) return;
    mobile.classList.toggle("is-open", open);
    mobile.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle?.addEventListener("click", () => setMenu(true));
  closeBtn?.addEventListener("click", () => setMenu(false));
  mobile?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  const digits = String(cfg.whatsapp || "").replace(/\D/g, "");
  const waUrl = digits ? "https://wa.me/" + digits : "";
  const message = encodeURIComponent("Hola, me interesa una cotización con W+ OBRA.");

  document.querySelectorAll("[data-requires-whatsapp]").forEach((el) => {
    if (!waUrl) {
      el.hidden = true;
      return;
    }
    el.classList.add("has-whatsapp");
    el.hidden = false;
    if (el.tagName === "A") {
      el.href = waUrl + "?text=" + message;
    }
  });

  const floatBtn = document.querySelector("[data-wa-float]");
  if (floatBtn && waUrl) {
    floatBtn.href = waUrl + "?text=" + message;
    floatBtn.classList.add("is-visible");
    floatBtn.hidden = false;
  }

  const phone = String(cfg.phone || "").trim();
  const email = String(cfg.email || "").trim();
  const address = String(cfg.address || "").trim();
  const hours = String(cfg.hours || "").trim();
  const map = String(cfg.mapsEmbedSrc || "").trim();

  const setContact = (selector, value, href) => {
    const node = document.querySelector(selector);
    if (!node) return;
    if (!value) {
      node.hidden = true;
      return;
    }
    node.hidden = false;
    const target = node.querySelector("[data-value]") || node;
    target.textContent = value;
    if (href && node.tagName === "A") node.href = href;
  };

  setContact("[data-contact-phone]", phone, phone ? "tel:" + phone.replace(/\s/g, "") : "");
  setContact("[data-contact-email]", email, email ? "mailto:" + email : "");
  setContact("[data-contact-address]", address);
  setContact("[data-contact-hours]", hours);

  const mapWrap = document.querySelector("[data-map]");
  if (mapWrap) {
    if (!map) mapWrap.hidden = true;
    else {
      const iframe = mapWrap.querySelector("iframe");
      if (iframe) iframe.src = map;
    }
  }

  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const service = String(data.get("service") || "").trim();
    const body = String(data.get("message") || "").trim();
    if (!name || !contact || !body) {
      if (status) status.textContent = "Completa nombre, contacto y mensaje.";
      return;
    }
    const text = `Hola, soy ${name}. Contacto: ${contact}. Servicio: ${service || "por definir"}. ${body}`;
    if (digits) {
      window.location.href = "https://wa.me/" + digits + "?text=" + encodeURIComponent(text);
      return;
    }
    if (email) {
      window.location.href =
        "mailto:" + email + "?subject=" + encodeURIComponent("Consulta W+ OBRA") + "&body=" + encodeURIComponent(text);
      return;
    }
    if (status) {
      status.textContent =
        "El formulario está listo, pero aún no hay WhatsApp ni correo configurados. Añádelos en assets/js/config.js.";
    }
  });
})();
