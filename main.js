(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const WA_NUMBER = "34605718983";
  const EMAIL = "daaviid.ol.2000@gmail.com";

  /* ---------- Opened from disk: folder links need an explicit index.html ---------- */
  if (location.protocol === "file:") {
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (/^(https?:|mailto:|tel:|#)/.test(href)) return;
      const [p, hash = ""] = href.split("#");
      if (p === "" || p.endsWith("/")) a.setAttribute("href", `${p}index.html${hash ? `#${hash}` : ""}`);
    });
  }

  /* ---------- Load sequence ---------- */
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    root.classList.add("is-loaded");
    const heroBrushes = document.querySelectorAll(".hero [data-paint]");
    heroBrushes.forEach((el, i) => setTimeout(() => el.classList.add("is-painted"), reduceMotion ? 0 : 650 + i * 500));
  };
  const heroImg = document.querySelector(".hero__photo img");
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener("load", start, { once: true });
    heroImg.addEventListener("error", start, { once: true });
    setTimeout(start, 1200); // never hold the page hostage to the photo
  } else {
    requestAnimationFrame(start);
    setTimeout(start, 100); // rAF does not fire in background tabs
  }

  /* ---------- Reveal + brush paint on view ---------- */
  const revealTargets = document.querySelectorAll(".service, .step, .checks li, .process__media, .quote, .services__visual");
  revealTargets.forEach((el) => {
    el.setAttribute("data-reveal", "");
    const siblings = [...el.parentElement.children].filter((c) => c.matches(el.tagName));
    const i = siblings.indexOf(el);
    if (i > 0) el.style.transitionDelay = `${Math.min(i, 4) * 80}ms`;
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.hasAttribute("data-paint")) el.classList.add("is-painted");
      else el.classList.add("is-in");
      io.unobserve(el);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });

  revealTargets.forEach((el) => io.observe(el));
  document.querySelectorAll("[data-paint]").forEach((el) => {
    if (!el.closest(".hero")) io.observe(el);
  });

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.getElementById("menu");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    if (open) menu.querySelector("a").focus({ preventScroll: true });
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
  });
  window.matchMedia("(min-width: 961px)").addEventListener("change", (m) => { if (m.matches) setMenu(false); });

  /* ---------- Services: photo follows the row you're on ---------- */
  const serviceImgs = document.querySelectorAll("[data-service-img]");
  const services = document.querySelectorAll("[data-service]");
  const showService = (key) => {
    serviceImgs.forEach((img) => img.classList.toggle("is-active", img.dataset.serviceImg === key));
    services.forEach((s) => s.classList.toggle("is-active", s.dataset.service === key));
  };
  services.forEach((s) => {
    s.addEventListener("mouseenter", () => showService(s.dataset.service));
    s.addEventListener("focusin", () => showService(s.dataset.service));
  });
  // On touch / narrow screens, the row nearest the middle of the screen drives the photo
  const rowIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) showService(e.target.dataset.service); });
  }, { rootMargin: "-45% 0px -45% 0px" });
  if (window.matchMedia("(hover: none)").matches) services.forEach((s) => rowIO.observe(s));

  /* ---------- Felling scene: the tree comes down section by section as you scroll ---------- */
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
  const lerp = (a, b, t) => a + (b - a) * t;

  const scene = (() => {
    const svg = document.querySelector("[data-scene]");
    if (!svg) return null;
    const $ = (sel) => svg.querySelector(sel);
    const label = document.querySelector("[data-scene-label]");
    const stepNum = document.querySelector("[data-scene-step]");
    const titles = [...document.querySelectorAll(".step__title")].map((t) => t.textContent);

    const parts = {
      frame: $(".sc-frame"), flash: $(".sc-flash"), ruler: $(".sc-ruler"), quote: $(".sc-quote"),
      zone: $(".sc-zone"), trailer: $(".sc-trailer"), climber: $(".sc-climber"), dust: $(".sc-dust"),
      climb: $(".sc-rope--climb"), lower: $(".sc-rope--lower"), stump: $(".sc-stump-top"), clean: $(".sc-clean"),
    };
    // Branches go before the section they hang from; sections come down top to bottom
    const branches = [
      ["br-5", 0.64, 0.67], ["br-4", 0.72, 0.745], ["br-3", 0.735, 0.76], ["br-2", 0.81, 0.835], ["br-1", 0.825, 0.85],
    ].map(([id, a, b]) => {
      const el = svg.getElementById(id);
      return { el, a, b, px: +el.dataset.px, py: +el.dataset.py, dir: +el.dataset.px < 330 ? -1 : 1 };
    });
    const pieces = [
      ["pc-d", 0.67, 0.68, 0.71, 542, 285],
      ["pc-c", 0.76, 0.77, 0.80, 512, 385],
      ["pc-b", 0.85, 0.86, 0.88, 478, 485],
      ["pc-a", 0.89, 0.90, 0.92, 440, 600],
    ].map(([id, c0, c1, c2, slotY, below]) => {
      const el = svg.getElementById(id);
      return { el, c0, c1, c2, slotY, below, ox: +el.dataset.ox, oy: +el.dataset.oy, ring: el.querySelector("ellipse") };
    });
    // Climber harness height over time: up the trunk, then down one section at a time
    const climberY = [[0, 576], [0.58, 576], [0.64, 300], [0.71, 300], [0.72, 400], [0.80, 400], [0.81, 500], [0.88, 500], [0.89, 576], [1, 576]];
    const at = (keys, p) => {
      for (let k = 1; k < keys.length; k++) {
        if (p <= keys[k][0]) {
          const [p0, v0] = keys[k - 1]; const [p1, v1] = keys[k];
          return lerp(v0, v1, ease(clamp((p - p0) / (p1 - p0 || 1))));
        }
      }
      return keys[keys.length - 1][1];
    };

    let lastStep = -1;
    const update = (p, step) => {
      const seg = (a, b) => clamp((p - a) / (b - a));
      const show = (el, o) => { el.style.opacity = o.toFixed(3); };

      // 1 · photos
      show(parts.frame, seg(0.02, 0.08) * (1 - seg(0.2, 0.26)));
      parts.frame.setAttribute("transform", `translate(330 355) scale(${lerp(1.12, 1, ease(seg(0.02, 0.1)))}) translate(-330 -355)`);
      show(parts.flash, Math.max(0, 1 - Math.abs(p - 0.12) / 0.025) * 0.5);
      // 2 · quote
      show(parts.ruler, seg(0.21, 0.25) * (1 - seg(0.42, 0.46)));
      parts.ruler.setAttribute("transform", `translate(0 598) scale(1 ${ease(seg(0.21, 0.32)).toFixed(3)}) translate(0 -598)`);
      show(parts.quote, seg(0.27, 0.31) * (1 - seg(0.42, 0.46)));
      parts.quote.setAttribute("transform", `translate(0 ${(1 - ease(seg(0.27, 0.35))) * 24})`);
      // 3 · safe zone + trailer
      show(parts.zone, seg(0.41, 0.45) * (1 - seg(0.93, 0.97)));
      parts.zone.setAttribute("transform", `translate(0 ${(1 - ease(seg(0.41, 0.47))) * -30})`);
      const trailerX = lerp(260, 0, ease(seg(0.44, 0.56))) + lerp(0, 380, seg(0.93, 1) ** 2);
      show(parts.trailer, seg(0.43, 0.46));
      parts.trailer.setAttribute("transform", `translate(${trailerX} 0)`);

      // 4 · climber, branches, sections
      const cy = at(climberY, p);
      const cx = lerp(296, 214, ease(seg(0.92, 0.95)));
      const climberOn = seg(0.52, 0.57);
      show(parts.climber, climberOn);
      parts.climber.setAttribute("transform", `translate(${cx} ${cy})`);

      branches.forEach(({ el, a, b, px, py, dir }) => {
        const t = seg(a, b);
        el.setAttribute("transform", `translate(0 ${t * t * (600 - py)}) rotate(${t * dir * 80} ${px} ${py})`);
        el.style.opacity = (1 - clamp((t - 0.82) / 0.18)).toFixed(3);
      });

      let anchorY = 190;
      let lowering = null;
      pieces.forEach((pc) => {
        const t = ease(seg(pc.c1, pc.c2));
        const lift = Math.sin(seg(pc.c1, pc.c2) * Math.PI) * -26;
        const dx = (532 + trailerX - pc.ox) * t;
        const dy = (pc.slotY - pc.oy) * seg(pc.c1, pc.c2) ** 1.6 + lift;
        const shake = p > pc.c0 && p < pc.c1 ? Math.sin(p * 4000) * 1.2 : 0;
        pc.el.setAttribute("transform", `translate(${dx + shake} ${dy}) rotate(${90 * t} ${pc.ox} ${pc.oy})`);
        pc.ring.style.opacity = p >= pc.c0 + (pc.c1 - pc.c0) * 0.6 ? 1 : 0;
        if (p >= pc.c1) anchorY = pc.below;
        if (p > pc.c1 && p < pc.c2) lowering = { x: pc.ox + dx, y: pc.oy + dy };
      });
      show(parts.stump, seg(0.89, 0.9));

      const aloft = climberOn > 0 && cy < 570;
      show(parts.climb, aloft ? climberOn : 0);
      parts.climb.setAttribute("d", `M330 ${Math.min(anchorY, cy - 60)} Q${cx + 8} ${(cy + anchorY) / 2} ${cx} ${cy - 8}`);
      show(parts.lower, lowering ? 1 : 0);
      if (lowering) parts.lower.setAttribute("d", `M330 ${anchorY - 4} L${lowering.x} ${lowering.y}`);

      const cutting = branches.some(({ a, b }) => p > a - 0.012 && p < a + (b - a) * 0.3) || pieces.some(({ c0, c1 }) => p > c0 && p < c1);
      svg.classList.toggle("is-cutting", cutting);
      show(parts.dust, cutting ? 1 : 0);
      parts.dust.setAttribute("transform", `translate(${cx + 46} ${cy - 18})`);

      // 5 · cleaned up
      show(parts.clean, seg(0.95, 0.99));
      parts.clean.setAttribute("transform", `translate(0 ${(1 - ease(seg(0.95, 1))) * 16})`);

      if (step !== lastStep && label) {
        lastStep = step;
        label.textContent = titles[step] || "";
        stepNum.textContent = `${step + 1}/${titles.length}`;
      }
    };

    // Ambient loops (leaves, clouds, sawdust) only run while the scene is on screen
    new IntersectionObserver(([e]) => svg.classList.toggle("is-playing", e.isIntersecting && !reduceMotion)).observe(svg);
    return { update };
  })();

  /* ---------- Scroll-linked progress (--k) for tapes, service icons, safety photo, footer ---------- */
  document.querySelectorAll("[data-split]").forEach((el) => {
    el.innerHTML = [...el.textContent].map((ch, i) => `<span style="--i:${i}">${ch === " " ? "&nbsp;" : ch}</span>`).join("");
  });
  // data-k="start,range": --k goes 0 to 1 while the element top travels from start*vh up by range*vh
  const linked = [...document.querySelectorAll("[data-k]")].map((el) => {
    const [start, range] = el.dataset.k.split(",").map(Number);
    return { el, start, range };
  });
  if (reduceMotion) linked.forEach(({ el }) => el.style.setProperty("--k", 1));

  /* ---------- Scroll-driven: header, process, dock, parallax ---------- */
  const header = document.querySelector("[data-header]");
  const steps = document.querySelector(".steps");
  const stepItems = steps ? [...steps.querySelectorAll(".step")] : [];
  const dock = document.querySelector("[data-dock]");
  const hero = document.querySelector(".hero");
  const contact = document.getElementById("contacto");
  const photo = document.querySelector("[data-parallax] img");
  let lastY = window.scrollY;
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    const vh = window.innerHeight;

    const menuOpen = menu.classList.contains("is-open");
    header.classList.toggle("is-hidden", !menuOpen && y > lastY && y > 400);

    if (steps) {
      // Progress through the five steps (0..1), measured against a line in the viewport
      const line = vh * (window.innerWidth < 900 ? 0.78 : 0.6);
      const tops = stepItems.map((s) => s.getBoundingClientRect().top);
      let i = -1;
      tops.forEach((t, k) => { if (t < line) i = k; });
      let p = 0;
      if (i >= 0) {
        const span = i < tops.length - 1 ? tops[i + 1] - tops[i] : vh * 0.3;
        p = (i + clamp((line - tops[i]) / span)) / stepItems.length;
      }
      const current = Math.min(stepItems.length - 1, Math.max(0, i));
      stepItems.forEach((s, k) => {
        s.classList.toggle("is-reached", k <= i);
        s.classList.toggle("is-current", k === current);
      });
      steps.style.setProperty("--rope-p", reduceMotion ? 1 : clamp(p).toFixed(3));
      if (scene) scene.update(reduceMotion ? (current + 1) / stepItems.length : p, current);
    }

    if (!reduceMotion) {
      linked.forEach(({ el, start, range }) => {
        const top = el.getBoundingClientRect().top;
        el.style.setProperty("--k", clamp((vh * start - top) / (vh * range)).toFixed(3));
      });
    }

    if (dock) {
      const pastHero = hero ? hero.getBoundingClientRect().bottom < vh * 0.3 : y > vh * 0.5;
      const atContact = contact ? contact.getBoundingClientRect().top < vh * 0.6 : false;
      dock.classList.toggle("is-visible", pastHero && !atContact);
    }

    if (photo && !reduceMotion && y < vh * 1.2) photo.style.setProperty("--py", `${(-y * 0.12).toFixed(1)}px`);

    lastY = y;
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();


  /* ---------- Quote form ---------- */
  const form = document.querySelector("[data-quote]");
  if (form) {
    const done = form.querySelector("[data-quote-done]");
    const waLink = form.querySelector("[data-send-wa]");
    const mailLink = form.querySelector("[data-send-mail]");

    const rules = {
      nombre: (v) => v.trim().length >= 2 || "Escribe tu nombre para saber a quién respondemos.",
      telefono: (v) => /^(\+?34)?[6789]\d{8}$/.test(v.replace(/[\s.-]/g, "")) || "Revisa el teléfono: tiene que tener 9 cifras, por ejemplo 605 718 983.",
      localidad: (v) => v.trim().length >= 2 || "Dinos en qué localidad está el árbol.",
      privacidad: (_, el) => el.checked || "Necesitamos tu permiso para usar estos datos y responderte.",
    };

    const check = (name) => {
      const el = form.elements[name];
      const result = rules[name](el.value, el);
      const msg = result === true ? "" : result;
      const field = el.closest(".field");
      field.classList.toggle("has-error", Boolean(msg));
      el.setAttribute("aria-invalid", String(Boolean(msg)));
      document.getElementById(`e-${name}`).textContent = msg;
      return !msg;
    };

    Object.keys(rules).forEach((name) => {
      const el = form.elements[name];
      el.addEventListener(el.type === "checkbox" ? "change" : "blur", () => check(name));
      el.addEventListener("input", () => { if (el.closest(".field").classList.contains("has-error")) check(name); });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const invalid = Object.keys(rules).filter((name) => !check(name));
      if (invalid.length) { form.elements[invalid[0]].focus(); return; }

      const d = Object.fromEntries(new FormData(form));
      const lines = [
        `Hola, soy ${d.nombre.trim()}. Quería pedir presupuesto.`,
        `Trabajo: ${d.trabajo}`,
        `Localidad: ${d.localidad.trim()}`,
        `Teléfono: ${d.telefono.trim()}`,
      ];
      if (d.mensaje && d.mensaje.trim()) lines.push(`Detalles: ${d.mensaje.trim()}`);
      const text = lines.join("\n");

      waLink.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
      mailLink.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Presupuesto: ${d.trabajo} en ${d.localidad.trim()}`)}&body=${encodeURIComponent(text)}`;
      done.hidden = false;
      done.focus();
    });

    form.querySelector("[data-quote-reset]").addEventListener("click", () => {
      done.hidden = true;
      form.elements.nombre.focus();
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
