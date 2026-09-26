/* ============================================================
   WORTEX — tournament hub / archive pages
   Add a game: TOURNAMENT_PAGES + TOURNAMENTS[id] + HTML shell
   ============================================================ */

(function () {
  const rootEl = document.getElementById("tournament-root");
  const tournamentId = document.body && document.body.dataset.tournament;
  if (!rootEl || !tournamentId) return;

  const ROOT = (document.body.dataset.root || "..").replace(/\/$/, "");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function t(key, fallback) {
    if (window.WORTEX && WORTEX.i18n && typeof WORTEX.i18n.t === "function") {
      return WORTEX.i18n.t(key, fallback);
    }
    return fallback || "";
  }

  function place(value) {
    if (window.WORTEX && WORTEX.i18n && typeof WORTEX.i18n.placement === "function") {
      return WORTEX.i18n.placement(value);
    }
    return value;
  }

  function asset(path) {
    return ROOT + "/" + String(path).replace(/^\//, "");
  }

  function el(tag, attrs, kids) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        const val = attrs[key];
        if (val == null || val === false) return;
        if (key === "class") node.className = val;
        else if (key === "text") node.textContent = val;
        else node.setAttribute(key, val === true ? "" : String(val));
      });
    }
    (kids || []).forEach((child) => {
      if (child == null || child === false) return;
      node.append(typeof child === "string" || typeof child === "number" ? document.createTextNode(String(child)) : child);
    });
    return node;
  }

  const CGI = [
    "assets/cgi/prism.svg",
    "assets/cgi/core.svg",
    "assets/cgi/shard.svg",
    "assets/cgi/torus.svg",
    "assets/cgi/orb.svg",
    "assets/cgi/ring.svg",
    "assets/cgi/wire.svg",
    "assets/cgi/vod-1.svg",
  ];

  const TOURNAMENT_PAGES = [
    { id: "starcraft2", file: "starcraft2.html", title: "STARCRAFT II" },
    { id: "starcraft", file: "starcraft.html", title: "STARCRAFT" },
    { id: "hearthstone", file: "hearthstone.html", title: "HEARTHSTONE" },
    { id: "more", file: "more.html", title: "MORE" },
  ];

  function youtubeIdFrom(url) {
    const match = String(url).match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
    return match ? match[1] : "";
  }

  function vod(title, url, extra) {
    extra = extra || {};
    return {
      title: title,
      url: url,
      youtubeId: youtubeIdFrom(url),
      year: extra.year || "",
      type: extra.type || "",
      featured: Boolean(extra.featured),
    };
  }

  function player(name, extra) {
    extra = extra || {};
    return {
      name: name,
      team: extra.team || "",
      achievements: extra.achievements || [],
      image: extra.image || "",
    };
  }

  const TOURNAMENTS = {
    starcraft2: {
      title: "STARCRAFT II",
      titleParts: ["STARCRAFT", "II"],
      visual: "assets/cgi/prism.svg",
      aboutHeadingKey: "tourney.sc2About",
      introKey: "tourney.sc2Intro",
      intro:
        "StarCraft II is WORTEX's flagship game — the title where everything started. It has been at the heart of WORTEX since the first tournament in 2025 and remains the main competitive stage of the series, bringing together some of the strongest and most recognizable players from the Hungarian StarCraft community.",
      meta: [
        ["CATEGORY", "RTS"],
        ["WORTEX SINCE", "2025"],
        ["EVENTS", "2"],
        ["STATUS", "ONGOING SERIES"],
        ["UPCOMING", "TBA"],
      ],
      eventsTitle: ["WORTEX STARCRAFT II", "EVENTS"],
      events: [
        { name: "WORTEX 2025", status: "PAST EVENT", href: "#events" },
        { name: "WORTEX 2026", status: "PAST EVENT", href: "#events" },
        { name: "TBA", status: "UPCOMING" },
      ],
      players: [
        player("NIHED", {
          team: "Orion Wanderers",
          achievements: [{ year: "2025", placement: "Champion" }],
        }),
        player("FREEMAN", {
          team: "Ancien Regime",
          achievements: [{ year: "2026", placement: "Champion" }],
        }),
        player("PSZ", {
          team: "Ancien Regime",
          achievements: [
            { year: "2025", placement: "Runner-up" },
            { year: "2026", placement: "Runner-up" },
          ],
        }),
        player("WiNtER", {
          achievements: [{ year: "2025", placement: "Top 4" }],
        }),
        player("mOsTeN", {
          team: "Team Zentris",
          achievements: [{ year: "2025", placement: "Top 4" }],
        }),
        player("RobbyG", {
          team: "Team Zentris",
          achievements: [{ year: "2026", placement: "Top 4" }],
        }),
      ],
      prize: {
        total: "534,000 HUF",
        note: "Prize money awarded across WORTEX StarCraft II tournaments so far.",
        breakdown: [
          { label: "WORTEX 2025", amount: "234,000 HUF" },
          { label: "WORTEX 2026", amount: "300,000 HUF" },
        ],
      },
      vods: [
        vod("WORTEX 2026 GRAND FINAL — Freeman vs Psz", "https://www.youtube.com/watch?v=eM9KBr2kOoc", {
          year: "2026",
          type: "Grand Final",
          featured: true,
        }),
        vod("Psz vs Breach — Showmatch", "https://youtu.be/7ql6au48Wl4", { year: "2026", type: "Showmatch" }),
        vod("Breach vs White-Ra — Showmatch", "https://youtu.be/OsUOACf8_Fk", { year: "2026", type: "Showmatch" }),
        vod("WORTEX | StarCraft II: Group A — Nihed, RobbyG, Order, Panda", "https://youtu.be/CXOOgy5E4k4", {
          year: "2026",
          type: "Group Stage",
        }),
        vod("WORTEX | StarCraft II: Group B — Psz, Freeman, mOsTeN, Milkaa", "https://youtu.be/DuiEGxUarDY", {
          year: "2026",
          type: "Group Stage",
        }),
        vod("WORTEX Last Chance Qualifier 2026", "https://youtu.be/M9niAUlIfvI", { year: "2026", type: "Qualifier" }),
        vod("WORTEX 2025 — Nihed vs Psz", "https://youtu.be/7Kcx0ZFNDSY", { year: "2025", type: "Grand Final" }),
      ],
    },

    starcraft: {
      title: "STARCRAFT",
      kicker: "BROOD WAR / REMASTERED",
      visual: "assets/cgi/shard.svg",
      aboutHeadingKey: "tourney.scAbout",
      introKey: "tourney.scIntro",
      intro:
        "Classic StarCraft returned to the stage at WORTEX in 2026. The first WORTEX StarCraft: Remastered tournament showed that there is still real interest in competitive Brood War, bringing the legendary RTS back into an offline WORTEX environment.",
      meta: [
        ["CATEGORY", "RTS"],
        ["WORTEX SINCE", "2026"],
        ["EVENTS", "1"],
        ["STATUS", "SERIES ESTABLISHED"],
        ["UPCOMING", "TBA"],
      ],
      eventsTitle: ["WORTEX STARCRAFT", "EVENTS"],
      events: [
        { name: "WORTEX 2026", status: "PAST EVENT", note: "First WORTEX StarCraft event", href: "#events" },
        { name: "TBA", status: "UPCOMING" },
      ],
      players: [
        player("EAGLE", { achievements: [{ year: "2026", placement: "Champion" }] }),
        player("NON", { team: "Team Zentris", achievements: [{ year: "2026", placement: "Runner-up" }] }),
        player("$MARINE$", { achievements: [{ year: "2026", placement: "3rd Place" }] }),
        player("PROTEXIN", { achievements: [{ year: "2026", placement: "4th Place" }] }),
      ],
      prize: {
        total: "75,000 HUF",
        note: "Prize money awarded in the first WORTEX StarCraft tournament.",
      },
      vods: [
        vod("SEMI-FINALS", "https://youtu.be/F4oeh5WkVxE", {
          year: "WORTEX 2026",
          type: "STARCRAFT: REMASTERED",
          featured: true,
        }),
        vod("TOP 8 — GROUP B", "https://youtu.be/Q66JJU0ysyg", {
          year: "WORTEX 2026",
          type: "STARCRAFT: REMASTERED",
        }),
        vod("TOP 8 — GROUP A", "https://youtu.be/GuiW4qaHDCM", {
          year: "WORTEX 2026",
          type: "STARCRAFT: REMASTERED",
        }),
        vod("PLAY-INS — PART 2", "https://youtu.be/8WsxxEEkcXg", {
          year: "WORTEX 2026",
          type: "STARCRAFT: REMASTERED",
        }),
        vod("PLAY-INS — PART 1", "https://youtu.be/XCaqsl7jnTo", {
          year: "WORTEX 2026",
          type: "STARCRAFT: REMASTERED",
        }),
        vod("WEEK 3", "https://youtu.be/bMXwrZMZ_KM", {
          year: "WORTEX 2026",
          type: "STARCRAFT: REMASTERED",
        }),
        vod("WEEK 2", "https://youtu.be/GqwW7b4JFgU", {
          year: "WORTEX 2026",
          type: "STARCRAFT: REMASTERED",
        }),
      ],
    },

    hearthstone: {
      title: "HEARTHSTONE",
      visual: "assets/cgi/torus.svg",
      aboutHeadingKey: "tourney.hsAbout",
      introKey: "tourney.hsIntro",
      intro:
        "Hearthstone joined WORTEX in 2026 with its first dedicated tournament series. The game brought a different competitive format to WORTEX while expanding the event beyond traditional RTS titles.",
      meta: [
        ["CATEGORY", "CARD GAME"],
        ["WORTEX SINCE", "2026"],
        ["EVENTS", "1"],
        ["UPCOMING", "TBA"],
      ],
      eventsTitle: ["WORTEX HEARTHSTONE", "EVENTS"],
      events: [
        { name: "WORTEX 2026", status: "PAST EVENT", note: "First WORTEX Hearthstone tournament", href: "#events" },
        { name: "TBA", status: "UPCOMING" },
      ],
      players: [
        player("VALNARR", { achievements: [{ year: "2026", placement: "Champion" }] }),
        player("SSB", { achievements: [{ year: "2026", placement: "Runner-up" }] }),
      ],
      sideFeature: {
        kicker: "ON-SITE BO1 WINNER",
        name: "HUBY",
        note: "Winner of the separate on-site BO1 activity — not the main Hearthstone championship.",
      },
      prize: {
        total: "50,000 HUF",
        note: "Prize money awarded in the first WORTEX Hearthstone tournament.",
      },
      vods: [
        vod("WORTEX | Hearthstone Group A – Harc a Top 4-be jutásért", "https://youtu.be/s3QKblTWmGE", {
          year: "2026",
          type: "Group Stage",
          featured: true,
        }),
        vod("WORTEX | Hearthstone Qualifier #5 – Harc a Top 8-ba jutásért", "https://youtu.be/eVUAOyCRPUI", {
          year: "2026",
          type: "Qualifier",
        }),
      ],
    },

    more: {
      title: "MORE",
      titleLines: ["MORE", "GAMES"],
      titleLineKeys: ["tourney.moreLine1", "tourney.moreLine2"],
      visual: "assets/cgi/core.svg",
      kickerKey: "tourney.openCall",
      aboutHeadingKey: "tourney.moreAbout",
      introKey: "tourney.moreIntro",
      extraKey: "tourney.moreExtra",
      intro: "WORTEX welcomes any game that shows genuine interest from its community.",
      extra:
        "We want WORTEX to grow together with the players. While StarCraft II, StarCraft and Hearthstone currently form the core of our tournament lineup, we are open to expanding into other games where an active community wants to compete, participate and build something together.",
      interest: [
        { name: "OVERWATCH", image: "assets/img/overwatch.jpg", alt: "Overwatch, a community title WORTEX is open to featuring" },
        { name: "HEROES OF THE STORM", image: "assets/img/heroes-of-the-storm.jpg", alt: "Heroes of the Storm, a community title WORTEX is open to featuring" },
        { name: "WORLD OF WARCRAFT", image: "assets/img/world-of-warcraft.jpg", alt: "World of Warcraft, a community title WORTEX is open to featuring" },
        { name: "WARCRAFT RTS", image: "assets/img/warcraft.jpg", alt: "Warcraft RTS, a community title WORTEX is open to featuring" },
      ],
    },
  };

  const data = TOURNAMENTS[tournamentId];
  if (!data) {
    rootEl.append(el("p", { class: "tourney-lede", text: t("tourney.unknown", "Unknown tournament.") }));
    return;
  }

  let sectionNum = 2;
  function nextNum() {
    const value = String(sectionNum).padStart(2, "0");
    sectionNum += 1;
    return value;
  }

  function light(name) {
    return el("div", { class: "section-light " + name, "aria-hidden": "true" });
  }

  function translateMetaLabel(label) {
    const map = {
      CATEGORY: "tourney.category",
      "WORTEX SINCE": "tourney.since",
      EVENTS: "tourney.events",
      STATUS: "tourney.status",
      UPCOMING: "tourney.upcoming",
    };
    return t(map[label] || "", label);
  }

  function translateMetaValue(value) {
    const map = {
      RTS: "tourney.rts",
      TBA: "tourney.tba",
      "ONGOING SERIES": "tourney.ongoing",
      "SERIES ESTABLISHED": "tourney.established",
      "CARD GAME": "tourney.cardGame",
    };
    return t(map[value] || "", value);
  }

  function translateStatus(status) {
    const map = {
      "PAST EVENT": "tourney.past",
      UPCOMING: "tourney.upcoming",
      TBA: "tourney.tba",
    };
    return t(map[status] || "", status);
  }

  function translateNote(note) {
    const map = {
      "First WORTEX StarCraft event": "tourney.scFirstNote",
      "First WORTEX Hearthstone tournament": "tourney.hsFirstNote",
    };
    return t(map[note] || "", note);
  }

  function displayTitle(id, lines) {
    const heading = el("h2", { class: "display", id: id });
    if (lines.length === 1) {
      heading.textContent = lines[0];
      return heading;
    }
    lines.forEach((line, index) => {
      heading.append(
        el("span", {
          class: index === 0 ? "display-line" : "display-line display-line--muted",
          text: line,
        })
      );
    });
    return heading;
  }

  function sectionHead(num, kicker, title) {
    return el("header", { class: "section-head" }, [
      el("p", { class: "eyebrow", text: num + " — " + kicker }),
      title,
    ]);
  }

  function metaItem(label, value) {
    return el("div", { class: "tourney-meta-item" }, [
      el("p", { class: "eyebrow", text: translateMetaLabel(label) }),
      el("strong", { text: translateMetaValue(value) }),
    ]);
  }

  function heroTitle() {
    if (data.titleParts) {
      return el(
        "h1",
        { class: "display tourney-hero-title is-parts", id: "tournament-title" },
        data.titleParts.map((part) => el("span", { class: "hero-title-word", text: part }))
      );
    }
    if (data.titleLines) {
      const line0 = data.titleLineKeys ? t(data.titleLineKeys[0], data.titleLines[0]) : data.titleLines[0];
      const line1 = data.titleLineKeys ? t(data.titleLineKeys[1], data.titleLines[1]) : data.titleLines[1];
      return el("h1", { class: "display tourney-hero-title", id: "tournament-title" }, [
        el("span", { class: "display-line", text: line0 }),
        el("span", { class: "display-line display-line--muted", text: line1 }),
      ]);
    }
    return el("h1", { class: "display tourney-hero-title", id: "tournament-title", text: data.title });
  }

  function hero() {
    const actions = [];
    if (data.vods && data.vods.length) {
      actions.push(el("a", { class: "cta", href: "#vods", "data-cursor": "PLAY", text: t("vods.watchSeries", "Watch the series") }));
    }

    return el("section", { class: "hero tourney-hero", id: "hero", "aria-labelledby": "tournament-title" }, [
      el("div", { class: "hero-atmosphere", "aria-hidden": "true" }, [
        el("div", { class: "orb orb-a" }),
        el("div", { class: "orb orb-b" }),
        el("div", { class: "orb orb-c" }),
        el("div", { class: "orb orb-core" }),
        el("div", { class: "refract" }),
        el("div", { class: "hero-mark" }, [el("img", { src: asset(data.visual), alt: "" })]),
      ]),
      el("div", { class: "hero-stage" }, [
        el("p", { class: "eyebrow tourney-hero-kicker", text: t(data.kickerKey || "tourney.series", data.kicker || "WORTEX TOURNAMENT SERIES") }),
        heroTitle(),
        el("h2", { class: "sr-only", text: t(data.aboutHeadingKey, data.aboutHeading || ("ABOUT " + data.title)) }),
        el("p", { class: "tourney-lede tourney-hero-intro", text: t(data.introKey, data.intro) }),
        data.extra || data.extraKey ? el("p", { class: "tourney-lede", text: t(data.extraKey, data.extra) }) : null,
        data.meta
          ? el(
              "div",
              { class: "tourney-meta" },
              data.meta.map((pair) => metaItem(pair[0], pair[1]))
            )
          : null,
        actions.length ? el("div", { class: "tourney-actions" }, actions) : null,
      ]),
      el("a", { class: "scroll-hint", href: data.events ? "#events" : "#interest" }, [
        el("span", { text: t("hero.scroll", "SCROLL") }),
        el("span", { class: "scroll-line", "aria-hidden": "true" }),
      ]),
    ]);
  }

  function eventsSection() {
    if (!data.events || !data.events.length) return null;
    return el("section", { class: "tourney-section", id: "events", "aria-labelledby": "events-title" }, [
      light("hof-light"),
      sectionHead(nextNum(), t("tourney.archive", "ARCHIVE"), displayTitle("events-title", [data.title, t("tourney.eventsLine2", "EVENTS")])),
      el(
        "ul",
        { class: "event-list" },
        data.events.map((event) => {
          const clickable = Boolean(event.href);
          return el("li", {}, [
            el(
              clickable ? "a" : "article",
              Object.assign(
                { class: "event-entry panel" },
                clickable ? { href: event.href, "data-cursor": "VIEW" } : {}
              ),
              [
                el("p", { class: "eyebrow", text: translateStatus(event.status) }),
                el("h3", { text: event.name === "TBA" ? t("tourney.tba", "TBA") : event.name }),
                event.note ? el("p", { class: "event-note", text: translateNote(event.note) }) : null,
              ]
            ),
          ]);
        })
      ),
    ]);
  }

  function achievementClass(placement) {
    const value = String(placement).toLowerCase();
    if (value.indexOf("champion") !== -1) return "player-ach is-champion";
    if (value.indexOf("runner") !== -1) return "player-ach is-runner";
    return "player-ach is-place";
  }

  function nopictureCandidates() {
    return [
      "assets/img/nopicture-player.jpg",
      "assets/img/nopicture-player.webp",
      "assets/img/nopicture-player.JPG",
      "assets/img/nopicture-player.jpeg",
      "assets/img/nopicture-player.png",
    ];
  }

  function playerPhotoCandidates(name) {
    const key = String(name || "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    if (!key) return [];
    return [
      "assets/img/" + key + "-player.jpg",
      "assets/img/" + key + "-player.webp",
      "assets/img/" + key + "-player.JPG",
      "assets/img/" + key + "-player.jpeg",
      "assets/img/" + key + "-player.png",
    ];
  }

  function bindPhotoSrc(img, candidates, onFail) {
    if (!img || !candidates.length) {
      if (onFail) onFail();
      return;
    }
    let index = 0;
    function fail() {
      index += 1;
      if (index < candidates.length) img.src = asset(candidates[index]);
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
    img.src = asset(candidates[0]);
  }

  function playerAlt(entry) {
    const names = {
      NIHED: "Nihed",
      FREEMAN: "Freeman",
      EAGLE: "Eagle",
      VALNARR: "Valnarr",
      PANDA: "Panda",
    };
    const name = names[entry.name] || entry.name || "";
    const champ = (entry.achievements || []).filter(function (item) {
      return String(item.placement).toLowerCase().indexOf("champion") !== -1;
    })[0];
    if (tournamentId === "starcraft2" && champ) {
      return name + ", WORTEX " + champ.year + " StarCraft II champion";
    }
    if (tournamentId === "starcraft" && champ) {
      return name + ", WORTEX " + champ.year + " StarCraft tournament champion";
    }
    if (tournamentId === "hearthstone" && champ) {
      return name + ", first WORTEX Hearthstone tournament champion in " + champ.year;
    }
    const place = (entry.achievements || [])[0];
    if (place && place.year) {
      return name + ", " + place.placement + " at the WORTEX " + place.year + " " + data.title + " tournament";
    }
    return name;
  }

  function playerCard(entry, index) {
    const lead = entry.achievements.some((item) => String(item.placement).toLowerCase().indexOf("champion") !== -1);
    const img = el("img", { alt: playerAlt(entry), loading: "lazy", decoding: "async" });
    const candidates = (entry.image ? [entry.image] : [])
      .concat(playerPhotoCandidates(entry.name))
      .concat(nopictureCandidates());
    bindPhotoSrc(img, candidates, function () {
      img.removeAttribute("src");
      img.style.visibility = "hidden";
    });
    return el("article", { class: "player-card merch-card panel" + (lead ? " is-champion" : "") }, [
      el("div", { class: "merch-media" }, [img]),
      el("div", { class: "merch-copy" }, [
        entry.team ? el("p", { class: "t-meta player-team", text: entry.team }) : el("p", { class: "t-meta player-team", text: "\u00a0" }),
        el("h3", { class: "merch-name", text: entry.name }),
        el(
          "ul",
          { class: "player-achs" },
          (entry.achievements || []).map((item) =>
            el("li", { class: achievementClass(item.placement) }, [
              item.year ? el("span", { class: "player-ach-year", text: item.year }) : null,
              el("span", { class: "player-ach-place", text: place(item.placement) }),
            ])
          )
        ),
      ]),
    ]);
  }

  function playersSection() {
    if (!data.players || !data.players.length) return null;
    const kids = [
      light("merch-light"),
      sectionHead(nextNum(), t("tourney.field", "FIELD"), displayTitle("participants-title", [t("tourney.top1", "TOP"), t("tourney.top2", "PARTICIPANTS")])),
      el(
        "ul",
        { class: "player-grid" },
        data.players.map((entry, index) => el("li", {}, [playerCard(entry, index)]))
      ),
    ];
    if (data.sideFeature) {
      kids.push(
        el("aside", { class: "player-side panel" }, [
          el("p", { class: "eyebrow", text: t("tourney.hubyKicker", data.sideFeature.kicker) }),
          el("h3", { text: data.sideFeature.name }),
          el("p", { class: "event-note", text: t("tourney.hubyNote", data.sideFeature.note) }),
        ])
      );
    }
    return el("section", { class: "tourney-section", id: "participants", "aria-labelledby": "participants-title" }, kids);
  }

  function prizeSection() {
    if (!data.prize) return null;
    return el("section", { class: "tourney-section", id: "prize", "aria-labelledby": "prize-title" }, [
      light("chapter-light"),
      sectionHead(nextNum(), t("tourney.awarded", "AWARDED"), displayTitle("prize-title", [t("tourney.prize1", "PRIZE MONEY"), t("tourney.prize2", "AWARDED")])),
      el("p", { class: "tourney-prize-total" }, [
        el("span", { class: "tourney-prize-amount", text: data.prize.total }),
        el("span", { text: t("tourney.total", "TOTAL AWARDED") }),
      ]),
      data.prize.note ? el("p", { class: "tourney-lede", text: t({
        "Prize money awarded across WORTEX StarCraft II tournaments so far.": "tourney.sc2PrizeNote",
        "Prize money awarded in the first WORTEX StarCraft tournament.": "tourney.scPrizeNote",
        "Prize money awarded in the first WORTEX Hearthstone tournament.": "tourney.hsPrizeNote",
      }[data.prize.note] || "", data.prize.note) }) : null,
      data.prize.breakdown
        ? el(
            "ul",
            { class: "tourney-prize-list" },
            data.prize.breakdown.map((row) =>
              el("li", {}, [
                el("span", { class: "place", text: row.label }),
                el("span", { class: "amount", text: row.amount }),
              ])
            )
          )
        : null,
    ]);
  }

  function translateVodTitle(title) {
    const map = {
      "SEMI-FINALS": "vods.semiFinals",
      "TOP 8 — GROUP A": "vods.top8a",
      "TOP 8 — GROUP B": "vods.top8b",
      "PLAY-INS — PART 1": "vods.playIn1",
      "PLAY-INS — PART 2": "vods.playIn2",
      "WEEK 2": "vods.week2",
      "WEEK 3": "vods.week3",
    };
    return t(map[title] || "", title);
  }

  function translateVodType(type) {
    const map = {
      "Grand Final": "vods.grandFinalType",
      Showmatch: "vods.showmatch",
      "Group Stage": "vods.groupStage",
      Qualifier: "vods.qualifier",
    };
    return t(map[type] || "", type);
  }

  function youtubeThumb(id, quality) {
    return "https://img.youtube.com/vi/" + id + "/" + quality + ".jpg";
  }

  function vodsSection() {
    const videos = data.vods || [];
    if (!videos.length) return null;
    const rail = el("div", { class: "vods-rail", id: "vods-rail", tabindex: "0", "aria-label": data.title + " " + t("tourney.videos", "videos") });

    videos.forEach((video) => {
      const card = el("a", {
        class: video.featured ? "vod-card is-featured" : "vod-card",
        href: video.url,
        "data-cursor": "PLAY",
        target: "_blank",
        rel: "noopener noreferrer",
      });
      const img = el("img", { alt: translateVodTitle(video.title), loading: "lazy", decoding: "async" });
      if (video.youtubeId) {
        img.src = youtubeThumb(video.youtubeId, "maxresdefault");
        img.addEventListener("load", function onThumbLoad() {
          if (img.naturalWidth <= 120 && img.src.indexOf("maxresdefault") !== -1) {
            img.src = youtubeThumb(video.youtubeId, "hqdefault");
          }
        });
        img.addEventListener("error", function onThumbError() {
          img.removeEventListener("error", onThumbError);
          img.src = youtubeThumb(video.youtubeId, "hqdefault");
        });
      } else {
        img.src = asset("assets/cgi/vod-1.svg");
      }
      card.append(
        el("div", { class: "vod-thumb" }, [img, el("span", { class: "play-mark", "aria-hidden": "true", text: t("vods.play", "Play") })]),
        el("div", { class: "vod-copy" }, [
          video.year ? el("p", { class: "vod-year", text: video.year }) : null,
          el("h3", { text: translateVodTitle(video.title) }),
          video.type ? el("p", { class: "vod-cat", text: translateVodType(video.type) }) : null,
        ])
      );
      rail.append(card);
    });

    return el("section", { class: "tourney-section tourney-vods", id: "vods", "aria-labelledby": "vods-title" }, [
      light("vods-light"),
      el("header", { class: "section-head vods-head" }, [
        el("div", {}, [
          el("p", { class: "eyebrow", text: nextNum() + " — " + t("vods.film", "FILM") }),
          displayTitle("vods-title", [t("vods.titleLine1", "WATCH"), t("vods.titleLine2", "THE SERIES")]),
        ]),
        el("div", { class: "vods-controls" }, [
          el("button", { type: "button", class: "rail-btn", id: "vod-prev", "aria-label": t("vods.prevAria", "Previous videos"), text: t("vods.prev", "Prev") }),
          el("button", { type: "button", class: "rail-btn", id: "vod-next", "aria-label": t("vods.nextAria", "Next videos"), text: t("vods.next", "Next") }),
        ]),
      ]),
      el("div", { class: "tourney-rail-clip" }, [rail]),
    ]);
  }

  function interestSection() {
    if (!data.interest) return null;
    return el("section", { class: "tourney-section", id: "interest", "aria-labelledby": "interest-title" }, [
      light("tournaments-light"),
      sectionHead(nextNum(), t("tourney.openCall", "OPEN CALL"), displayTitle("interest-title", [t("tourney.interest1", "GAMES WE ARE"), t("tourney.interest2", "INTERESTED IN")])),
      el(
        "ol",
        { class: "interest-grid" },
        data.interest.map((game, index) => {
          const cell = el("li", { class: "interest-cell" }, [
            el("p", { class: "solution-index", text: String(index + 1).padStart(2, "0") }),
            el("h3", { class: "solution-name", text: game.name }),
          ]);
          if (game.image) {
            const img = el("img", { alt: t({
              "Overwatch, a community title WORTEX is open to featuring": "tourney.owAlt",
              "Heroes of the Storm, a community title WORTEX is open to featuring": "tourney.hotsAlt",
              "World of Warcraft, a community title WORTEX is open to featuring": "tourney.wowAlt",
              "Warcraft RTS, a community title WORTEX is open to featuring": "tourney.wcAlt",
            }[game.alt] || "", game.alt || game.name), loading: "lazy", decoding: "async" });
            const media = el("div", { class: "interest-media" }, [img]);
            cell.prepend(media);
            cell.classList.add("has-media");
            bindPhotoSrc(img, [game.image], function () {
              media.remove();
              cell.classList.remove("has-media");
            });
          }
          return cell;
        })
      ),
      el("div", { class: "tourney-interest-cta" }, [
        el("p", { class: "eyebrow", text: t("tourney.noGame", "Don't see your game?") }),
        el("p", { class: "tourney-lede" }, [
          t("tourney.noGameCopy", "If your community wants to see a game represented at WORTEX, "),
          el("a", { href: asset("index.html") + "#contact", "data-cursor": "VIEW", text: t("tourney.getInContact", "get in contact") }),
          ".",
        ]),
        el("div", { class: "tourney-actions" }, [
          el("a", {
            class: "cta",
            href: "mailto:contact@wortexgg.hu?subject=" + encodeURIComponent(t("tourney.mailSubject", "Bring a game to WORTEX")),
            "data-cursor": "MAIL",
            text: t("tourney.bring", "Bring your game to WORTEX"),
          }),
        ]),
      ]),
    ]);
  }

  function renderFooter() {
    const footer = document.querySelector("footer.site-footer");
    if (!footer) return;
    footer.className = "tourney-footer";
    footer.replaceChildren(
      el("div", { class: "tourney-footer-grid" }, [
        el("div", {}, [
          el("p", { class: "tourney-footer-brand", text: "WORTEX" }),
          el("div", { class: "tourney-footer-meta" }, [
            el("span", { text: "Realms Unleashed" }),
            el("span", { text: t("footer.hungary", "Hungary") }),
            el("span", { text: t("footer.est", "Est. 2025") }),
          ]),
        ]),
        el("div", {}, [
          el("h3", { text: t("footer.social", "Social") }),
          el("nav", { class: "footer-socials", id: "footer-socials", "aria-label": t("contact.socials", "WORTEX social profiles") }),
        ]),
        el("div", {}, [
          el("h3", { text: t("footer.tournaments", "Tournaments") }),
          el(
            "nav",
            { class: "footer-links", "aria-label": t("footer.tournaments", "Tournaments") },
            TOURNAMENT_PAGES.map((page) =>
              el("a", {
                href: page.file,
                "aria-current": page.id === tournamentId ? "page" : null,
                "data-cursor": "VIEW",
                text: page.id === "more" ? t("footer.more", page.title) : page.title,
              })
            )
          ),
        ]),
        el("div", {}, [
          el("h3", { text: "WORTEX" }),
          el("nav", { class: "footer-links", "aria-label": "WORTEX" }, [
            el("a", { href: asset("index.html"), "data-cursor": "BACK", text: t("footer.backSite", "Back to main site") }),
            el("a", { href: "mailto:contact@wortexgg.hu", "data-cursor": "MAIL", text: t("nav.contact", "Contact") }),
          ]),
        ]),
      ]),
      el("div", { class: "tourney-footer-legal" }, [
        el("span", { text: "© WORTEX" }),
        el("span", { text: t("footer.built", "Built for the community.") }),
        el("span", {}, [
          document.createTextNode(t("footer.designed", "Designed by") + " "),
          el("a", {
            href: "https://azxcreative.com",
            target: "_blank",
            rel: "noopener noreferrer",
            text: "AZX Creative",
          }),
        ]),
      ])
    );
  }

  function ensureMobileNavBack() {
    const list = document.getElementById("nav-list");
    if (!list || list.querySelector(".nav-end")) return;
    list.append(
      el("li", { class: "nav-end" }, [
        el("a", { href: asset("index.html"), "data-cursor": "BACK", text: t("nav.backEnd", "Back to WORTEX") }),
      ])
    );
  }

  let didMotion = false;

  function mount(options) {
    options = options || {};
    sectionNum = 2;
    const mounted = [hero(), eventsSection(), playersSection(), prizeSection(), vodsSection(), interestSection()].filter(Boolean);
    rootEl.replaceChildren.apply(rootEl, mounted);
    renderFooter();
    ensureMobileNavBack();
    const endLink = document.querySelector(".nav-end a");
    if (endLink) endLink.textContent = t("nav.backEnd", "Back to WORTEX");
    const back = document.querySelector(".nav-back");
    if (back) back.textContent = t("nav.backWortex", "← Back to WORTEX");

    if (options.skipMotion) {
      if (window.WORTEX && WORTEX.i18n && typeof WORTEX.i18n.apply === "function") {
        WORTEX.i18n.apply();
      }
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.getAll().forEach(function (st) {
          if (st.trigger && !document.body.contains(st.trigger)) st.kill();
        });
      }
      document.dispatchEvent(new Event("wortex:contentrefresh"));
      return;
    }

    if (typeof gsap === "undefined" || reduceMotion || didMotion) return;
    didMotion = true;
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".tourney-hero .display", { y: 36, duration: 1.15, ease: "power3.out" });
    gsap.from(".tourney-hero-intro, .tourney-hero .tourney-meta-item, .tourney-hero .tourney-actions a", {
      y: 16,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      stagger: 0.05,
      ease: "power2.out",
    });
    document.querySelectorAll(".tourney-section .display").forEach((heading) => {
      gsap.from(heading, {
        y: 32,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading.closest(".tourney-section"),
          start: "top 82%",
          once: true,
        },
      });
    });
  }

  mount();
  if (window.WORTEX && WORTEX.i18n && typeof WORTEX.i18n.onChange === "function") {
    WORTEX.i18n.onChange(function () {
      mount({ skipMotion: true });
    });
  }
})();
