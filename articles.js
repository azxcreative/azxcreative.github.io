/* ============================================================
   WORTEX — articles / news
   Add an article: ARTICLES push + HTML shell in /articles
   ============================================================ */

(function () {
  const ROOT = (document.body.dataset.root || ".").replace(/\/$/, "");

  function t(key, fallback) {
    if (window.WORTEX && WORTEX.i18n && typeof WORTEX.i18n.t === "function") {
      return WORTEX.i18n.t(key, fallback);
    }
    return fallback || "";
  }

  function localized(article) {
    if (window.WORTEX && WORTEX.i18n && typeof WORTEX.i18n.localizeArticle === "function") {
      return WORTEX.i18n.localizeArticle(article);
    }
    return article;
  }

  function localizedBlocks(slug) {
    const en = BLOCKS[slug] || [];
    if (window.WORTEX && WORTEX.i18n && typeof WORTEX.i18n.blocks === "function") {
      return WORTEX.i18n.blocks(slug, en);
    }
    return en;
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

  function hrefFor(article) {
    if (document.body.dataset.article) return article.slug + ".html";
    return article.url;
  }

  function isPhotoFile(file) {
    const f = String(file || "");
    if (!f || f.indexOf("assets/cgi/") === 0) return false;
    return /\.(jpe?g|png|webp|gif)$/i.test(f);
  }

  function ph(label, cgi, file, opts) {
    opts = opts || {};
    const photo = isPhotoFile(file) ? file : "";
    const img = el("img", {
      alt: label || "",
      loading: opts.eager ? "eager" : "lazy",
      decoding: "async",
    });
    if (opts.eager) img.setAttribute("fetchpriority", "high");
    const kids = [img];
    if (!opts.hideLabel && label) {
      kids.push(el("span", { class: "article-ph-label", text: label }));
    }
    const node = el("div", {
      class: "article-ph" + (photo ? " is-photo" : ""),
      "data-file": file || "",
      role: "img",
      "aria-label": label || "",
    }, kids);
    img.style.visibility = "hidden";
    img.addEventListener("load", function () {
      img.style.visibility = "";
    });
    img.addEventListener("error", function () {
      if (photo && cgi && img.src.indexOf(asset(cgi)) === -1) {
        img.src = asset(cgi);
        node.classList.remove("is-photo");
        return;
      }
      img.removeAttribute("src");
      node.classList.remove("is-photo");
    });
    img.src = asset(photo || cgi);
    return node;
  }

  function captionedFigure(className, media, caption) {
    return el("figure", { class: className }, [
      media,
      caption ? el("figcaption", { class: "article-caption", text: caption }) : null,
    ]);
  }

  const ARTICLES = [
    {
      slug: "wortex-from-community-to-offline-stage",
      category: "WORTEX",
      title: "WORTEX — From Community to Offline Stage",
      date: "2026",
      excerpt:
        "WORTEX started with a simple idea: create tournaments people would actually want to remember.",
      deck:
        "WORTEX started with a simple idea: create tournaments people would actually want to remember.",
      url: "articles/wortex-from-community-to-offline-stage.html",
      image: "assets/img/wortex-getting-ready.jpg",
      imageLabel: "WORTEX event team preparing the offline esports venue",
      cgi: "assets/cgi/prism.svg",
      heroCaption: "Getting ready for the WORTEX offline event.",
      related: ["signature-series-panda", "warcraft-starcraft-new-era"],
      og:
        "How WORTEX grew from a tournament idea into an offline esports experience built around competition, production and the people around the games.",
    },
    {
      slug: "signature-series-panda",
      category: "SIGNATURE SERIES",
      title: "Signature Series — The Players Behind WORTEX",
      date: "2026",
      excerpt: "Before the bracket tells you who won, Signature Series tells you who is playing.",
      deck: "Before the bracket tells you who won, Signature Series tells you who is playing.",
      url: "articles/signature-series-panda.html",
      image: "assets/img/panda-portrait.JPG",
      imageLabel: "Panda, StarCraft II player featured in WORTEX Signature Series",
      cgi: "assets/cgi/torus.svg",
      hero: false,
      related: ["wortex-from-community-to-offline-stage", "warcraft-starcraft-new-era"],
      og:
        "WORTEX Signature Series introduces the players behind the bracket, starting with Panda — the 2026 underdog.",
    },
    {
      slug: "warcraft-starcraft-new-era",
      category: "BLIZZCON 2026 / GAMES",
      title: "Warcraft Returns, StarCraft Looks to a New Era",
      date: "2026",
      excerpt:
        "BlizzCon 2026 delivered major news for two of Blizzard's foundational universes: a new Warcraft III campaign and an entirely new direction for StarCraft.",
      deck:
        "BlizzCon 2026 delivered major news for two of Blizzard's foundational universes: a new Warcraft III campaign and an entirely new direction for StarCraft.",
      url: "articles/warcraft-starcraft-new-era.html",
      image: "assets/articles/warcraft-forsaken-kingdom.jpg",
      imageLabel: "Warcraft III: Reforged — Forsaken Kingdom key art",
      cgi: "assets/cgi/shard.svg",
      heroCaption: "Warcraft III: Reforged — Forsaken Kingdom. Image: Blizzard Entertainment.",
      related: ["wortex-from-community-to-offline-stage", "signature-series-panda"],
      og:
        "Warcraft III: Reforged receives Forsaken Kingdom, while Blizzard announces STARCRAFT, an original open-world shooter planned for Spring 2030.",
    },
  ];

  const BLOCKS = {
    "wortex-from-community-to-offline-stage": [
      { type: "h2", lines: ["From a Tournament", "to an Event"] },
      {
        type: "p",
        text: "The competition matters, but WORTEX was never intended to be only a bracket and a stream link. From the beginning, the goal has been to bring together competitive play, broadcast production, visual identity, player stories and eventually an offline audience. StarCraft II became the foundation of that idea.",
        links: [{ phrase: "StarCraft II", href: asset("tournaments/starcraft2.html") }],
      },
      {
        type: "p",
        text: "The first WORTEX tournament in 2025 established the series, with Nihed becoming the first champion and Psz finishing as runner-up. A year later, WORTEX returned with a broader event. StarCraft II remained the flagship title, but StarCraft: Remastered and Hearthstone joined the programme, expanding the event beyond a single competitive community.",
        links: [
          { phrase: "StarCraft II", href: asset("tournaments/starcraft2.html") },
          { phrase: "StarCraft: Remastered", href: asset("tournaments/starcraft.html") },
          { phrase: "Hearthstone", href: asset("tournaments/hearthstone.html") },
        ],
      },
      {
        type: "p",
        text: "Freeman became the 2026 StarCraft II champion, while Psz once again reached the grand final. In StarCraft: Remastered, Eagle became the first WORTEX champion, with non from Team Zentris finishing runner-up. Hearthstone also joined WORTEX for the first time, with Valnarr taking the main tournament title. But the results are only one part of the project.",
      },
      { type: "h2", lines: ["The Offline", "Experience"] },
      {
        type: "split",
        side: "left",
        figure: {
          file: "assets/img/casters-setup.jpg",
          cgi: "assets/cgi/shard.svg",
          label: "WORTEX commentators and broadcast setup behind the scenes",
          caption: "Behind the scenes with the WORTEX casting and production setup.",
        },
        blocks: [
          {
            type: "p",
            text: "Behind every tournament is the work that turns a list of matches into an event. Production has to be built, casters need a reliable setup, players need a stage, partners need to be represented, and the broadcast needs an identity of its own. Eventually, all of that has to give people a reason to come together and watch.",
          },
          {
            type: "p",
            text: "That is why the offline element has become increasingly important to WORTEX. The event is not only designed for the people playing. It is also built for the audience, the commentators, the production team and the wider community surrounding the games.",
          },
        ],
      },
      {
        type: "figure",
        layout: "wide",
        file: "assets/img/venue-attendees.jpg",
        cgi: "assets/cgi/ring.svg",
        label: "Spectators and players attending the WORTEX offline esports event",
        caption: "Players, spectators and staff together at the offline event.",
      },
      { type: "h2", lines: ["More Than", "Matches"] },
      {
        type: "p",
        text: "WORTEX has also expanded beyond tournament broadcasts. The Signature Series introduced player-focused storytelling before the event. WRTX Podcast created space for longer conversations. Showmatches brought recognizable names together outside the main bracket. And the offline finals turned the competition into something people could physically experience.",
        links: [
          { phrase: "tournament broadcasts", href: asset("index.html") + "#vods" },
          { phrase: "Signature Series", href: "signature-series-panda.html" },
        ],
      },
      { type: "h2", text: "The Next Chapter" },
      {
        type: "p",
        text: "The ambition for the next chapter is not simply to make WORTEX bigger. It is to make it better: better events, better stories, better production, more reasons for players to compete and more reasons for spectators to care.",
      },
      {
        type: "p",
        text: "The games may expand over time, but the core idea remains the same: create competition worth playing, stories worth following, and events worth remembering.",
      },
      { type: "quote", text: "Competition is the foundation. The people around it are what make WORTEX." },
    ],

    "signature-series-panda": [
      { type: "staccato", items: [
        "Tournament broadcasts naturally focus on results.",
        "Who advanced?",
        "Who lost?",
        "Who reached the final?",
        "Who became champion?",
      ] },
      { type: "h2", lines: ["Why Signature Series", "Exists"] },
      {
        type: "p",
        text: "Competitive scenes are built around people long before the result screen appears. That is the idea behind WORTEX Signature Series. Created for the 2026 season, it is a player-focused video format designed to introduce competitors before they reach the offline stage.",
      },
      {
        type: "p",
        text: "The goal is not to predict results. It is to give players their own space: their relationship with the game, their competitive history, their personality, their expectations, and the perspective they bring into WORTEX. The 2026 Signature Series featured Panda, RobbyG, Milkaa and Psz. Each episode was designed as a short player portrait rather than a conventional tournament interview.",
      },
      { type: "h2", lines: ["Panda", "The Underdog"] },
      {
        type: "p",
        text: "Panda entered WORTEX 2026 as one of the easiest players to underestimate. In a group featuring established names and experienced competitors, he did not arrive carrying the expectations placed on the tournament favourites. That made him one of the most interesting players to follow.",
        links: [{ phrase: "WORTEX 2026", href: asset("tournaments/starcraft2.html") }],
      },
      {
        type: "p",
        text: "Underdog stories work because the audience understands the imbalance before the first game begins. A favourite is expected to win. An underdog has the opportunity to change how everyone sees them. For Panda, WORTEX offered exactly that kind of stage.",
      },
      {
        type: "p",
        text: "His Signature Series episode was created to introduce the player before the results could define him. Instead of presenting him only through rankings or previous tournament finishes, the episode gives viewers a chance to understand the person entering the competition.",
      },
      {
        type: "youtube",
        id: "XYCvUr9jhUg",
        title: "WORTEX Signature Series — Panda",
        caption: "WORTEX Signature Series — Panda.",
      },
      {
        type: "p",
        text: "That context changes how a match feels. When viewers already know something about the person behind the player name, an upset means more. A close series means more. Even a loss becomes part of a larger story rather than simply another eliminated name in the bracket.",
      },
      {
        type: "p",
        text: "That is why Signature Series exists. The videos are not intended to replace competitive coverage. They give the competition context. Panda's episode represents the format particularly well because his position as an underdog naturally creates a question before the tournament begins: what happens if he surprises everyone? That question is what player storytelling can add to an esports event before a single map is played.",
      },
      { type: "h2", text: "The Series" },
      {
        type: "p",
        text: "Signature Series is intended to sit alongside the rest of the WORTEX content ecosystem. Tournament broadcasts show the competition. WRTX Podcast creates longer conversations. Showmatches create special matchups. Signature Series introduces the competitors themselves. Together, those formats give WORTEX more ways to tell the story of an event than the bracket alone ever could.",
        links: [{ phrase: "Tournament broadcasts", href: asset("index.html") + "#vods" }],
      },
      { type: "quote", text: "Before the match begins, there is already a story." },
    ],

    "warcraft-starcraft-new-era": [
      // Images: Blizzard Entertainment.
      // Warcraft III: Reforged — Forsaken Kingdom key art / press screenshot via Blizzard news & warcraft.wiki.gg.
      // STARCRAFT still: official Blizzard announce cinematic (YouTube 9eQUtOQXYgQ / starcraft.com).
      {
        type: "p",
        text: "For fans of Blizzard's classic strategy games, BlizzCon 2026 delivered two announcements that would have sounded improbable only a few years ago. Warcraft III has a new campaign. And StarCraft has a new game. They are very different projects, but together they show Blizzard returning to two universes whose communities have continued playing long after their original eras.",
      },
      { type: "h2", lines: ["Warcraft III", "Forsaken Kingdom"] },
      {
        type: "p",
        text: "For the first time in more than two decades, Warcraft III has received a new story campaign. Warcraft III: Reforged — Forsaken Kingdom returns to Lordaeron and explores the period surrounding its fall and transformation into the Undercity. The campaign follows the rise of the Forsaken, including Sylvanas Windrunner, and fills part of the story between Warcraft III and the beginning of World of Warcraft.",
      },
      {
        type: "p",
        text: "But Forsaken Kingdom is not simply another traditional Warcraft III campaign. Blizzard has described the main campaign as having a soft open-world RPG structure inspired by the Rexxar campaign. Players move through familiar locations including Stratholme and the Undercity while using expanded RPG systems such as:",
      },
      {
        type: "list",
        items: ["equipment", "gear slots", "hero kits", "items", "talent systems"],
      },
      {
        type: "p",
        text: "The release also includes the Last Days of Lordaeron prologue, offering a more traditional linear Warcraft III campaign experience before the broader Forsaken Kingdom structure opens up.",
      },
      {
        type: "figure",
        layout: "wide",
        file: "assets/articles/warcraft-forsaken-gameplay.png",
        cgi: "assets/cgi/prism.svg",
        label: "Warcraft III: Reforged — Forsaken Kingdom gameplay",
        caption: "Warcraft III: Reforged — Forsaken Kingdom. Image: Blizzard Entertainment.",
      },
      {
        type: "p",
        text: "That makes the project particularly unusual. Warcraft III has always existed somewhere between RTS and RPG design. Heroes, leveling, items and campaign progression were part of its identity from the beginning, and Forsaken Kingdom appears to push further into that side of the game rather than simply reproducing the structure of the original campaigns.",
      },
      {
        type: "p",
        text: "For longtime players, its significance is difficult to ignore. Warcraft III survived for years through competitive play, custom maps, modding and a community that continued building around the game. Now the game has official new story content again.",
      },
      { type: "h2", lines: ["A New Era", "Of StarCraft"] },
      {
        type: "figure",
        layout: "wide",
        file: "assets/articles/starcraft-new-game.jpg",
        cgi: "assets/cgi/core.svg",
        label: "STARCRAFT announcement imagery from Blizzard Entertainment",
        caption: "STARCRAFT announcement imagery. Image: Blizzard Entertainment.",
      },
      {
        type: "p",
        text: "StarCraft's announcement is even more unexpected. Blizzard revealed STARCRAFT, an original open-world shooter set in the Koprulu Sector, currently planned for Spring 2030. For a franchise whose identity has been defined by real-time strategy since 1998, that represents a dramatic shift.",
      },
      {
        type: "p",
        text: "This is not StarCraft III. It is not being presented as a replacement for Brood War or StarCraft II. Instead, Blizzard is taking the universe into another genre entirely. That raises a different kind of question for StarCraft fans: what does the Koprulu Sector look like when the player is no longer commanding an army from above?",
      },
      {
        type: "p",
        text: "StarCraft's universe has always contained the ingredients for a more direct action game: Terran marines, Ghosts, Zerg swarms, Protoss warriors, alien planets, military factions and large-scale conflicts. An open-world shooter changes the perspective while keeping that universe as its foundation.",
      },
      { type: "h2", lines: ["What It Means for", "Classic Communities"] },
      {
        type: "p",
        text: "For competitive players, neither announcement makes the classic games less relevant. Brood War remains Brood War. StarCraft II remains StarCraft II. Warcraft III remains one of the most distinctive competitive RTS games ever made. Competitive communities do not disappear simply because a franchise explores another genre. If anything, major new releases can bring attention back toward the games that created those universes in the first place.",
      },
      {
        type: "p",
        text: "That matters for WORTEX. StarCraft II is the flagship WORTEX title and the game where the tournament series began. StarCraft: Remastered joined the WORTEX offline stage in 2026. And Warcraft is one of the communities WORTEX would like to involve more deeply in future events if players show interest.",
        links: [
          { phrase: "StarCraft II", href: asset("tournaments/starcraft2.html") },
          { phrase: "StarCraft: Remastered", href: asset("tournaments/starcraft.html") },
          { phrase: "Warcraft", href: asset("tournaments/more.html") },
        ],
      },
      {
        type: "p",
        text: "The direction of Blizzard's new projects may therefore be very different from the tournaments currently played at WORTEX. But the renewed attention around these universes is difficult not to see as an opportunity. One franchise is returning to an old game with a completely new campaign. The other is taking one of gaming's most famous strategy universes into unfamiliar territory.",
      },
      {
        type: "p",
        text: "Neither announcement follows the obvious path. That might be what makes them interesting. For communities that have spent decades keeping Warcraft and StarCraft alive, BlizzCon 2026 was a reminder that these universes are not finished evolving.",
      },
      {
        type: "quote",
        text: "The communities kept these games alive. Now their universes are moving again.",
      },
    ],
  };

  function bySlug(slug) {
    return ARTICLES.filter((item) => item.slug === slug)[0];
  }

  function metaLine(article) {
    return el("p", { class: "t-meta" }, [
      article.category + " · ",
      el("time", { datetime: article.date, text: article.date }),
    ]);
  }

  function readCta() {
    return el("span", { class: "t-cta" }, [
      t("articles.read", "Read article") + " ",
      el("span", { class: "arrow", "aria-hidden": "true", text: "→" }),
    ]);
  }

  function card(article) {
    article = localized(article);
    return el("a", { class: "article-card panel", href: hrefFor(article), "data-cursor": "READ" }, [
      el("div", { class: "article-media" }, [
        ph(article.imageLabel, article.cgi, article.image, { hideLabel: true }),
      ]),
      el("div", { class: "article-copy" }, [
        metaLine(article),
        el("h3", { text: article.title }),
        el("p", { class: "article-excerpt", text: article.excerpt }),
        readCta(),
      ]),
    ]);
  }

  function teaser(article) {
    article = localized(article);
    return el("a", { class: "article-teaser", href: hrefFor(article), "data-cursor": "READ" }, [
      ph(article.imageLabel, article.cgi, article.image, { hideLabel: true }),
      el("div", { class: "article-copy" }, [
        metaLine(article),
        el("h3", { text: article.title }),
        el("p", { class: "article-excerpt", text: article.excerpt }),
        readCta(),
      ]),
    ]);
  }

  function relatedCard(article) {
    article = localized(article);
    return el("a", { class: "article-card panel", href: hrefFor(article), "data-cursor": "READ" }, [
      el("div", { class: "article-media" }, [
        ph(article.imageLabel, article.cgi, article.image, { hideLabel: true }),
      ]),
      el("div", { class: "article-copy" }, [
        el("p", { class: "t-meta", text: article.category }),
        el("h3", { text: article.title }),
        readCta(),
      ]),
    ]);
  }

  function linkedParagraph(text, links) {
    const para = el("p");
    const value = String(text || "");
    const pool = (links || []).filter(function (link) {
      return link && link.phrase && link.href;
    });
    let cursor = 0;
    while (cursor < value.length) {
      let best = null;
      pool.forEach(function (link) {
        const at = value.indexOf(link.phrase, cursor);
        if (at === -1) return;
        if (!best || at < best.at) best = { at: at, link: link };
      });
      if (!best) {
        para.append(value.slice(cursor));
        break;
      }
      if (best.at > cursor) para.append(value.slice(cursor, best.at));
      para.append(el("a", { href: best.link.href, "data-cursor": "VIEW", text: best.link.phrase }));
      cursor = best.at + best.link.phrase.length;
      const used = pool.indexOf(best.link);
      if (used !== -1) pool.splice(used, 1);
    }
    return para;
  }

  function renderBlock(block) {
    if (block.type === "p") {
      const para = block.links ? linkedParagraph(block.text, block.links) : el("p", { text: block.text });
      if (String(block.text).indexOf("\n") !== -1) para.style.whiteSpace = "pre-line";
      return para;
    }
    if (block.type === "h2") {
      if (block.lines && block.lines.length) {
        return el(
          "h2",
          {},
          block.lines.map((line, i) =>
            el("span", {
              class: i === 0 ? "article-h2-kicker" : "article-h2-sub",
              text: line,
            })
          )
        );
      }
      return el("h2", { text: block.text });
    }
    if (block.type === "list") {
      return el(
        "ul",
        { class: "article-list" },
        (block.items || []).map((item) => el("li", { text: item }))
      );
    }
    if (block.type === "staccato") {
      return el(
        "div",
        { class: "article-staccato" },
        (block.items || []).map((item) => el("p", { text: item }))
      );
    }
    if (block.type === "quote") {
      return el("blockquote", { class: "article-quote" }, [el("p", { text: block.text })]);
    }
    if (block.type === "figure") {
      const layout = block.layout ? " is-" + block.layout : "";
      return captionedFigure(
        "article-figure" + layout,
        ph(block.label, block.cgi, block.file, { hideLabel: true }),
        block.caption
      );
    }
    if (block.type === "split") {
      const fig = block.figure || {};
      return el("div", { class: "article-split" + (block.side === "right" ? " is-right" : "") }, [
        captionedFigure(
          "article-figure is-portrait",
          ph(fig.label, fig.cgi, fig.file, { hideLabel: true }),
          fig.caption
        ),
        el("div", { class: "article-split-copy" }, (block.blocks || []).map(renderBlock)),
      ]);
    }
    if (block.type === "youtube") {
      const frame = el("iframe", {
        src: "https://www.youtube-nocookie.com/embed/" + block.id,
        title: block.title || "WORTEX video",
        allow: "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        allowfullscreen: true,
        loading: "lazy",
        referrerpolicy: "strict-origin-when-cross-origin",
      });
      return captionedFigure(
        "article-figure article-figure--embed",
        el("div", { class: "article-embed" }, [frame]),
        block.caption
      );
    }
    return null;
  }

  function exploring() {
    const prefix = document.body.dataset.article ? "../index.html" : "index.html";
    const articlesHref = document.body.dataset.article ? "../articles.html" : "articles.html";
    return el("div", { class: "article-cta" }, [
      el("p", { class: "eyebrow", text: t("articles.keep", "Keep exploring WORTEX") }),
      el("nav", { class: "article-cta-links", "aria-label": t("articles.keep", "Keep exploring WORTEX") }, [
        el("a", { href: prefix + "#tournaments", "data-cursor": "VIEW", text: t("nav.tournaments", "Tournaments") }),
        el("a", { href: prefix + "#vods", "data-cursor": "PLAY", text: t("nav.vods", "VODs") }),
        el("a", { href: articlesHref, "data-cursor": "READ", text: t("nav.articles", "Articles") }),
        el("a", {
          href: "https://wortexgg.hu/discord",
          target: "_blank",
          rel: "noopener noreferrer",
          "data-cursor": "OPEN",
          text: t("articles.discord", "Join Discord"),
        }),
      ]),
    ]);
  }

  function renderHome() {
    const root = document.getElementById("articles-home");
    if (!root) return;
    root.replaceChildren();
    ARTICLES.slice(0, 3).forEach((article) => {
      root.append(el("li", {}, [card(article)]));
    });
  }

  function renderIndex() {
    const root = document.getElementById("articles-archive");
    if (!root) return;
    root.replaceChildren();
    ARTICLES.forEach((article) => {
      root.append(el("li", {}, [teaser(article)]));
    });
  }

  function renderArticle() {
    const slug = document.body.dataset.article;
    const root = document.getElementById("article-root");
    if (!slug || !root) return;
    const article = localized(bySlug(slug));
    if (!article) {
      root.append(el("p", { class: "articles-intro", text: t("articles.missing", "Article not found.") }));
      return;
    }

    const related = (article.related || []).map(bySlug).filter(Boolean);
    const blocks = localizedBlocks(slug);
    const showHero = article.hero !== false;
    const kids = [
      el("div", { class: "article-kicker" }, [
        el("p", { class: "eyebrow", text: article.category }),
        el("p", { class: "eyebrow" }, [
          document.createTextNode(t("articles.published", "Published") + " "),
          el("time", { datetime: article.date, text: article.date }),
        ]),
      ]),
      el("h1", { class: "article-title", id: "article-title", text: article.title }),
      el("p", { class: "article-deck", text: article.deck }),
    ];

    if (showHero) {
      kids.push(
        captionedFigure(
          "article-hero-media",
          ph(article.imageLabel, article.cgi, article.image, { hideLabel: true, eager: true }),
          article.heroCaption
        )
      );
    }

    kids.push(el("div", { class: "article-body" }, blocks.map(renderBlock)));

    if (related.length) {
      kids.push(
        el("section", { class: "article-related", "aria-labelledby": "related-title" }, [
          el("header", { class: "section-head" }, [
            el("p", { class: "eyebrow", text: t("articles.relatedEyebrow", "More") }),
            el("h2", { class: "display", id: "related-title" }, [
              el("span", { class: "display-line", text: t("articles.related", "RELATED") }),
              el("span", { class: "display-line display-line--muted", text: t("articles.relatedMuted", "ARTICLES") }),
            ]),
          ]),
          el(
            "ul",
            { class: "related-grid" },
            related.map((item) => el("li", {}, [relatedCard(item)]))
          ),
        ])
      );
    }

    kids.push(exploring());
    root.replaceChildren(el("article", { class: "article-page", "aria-labelledby": "article-title" }, kids));

    const crumbNow = document.querySelector("nav.sr-only ol li:last-child span");
    if (crumbNow) crumbNow.textContent = article.title;
    const crumbArticles = document.querySelector('[data-i18n="articles.crumb"]');
    if (crumbArticles) crumbArticles.textContent = t("articles.crumb", "Articles");
    document.querySelectorAll(".nav-back").forEach(function (node) {
      node.textContent = t("articles.back", "← Back to Articles");
    });
  }

  renderHome();
  renderIndex();
  renderArticle();

  if (window.WORTEX && WORTEX.i18n && typeof WORTEX.i18n.onChange === "function") {
    WORTEX.i18n.onChange(function () {
      renderHome();
      renderIndex();
      renderArticle();
    });
  }

  if (typeof gsap === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof gsap.registerPlugin === "function" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const homeCards = document.querySelectorAll("#articles-home .article-card");
  if (homeCards.length) {
    gsap.from(homeCards, {
      y: 24,
      duration: 1.05,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: "#articles-home", start: "top 86%", once: true },
    });
  }

  const pageHero = document.querySelector(".article-title, .articles-index .display");
  if (pageHero) {
    gsap.from(pageHero, { y: 28, duration: 1.1, ease: "power3.out" });
  }
})();
