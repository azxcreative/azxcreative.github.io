/* ============================================================
   WORTEX — motion, cursor, funding, vods
   ============================================================ */

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const isTournamentPage = Boolean(document.body && document.body.dataset.tournament);
  const isSubpage = Boolean(
    isTournamentPage ||
      (document.body && (document.body.dataset.article || document.body.dataset.articles))
  );

  function t(key, fallback) {
    if (window.WORTEX && WORTEX.i18n && typeof WORTEX.i18n.t === "function") {
      return WORTEX.i18n.t(key, fallback);
    }
    return fallback || "";
  }

  /* ----------------------------------------------------------
     HALL OF FAME
     ---------------------------------------------------------- */
  const HOF_CHAMPIONS = [
    {
      year: "2025",
      champions: [
        {
          game: "StarCraft II",
          player: "Nihed",
          team: "Orion Wanderers",
          title: "Champion",
          featured: true,
        },
      ],
    },
    {
      year: "2026",
      champions: [
        {
          game: "StarCraft II",
          player: "Freeman",
          team: "Ancien Régime",
          title: "Champion",
          featured: true,
        },
        {
          game: "StarCraft: Remastered",
          player: "Eagle",
          title: "Champion",
          featured: false,
        },
        {
          game: "Hearthstone",
          player: "Valnarr",
          title: "Champion",
          featured: false,
        },
      ],
    },
  ];

  function createChampionBlock(entry, year) {
    const wrap = document.createElement(entry.featured ? "div" : "li");
    wrap.className = entry.featured ? "hof-champ hof-champ--main" : "hof-champ hof-champ--support";
    wrap.setAttribute("role", "group");
    wrap.setAttribute(
      "aria-label",
      t("hof.aria", "{player} was the WORTEX {year} {game} champion.")
        .replace("{player}", entry.player)
        .replace("{year}", year)
        .replace("{game}", entry.game)
    );

    const gameEl = document.createElement("p");
    gameEl.className = "hof-item-game";
    gameEl.textContent = entry.game;

    const playerEl = document.createElement("h3");
    playerEl.className = "hof-item-player";
    playerEl.textContent = entry.player;

    wrap.append(gameEl, playerEl);

    if (entry.team) {
      const teamEl = document.createElement("p");
      teamEl.className = "hof-item-team";
      teamEl.textContent = entry.team;
      wrap.append(teamEl);
    }

    const titleEl = document.createElement("p");
    titleEl.className = "hof-item-title";
    titleEl.textContent = t("result.champion", entry.title);
    wrap.append(titleEl);

    return wrap;
  }

  function renderHallOfFame(years) {
    const list = document.getElementById("hof-list");
    if (!list) return;

    list.replaceChildren();

    years.forEach((entry, index) => {
      const item = document.createElement("li");
      item.className = "hof-item";

      const yearBlock = document.createElement("div");
      yearBlock.className = "hof-item-yearblock";

      const indexEl = document.createElement("span");
      indexEl.className = "year-index";
      indexEl.textContent = String(index + 1).padStart(2, "0");

      const yearEl = document.createElement("span");
      yearEl.className = "hof-item-year";
      yearEl.textContent = entry.year;

      yearBlock.append(indexEl, yearEl);

      const dot = document.createElement("span");
      dot.className = "hof-dot";
      dot.setAttribute("aria-hidden", "true");

      const copy = document.createElement("div");
      copy.className = "hof-item-copy";

      const featured = entry.champions.filter((champ) => champ.featured);
      const support = entry.champions.filter((champ) => !champ.featured);

      featured.forEach((champ) => copy.append(createChampionBlock(champ, entry.year)));

      if (support.length) {
        const supportList = document.createElement("ul");
        supportList.className = "hof-support";
        support.forEach((champ) => supportList.append(createChampionBlock(champ, entry.year)));
        copy.append(supportList);
      }

      item.append(yearBlock, dot, copy);
      list.append(item);
    });
  }

  if (!isSubpage) renderHallOfFame(HOF_CHAMPIONS);

  /* ----------------------------------------------------------
     SOLUTIONS
     ---------------------------------------------------------- */
  const SOLUTIONS = [
    {
      name: "Void Run Challenge",
      blurb: "Interactive competitive experience",
      src: "assets/img/void-run-sol",
    },
    {
      name: "Live Voting System",
      blurb: "Real-time audience interaction system",
      src: "assets/img/live-voting-sol",
    },
  ];

  function photoCandidates(path) {
    const value = String(path || "");
    if (!value) return [];
    if (/\.(jpg|jpeg|png|webp|gif)$/i.test(value)) return [value];
    return [".jpg", ".webp", ".JPG", ".jpeg", ".png"].map((ext) => value + ext);
  }

  function bindPhotoSrc(img, candidates, onFail) {
    if (!img || !candidates.length) {
      if (onFail) onFail();
      return;
    }
    let index = 0;
    function fail() {
      index += 1;
      if (index < candidates.length) img.src = candidates[index];
      else {
        img.removeEventListener("error", fail);
        if (onFail) onFail();
      }
    }
    img.addEventListener("error", fail);
    img.style.visibility = "hidden";
    img.addEventListener("load", function () {
      img.style.visibility = "";
    });
    img.src = candidates[0];
  }

  function renderSolutions(items) {
    const list = document.getElementById("solution-list");
    if (!list) return;

    list.replaceChildren();

    items.forEach((item, index) => {
      const block = document.createElement("li");
      block.className = "solution-block";

      const media = document.createElement("div");
      media.className = "solution-media";
      const photo = document.createElement("img");
      photo.alt = item.name;
      photo.loading = "lazy";
      media.append(photo);
      block.append(media);
      bindPhotoSrc(photo, photoCandidates(item.src), () => {
        media.remove();
        block.classList.remove("has-media");
      });
      block.classList.add("has-media");

      const idx = document.createElement("p");
      idx.className = "solution-index";
      idx.textContent = String(index + 1).padStart(2, "0");

      const name = document.createElement("h3");
      name.className = "solution-name";
      name.textContent = item.name;

      const blurb = document.createElement("p");
      blurb.className = "solution-blurb";
      blurb.textContent = item.blurb;

      block.append(idx, name, blurb);
      list.append(block);
    });
  }

  if (!isSubpage) renderSolutions(SOLUTIONS);

  /* ----------------------------------------------------------
     MERCHANDISE
     ---------------------------------------------------------- */
  const MERCH = [
    {
      name: "WORTEX 2025 T-Shirt",
      src: "assets/items/wortex-2025-logo-t-shirt-men-front.jpg",
    },
    {
      name: "WORTEX Wave Hoodie",
      src: "assets/items/wortex-wave-hoodie.jpg",
    },
    {
      name: "WORTEX 2025 Cap",
      src: "assets/items/wortex-2025-cap.jpg",
    },
  ];

  function renderMerch(items) {
    const grid = document.getElementById("merch-grid");
    if (!grid) return;

    grid.replaceChildren();

    items.forEach((item) => {
      const wrap = document.createElement("li");

      const card = document.createElement("a");
      card.className = "merch-card panel";
      card.href = "https://www.letmicro.com/gallery/azx";
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.setAttribute("data-cursor", "BUY");

      const media = document.createElement("div");
      media.className = "merch-media";

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.name;
      img.loading = "lazy";
      img.decoding = "async";

      media.append(img);

      const copy = document.createElement("div");
      copy.className = "merch-copy";

      const name = document.createElement("h3");
      name.className = "merch-name";
      name.textContent = item.name;

      const buy = document.createElement("span");
      buy.className = "merch-buy";
      buy.append(t("merch.buy", "Buy") + " ");
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "→";
      buy.append(arrow);

      copy.append(name, buy);
      card.append(media, copy);
      wrap.append(card);
      grid.append(wrap);
    });
  }

  if (!isSubpage) renderMerch(MERCH);

  /* ----------------------------------------------------------
     CONTACT
     ---------------------------------------------------------- */
  const SOCIAL_LINKS = [
    { network: "Facebook", id: "wortexgghu", href: "https://facebook.com/wortexgghu" },
    { network: "YouTube", id: "wortexgghu", href: "https://youtube.com/@wortexgghu" },
    { network: "Instagram", id: "wortexgghu", href: "https://instagram.com/wortexgghu" },
    { network: "Twitch", id: "wortexgghu", href: "https://twitch.tv/wortexgghu" },
    { network: "Discord", id: "wortexgg.hu/discord", href: "https://wortexgg.hu/discord" },
    { network: "Email", id: "contact@wortexgg.hu", href: "mailto:contact@wortexgg.hu" },
  ];

  const SOCIAL_ICONS = {
    YouTube:
      "M23.5 6.19A3.02 3.02 0 0 0 21.38 4.05C19.51 3.55 12 3.55 12 3.55s-7.51 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.51 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z",
    Facebook:
      "M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05v-2.66c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z",
    Instagram:
      "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
    Twitch:
      "M11.57 4.71h1.72v5.15h-1.72zm4.72 0H18v5.15h-1.71zM6 0 1.71 4.29v15.43h5.15V24l4.28-4.28h3.43L22.28 12V0zm14.57 11.14-3.43 3.43h-3.43l-3 3v-3H6.86V1.71h13.71z",
    Discord:
      "M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.37-.44.86-.61 1.25a18.27 18.27 0 0 0-5.49 0 12.64 12.64 0 0 0-.61-1.25.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.89 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03 14.09 14.09 0 0 0 1.23-1.99.08.08 0 0 0-.04-.11 13.11 13.11 0 0 1-1.87-.89.08.08 0 0 1-.01-.13c.12-.1.25-.2.37-.29a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01c.12.1.25.2.37.29a.08.08 0 0 1-.01.13 12.3 12.3 0 0 1-1.87.89.08.08 0 0 0-.04.11c.36.7.77 1.36 1.22 1.99a.08.08 0 0 0 .08.03 19.84 19.84 0 0 0 6.01-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03zM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42zm7.98 0c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42z",
  };

  function socialSvg(pathD) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "22");
    svg.setAttribute("height", "22");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", pathD);
    path.setAttribute("fill", "currentColor");
    svg.append(path);
    return svg;
  }

  function renderSocialNav(navId, order) {
    const nav = document.getElementById(navId);
    if (!nav) return;

    const byName = {};
    SOCIAL_LINKS.forEach((link) => {
      byName[link.network] = link;
    });

    nav.replaceChildren();
    order.forEach((name) => {
      const link = byName[name];
      const icon = SOCIAL_ICONS[name];
      if (!link || !icon) return;

      const a = document.createElement("a");
      a.className = "footer-social";
      a.href = link.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("data-cursor", "OPEN");
      a.setAttribute("aria-label", name === "Discord" ? t("contact.discord", "Join the WORTEX Discord") : "WORTEX " + name);

      const label = document.createElement("span");
      label.textContent = name;

      a.append(socialSvg(icon), label);
      nav.append(a);
    });
  }

  function renderSocialLinks() {
    renderSocialNav("contact-links", ["Facebook", "YouTube", "Instagram", "Twitch", "Discord"]);
  }

  if (!isSubpage) renderSocialLinks();

  function renderFooterSocials() {
    renderSocialNav("footer-socials", ["YouTube", "Facebook", "Instagram", "Twitch", "Discord"]);
  }

  renderFooterSocials();

  /* ----------------------------------------------------------
     VODS
     ---------------------------------------------------------- */
  const VODS_MEDIA = [
    { id: "otwCoWGLpyg", title: "WORTEX 2026 Trophy Reveal", category: "Event Film", categoryKey: "vods.eventFilm", year: "2026", featured: true },
    { id: "oNABMfrUWEQ", title: "WORTEX 2026 Highlights", category: "Event Film", categoryKey: "vods.eventFilm", year: "2026", featured: true },
    { id: "eM9KBr2kOoc", title: "StarCraft II Grand Final 2026", titleKey: "vods.grandFinal", category: "StarCraft II", year: "2026" },
    { id: "M0tRCST2nt0", title: "Signature Series — Psz", category: "Documentary", categoryKey: "vods.documentary", year: "2026" },
    { id: "XYCvUr9jhUg", title: "Signature Series — Panda", category: "Documentary", categoryKey: "vods.documentary", year: "2026" },
    { id: "Jfd1UrZETMg", title: "Signature Series — Milkaa", category: "Documentary", categoryKey: "vods.documentary", year: "2026" },
    { id: "p4u58BuDikM", title: "Signature Series — RobbyG", category: "Documentary", categoryKey: "vods.documentary", year: "2026" },
    { id: "aCJ5aazvFdE", title: "WRTX Podcast — Zajdó Csaba “Cameleon”", category: "Interview", categoryKey: "vods.interview", year: "2026" },
    { id: "CXOOgy5E4k4", title: "StarCraft II Group A", titleKey: "vods.groupA", category: "StarCraft II", year: "2026" },
    { id: "DuiEGxUarDY", title: "StarCraft II Group B", titleKey: "vods.groupB", category: "StarCraft II", year: "2026" },
    { id: "F4oeh5WkVxE", title: "StarCraft: Remastered Semi-Finals", titleKey: "vods.remasteredSemis", category: "StarCraft: Remastered", year: "2026" },
  ];

  function youtubeThumb(id, quality) {
    return "https://img.youtube.com/vi/" + id + "/" + quality + ".jpg";
  }

  function renderVods(videos) {
    const rail = document.getElementById("vods-rail");
    if (!rail) return;

    rail.replaceChildren();

    videos.forEach((video) => {
      const card = document.createElement("a");
      card.className = video.featured ? "vod-card is-featured" : "vod-card";
      card.href = "https://www.youtube.com/watch?v=" + video.id;
      card.setAttribute("data-cursor", "PLAY");
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      const thumb = document.createElement("div");
      thumb.className = "vod-thumb";

      const img = document.createElement("img");
      img.src = youtubeThumb(video.id, "maxresdefault");
      img.alt = t(video.titleKey, video.title);
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("load", function onThumbLoad() {
        if (img.naturalWidth <= 120 && img.src.indexOf("maxresdefault") !== -1) {
          img.src = youtubeThumb(video.id, "hqdefault");
        }
      });
      img.addEventListener("error", function onThumbError() {
        img.removeEventListener("error", onThumbError);
        img.src = youtubeThumb(video.id, "hqdefault");
      });

      const play = document.createElement("span");
      play.className = "play-mark";
      play.setAttribute("aria-hidden", "true");
      play.textContent = t("vods.play", "Play");

      thumb.append(img, play);

      const copy = document.createElement("div");
      copy.className = "vod-copy";

      const year = document.createElement("p");
      year.className = "vod-year";
      year.textContent = video.year;

      const title = document.createElement("h3");
      title.textContent = t(video.titleKey, video.title);

      const cat = document.createElement("p");
      cat.className = "vod-cat";
      cat.textContent = t(video.categoryKey, video.category);

      copy.append(year, title, cat);
      card.append(thumb, copy);
      rail.append(card);
    });
  }

  if (!isSubpage) renderVods(VODS_MEDIA);

  /* ----------------------------------------------------------
     CURSOR
     ---------------------------------------------------------- */
  const cursor = document.querySelector(".cursor");
  const cursorLabel = document.querySelector(".cursor-label");

  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("nav-list");
  const isMobileNav = () =>
    window.matchMedia("(max-width: 1100px)").matches ||
    document.documentElement.classList.contains("is-hu-compact-nav");

  const setListInert = (inert) => {
    if (!navList) return;
    if (inert) navList.setAttribute("inert", "");
    else navList.removeAttribute("inert");
  };

  if (nav && navToggle) {
    function setNavOpen(open) {
      nav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute(
        "aria-label",
        open ? t("nav.closeMenu", "Close menu") : t("nav.openMenu", "Open menu")
      );
      document.body.classList.toggle("is-nav-open", open);
      document.body.style.overflow = open ? "hidden" : "";
      document.documentElement.style.overflow = open ? "hidden" : "";
      setListInert(isMobileNav() && !open);
    }

    setListInert(isMobileNav());

    navToggle.addEventListener("click", () => {
      setNavOpen(!nav.classList.contains("is-open"));
    });
    nav.querySelectorAll(".nav-list a").forEach((link) => {
      link.addEventListener("click", () => {
        setNavOpen(false);
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setNavOpen(false);
      }
    });
    window.addEventListener("resize", () => {
      if (!isMobileNav()) setNavOpen(false);
      else if (!nav.classList.contains("is-open")) setListInert(true);
    });
  }

  if (header) {
    const syncHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  if (!finePointer || reduceMotion || window.innerWidth < 861) {
    if (cursor) cursor.style.display = "none";
  } else if (cursor) {
    document.body.classList.add("has-custom-cursor");
    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      cursor.classList.add("is-on");
    });

    window.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-on");
    });

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.22;
      pos.y += (mouse.y - pos.y) * 0.22;
      cursor.style.left = pos.x + "px";
      cursor.style.top = pos.y + "px";
      requestAnimationFrame(tick);
    };
    tick();

    const labeledSelector = "[data-cursor], .cta, .donate-btn, .rail-btn, .partner-mail, .contact-mail, .footer-social, .article-card, .article-teaser";

    document.addEventListener("mouseover", (event) => {
      const labeled = event.target.closest(labeledSelector);
      if (labeled) {
        const label = labeled.getAttribute("data-cursor") || "OPEN";
        cursor.classList.add("is-hover", "is-label");
        cursorLabel.textContent = t("cursor." + label, label);
        return;
      }
      const interactive = event.target.closest("a, button");
      if (interactive) cursor.classList.add("is-hover");
    });

    document.addEventListener("mouseout", (event) => {
      const labeled = event.target.closest(labeledSelector);
      const nextLabeled = event.relatedTarget && event.relatedTarget.closest && event.relatedTarget.closest(labeledSelector);
      if (labeled && nextLabeled !== labeled) {
        cursor.classList.remove("is-label");
        cursorLabel.textContent = "";
        if (!nextLabeled) cursor.classList.remove("is-hover");
        return;
      }
      const interactive = event.target.closest("a, button");
      const nextInteractive = event.relatedTarget && event.relatedTarget.closest && event.relatedTarget.closest("a, button");
      if (interactive && !nextInteractive) cursor.classList.remove("is-hover");
    });
  }

  /* ----------------------------------------------------------
     DONATION UI
     ---------------------------------------------------------- */
  const donateButtons = document.querySelectorAll(".donate-btn");
  const customWrap = document.querySelector(".custom-wrap");
  const customInput = document.querySelector("#custom-amount");
  const selectedLabel = document.querySelector("#selected-amount");
  const form = document.querySelector("#funding-form");
  let selectedAmount = 10;

  function setSelected(value, isCustom) {
    selectedAmount = value;
    if (selectedLabel) {
      selectedLabel.textContent = value ? "€" + value : "Custom";
    }
    donateButtons.forEach((btn) => {
      const amount = btn.getAttribute("data-amount");
      const active = isCustom ? amount === "custom" : amount === String(value);
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  donateButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const amount = btn.getAttribute("data-amount");
      if (amount === "custom") {
        if (!customWrap || !customInput) return;
        customWrap.classList.remove("is-hidden");
        customInput.focus();
        const current = Number(customInput.value);
        setSelected(current > 0 ? current : "", true);
        if (selectedLabel) selectedLabel.textContent = current > 0 ? "€" + current : "Custom";
        return;
      }
      if (customWrap) customWrap.classList.add("is-hidden");
      setSelected(Number(amount), false);
    });
  });

  if (customInput) {
    customInput.addEventListener("input", () => {
      const value = Number(customInput.value);
      selectedAmount = value > 0 ? value : "";
      if (selectedLabel) {
        selectedLabel.textContent = value > 0 ? "€" + value : "Custom";
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let amount = selectedAmount;
      if (customWrap && !customWrap.classList.contains("is-hidden")) {
        amount = Number(customInput.value);
      }
      if (!amount || Number(amount) <= 0) {
        customWrap.classList.remove("is-hidden");
        customInput.focus();
        return;
      }
      const subject = encodeURIComponent("WORTEX 3 support");
      const body = encodeURIComponent("I would like to support WORTEX 3 with €" + amount + ".");
      window.location.href = "mailto:funding@wortex.gg?subject=" + subject + "&body=" + body;
    });
  }

  /* ----------------------------------------------------------
     VODS CAROUSEL
     ---------------------------------------------------------- */
  const rail = document.querySelector("#vods-rail");
  const prev = document.querySelector("#vod-prev");
  const next = document.querySelector("#vod-next");

  function cardWidth() {
    const card = rail && rail.querySelector(".vod-card");
    if (!card) return 640;
    const styles = window.getComputedStyle(rail);
    const gap = parseFloat(styles.columnGap || styles.gap) || 22;
    return card.getBoundingClientRect().width + gap;
  }

  function scrollRail(direction) {
    if (!rail) return;
    rail.scrollBy({ left: direction * cardWidth(), behavior: reduceMotion ? "auto" : "smooth" });
  }

  if (prev) prev.addEventListener("click", () => scrollRail(-1));
  if (next) next.addEventListener("click", () => scrollRail(1));

  if (rail) {
    rail.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollRail(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollRail(-1);
      }
    });
  }

  /* ----------------------------------------------------------
     GSAP ANIMATIONS
     ---------------------------------------------------------- */
  if (typeof gsap === "undefined") {
    document.querySelectorAll(".hof-item").forEach((item) => item.classList.add("is-active"));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (reduceMotion) {
    document.querySelectorAll(".hof-item").forEach((item) => item.classList.add("is-active"));
    gsap.set(".hof-spine-draw", { scaleY: 1, transformOrigin: "top center" });
    gsap.set([".hero-title", ".display", ".chapter-display .w", ".t-block", ".vod-card", ".partner-cell", ".solution-block", ".merch-card"], {
      clearProps: "all",
    });
    return;
  }

  gsap.from(".hero-title-main .ch", {
    y: 36,
    duration: 1.15,
    stagger: 0.05,
    ease: "power3.out",
    delay: 0.05,
  });

  gsap.from([".hero-sub", ".hero-meta", ".scroll-hint"], {
    opacity: 0,
    y: 16,
    duration: 1.2,
    delay: 0.7,
    ease: "power2.out",
    stagger: 0.08,
  });

  gsap.to(".orb-a", {
    x: 90,
    y: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.8,
    },
  });

  gsap.to(".orb-b", {
    x: -60,
    y: 80,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 2,
    },
  });

  gsap.to(".orb-c", {
    x: 40,
    y: 40,
    opacity: 0.35,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  gsap.to(".refract", {
    x: 120,
    rotate: -8,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.7,
    },
  });

  gsap.to(".hof-light", {
    x: -140,
    y: 80,
    ease: "none",
    scrollTrigger: {
      trigger: ".hof",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.8,
    },
  });

  if (document.querySelector(".chapter")) {
    gsap.to(".chapter-light", {
      x: 100,
      y: 120,
      ease: "none",
      scrollTrigger: {
        trigger: ".chapter",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });
  }

  if (document.querySelector(".about")) {
    gsap.to(".about-light", {
      x: -80,
      y: 90,
      ease: "none",
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });
  }

  const reveal = (targets, extra = {}) => {
    gsap.from(targets, {
      y: extra.y || 40,
      duration: 1.2,
      ease: "power3.out",
      stagger: extra.stagger || 0,
      scrollTrigger: {
        trigger: extra.trigger || targets,
        start: "top 88%",
        once: true,
      },
    });
  };

  reveal(".hof-title .display-line", { trigger: ".hof-head", stagger: 0.12 });

  const hofItems = gsap.utils.toArray(".hof-item");
  const hofTimeline = document.querySelector(".hof-timeline");

  if (hofTimeline && hofItems.length) {
    gsap.set(".hof-spine-draw", { scaleY: 0, transformOrigin: "top center" });

    gsap.to(".hof-spine-draw", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: hofTimeline,
        start: "top 72%",
        end: "bottom 48%",
        scrub: 0.7,
        onUpdate: (self) => {
          const height = hofTimeline.offsetHeight || 1;
          hofItems.forEach((item) => {
            const nodePos = (item.offsetTop + 18) / height;
            item.classList.toggle("is-active", self.progress >= nodePos - 0.04);
          });
        },
      },
    });

    hofItems.forEach((item) => {
      const bits = item.querySelectorAll(".hof-item-yearblock, .hof-champ, .hof-support");
      gsap.from(bits, {
        y: 22,
        opacity: 0,
        duration: 1.05,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          once: true,
        },
      });
    });
  }

  if (document.querySelector(".chapter")) {
    gsap.from(".chapter-display .w", {
      y: 56,
      duration: 1.25,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".chapter",
        start: "top 78%",
        once: true,
      },
    });
  }

  if (document.querySelector(".about")) {
    gsap.from(".about-head .display-line", {
      y: 36,
      duration: 1.15,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about",
        start: "top 82%",
        once: true,
      },
    });

    gsap.from([".about-lead", ".about-body p", ".about-meta li"], {
      y: 22,
      duration: 1.05,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-copy",
        start: "top 84%",
        once: true,
      },
    });

    gsap.from(".about-visual", {
      opacity: 0,
      y: 28,
      duration: 1.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-visual",
        start: "top 88%",
        once: true,
      },
    });
  }

  gsap.from(".tournaments .display", {
    x: -28,
    duration: 1.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".tournaments",
      start: "top 82%",
      once: true,
    },
  });

  gsap.from(".t-block", {
    y: 36,
    duration: 1.1,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".tournament-grid",
      start: "top 82%",
      once: true,
    },
  });

  gsap.from(".vods .display-line", {
    y: 32,
    duration: 1.1,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".vods",
      start: "top 82%",
      once: true,
    },
  });

  gsap.from(".vod-card", {
    x: 28,
    duration: 1.05,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".vods-rail",
      start: "top 88%",
      once: true,
    },
  });

  gsap.from(".partner-cell", {
    y: 14,
    duration: 0.85,
    stagger: 0.05,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".partner-grid",
      start: "top 88%",
      once: true,
    },
  });

  if (document.querySelector(".solution-list")) {
    gsap.from(".solution-block", {
      y: 28,
      duration: 1.1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".solution-list",
        start: "top 82%",
        once: true,
      },
    });
  }

  gsap.from(".merch-card", {
    y: 24,
    duration: 1.05,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".merch-grid",
      start: "top 86%",
      once: true,
    },
  });

  reveal(".articles .display", { trigger: ".articles" });
  reveal(".merch .display", { trigger: ".merch" });
  reveal(".partners .display", { trigger: ".partners" });

  gsap.from(".partner-cta", {
    y: 20,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".partner-cta",
      start: "top 90%",
      once: true,
    },
  });

  reveal(".contact .display", { trigger: ".contact" });

  gsap.from(".contact-channel", {
    y: 24,
    duration: 1,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-channels",
      start: "top 86%",
      once: true,
    },
  });

  gsap.from(".contact-socials .footer-social", {
    y: 14,
    duration: 0.8,
    stagger: 0.05,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".contact-follow",
      start: "top 90%",
      once: true,
    },
  });

  const refreshTriggers = () => {
    if (typeof ScrollTrigger === "undefined") return;
    ScrollTrigger.refresh();
  };

  requestAnimationFrame(refreshTriggers);
  window.addEventListener("load", refreshTriggers);

  function refreshLanguageCopy() {
    document.querySelectorAll(".hof-item-title").forEach(function (node) {
      node.textContent = t("result.champion", node.textContent);
    });
    document.querySelectorAll(".hof-champ").forEach(function (wrap) {
      const player = wrap.querySelector(".hof-item-player");
      const game = wrap.querySelector(".hof-item-game");
      const yearNode = wrap.closest(".hof-item") && wrap.closest(".hof-item").querySelector(".hof-item-year");
      if (!player || !game || !yearNode) return;
      wrap.setAttribute(
        "aria-label",
        t("hof.aria", "{player} was the WORTEX {year} {game} champion.")
          .replace("{player}", player.textContent)
          .replace("{year}", yearNode.textContent)
          .replace("{game}", game.textContent)
      );
    });
    if (!isSubpage) {
      renderMerch(MERCH);
      renderVods(VODS_MEDIA);
      renderSocialLinks();
    }
    renderFooterSocials();
    if (navToggle) {
      const open = nav && nav.classList.contains("is-open");
      navToggle.setAttribute(
        "aria-label",
        open ? t("nav.closeMenu", "Close menu") : t("nav.openMenu", "Open menu")
      );
    }
    if (nav && navList && !isMobileNav()) {
      nav.classList.remove("is-open");
      document.body.classList.remove("is-nav-open");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", t("nav.openMenu", "Open menu"));
      }
      setListInert(false);
    } else if (nav && navList) {
      setListInert(isMobileNav() && !nav.classList.contains("is-open"));
    }
  }

  document.addEventListener("wortex:languagechange", refreshLanguageCopy);
  document.addEventListener("wortex:contentrefresh", function () {
    renderFooterSocials();
    if (!isSubpage) renderSocialLinks();
  });

  if (window.WORTEX && WORTEX.i18n && typeof WORTEX.i18n.init === "function") {
    WORTEX.i18n.init();
  }
})();
