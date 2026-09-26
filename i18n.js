/* ============================================================
   WORTEX bilingual engine — English default, Hungarian optional
   ============================================================ */
(function (global) {
  const STORAGE_KEY = "wortex-language";
  const FLAG_GB =
    '<svg viewBox="0 0 60 30" aria-hidden="true" focusable="false"><rect width="60" height="30" fill="#012169"/><path d="M0,0 60,30 M60,0 0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></svg>';
  const FLAG_HU =
    '<svg viewBox="0 0 60 30" aria-hidden="true" focusable="false"><rect width="60" height="10" fill="#CE2939"/><rect y="10" width="60" height="10" fill="#fff"/><rect y="20" width="60" height="10" fill="#477050"/></svg>';

  function readStored() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "hu" ? "hu" : "en";
    } catch (error) {
      return "en";
    }
  }

  function lookup(dict, path) {
    if (!dict || !path) return undefined;
    return String(path)
      .split(".")
      .reduce(function (node, key) {
        return node && node[key] != null ? node[key] : undefined;
      }, dict);
  }

  const translations = {
    en: {
      lang: {
        label: "Language",
        english: "English",
        hungarian: "Magyar",
        open: "Choose language",
        toEn: "Switch language to English",
        toHu: "Váltás magyar nyelvre",
      },
      skip: "Skip to content",
      nav: {
        primary: "Primary",
        tournament: "Tournament",
        about: "About",
        tournaments: "Tournaments",
        hall: "Hall of Fame",
        vods: "VODs",
        articles: "Articles",
        merch: "Merch",
        partners: "Partners",
        contact: "Contact",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        backWortex: "← Back to WORTEX",
        backArticles: "← Back to Articles",
        backEnd: "Back to WORTEX",
        more: "More",
      },
      hero: {
        origin: "01 — ORIGIN",
        scroll: "SCROLL",
        hungary: "HUNGARY",
        est: "EST. 2025",
      },
      about: {
        kicker: "02 — IDENTITY",
        heading1: "ABOUT",
        heading2: "WORTEX",
        lead: "WORTEX is built around competition, but powered by community.",
        body1:
          'WORTEX is a community-driven esports platform created to bring players, fans and stories together through <a href="#tournaments">tournaments</a>, broadcasts, content and offline events.',
        body2:
          "It started with a simple idea: create an event worth remembering, which is more than just matches.",
        body3:
          "At its core, WORTEX is made by the community, for the community. The games and results matter, but so do the people, personalities, rivalries and friendships that keep competitive scenes alive.",
        body4:
          "With roots in StarCraft and Blizzard gaming communities, WORTEX aims to create a home for players and fans who still care deeply about their games.",
        body5: "The competition brings us together. The community is what makes WORTEX.",
        body6: "Made by the community. For the community.",
        metaCommunity: "Community-driven",
        metaCommunityValue: "Built by players and fans",
        metaFounded: "Founded",
        metaFocus: "Focus",
        metaFocusValue: "Tournaments / Content / Events",
        metaMission: "Mission",
        metaMissionValue: "For the community",
        loading: "Loading object",
        model: "Interactive 3D WORTEX logo",
      },
      tournaments: {
        kicker: "03 — CIRCUIT",
        title: "TOURNAMENTS",
        view: "View",
        premier: "01 · RTS · PREMIER",
        moreMeta: "04 · MORE",
        more: "MORE",
        classic: "02 · RTS · CLASSIC",
        cards: "03 · CARDS · DIGITAL",
        sc2Alt: "StarCraft II, the flagship WORTEX esports tournament title",
        moreAlt: "Community gaming titles WORTEX is open to featuring beyond its core tournaments",
        scAlt: "StarCraft: Brood War / Remastered tournament at WORTEX",
        hsAlt: "Hearthstone tournament competition at WORTEX",
      },
      hof: {
        kicker: "04 — LEGENDS",
        line1: "HALL",
        line2: "OF FAME",
        archive: "ARCHIVE",
        aria: "{player} was the WORTEX {year} {game} champion.",
      },
      vods: {
        kicker: "05 — ARCHIVE FILM",
        line1: "WATCH",
        line2: "AGAIN",
        prev: "Prev",
        next: "Next",
        prevAria: "Previous videos",
        nextAria: "Next videos",
        carousel: "Video carousel",
        play: "Play",
        eventFilm: "Event Film",
        documentary: "Documentary",
        interview: "Interview",
        groupA: "StarCraft II Group A",
        groupB: "StarCraft II Group B",
        remasteredSemis: "StarCraft: Remastered Semi-Finals",
        grandFinal: "StarCraft II Grand Final 2026",
        watchSeries: "Watch the series",
        watch: "Watch",
        film: "FILM",
        titleLine1: "WATCH",
        titleLine2: "THE SERIES",
        semiFinals: "SEMI-FINALS",
        top8a: "TOP 8 — GROUP A",
        top8b: "TOP 8 — GROUP B",
        playIn1: "PLAY-INS — PART 1",
        playIn2: "PLAY-INS — PART 2",
        week2: "WEEK 2",
        week3: "WEEK 3",
        groupStage: "Group Stage",
        qualifier: "Qualifier",
        showmatch: "Showmatch",
        grandFinalType: "Grand Final",
      },
      articles: {
        kicker: "06 — LATEST / STORIES",
        title: "ARTICLES",
        all: "View all articles",
        read: "Read article",
        stories: "Stories",
        intro: "Stories from WORTEX, our players, our events, and the games that bring our community together.",
        related: "RELATED",
        relatedMuted: "ARTICLES",
        relatedEyebrow: "More",
        keep: "Keep exploring WORTEX",
        discord: "Join Discord",
        missing: "Article not found.",
        crumb: "Articles",
        crumbLabel: "Breadcrumb",
        published: "Published",
        updated: "Updated",
        back: "← Back to Articles",
      },
      merch: {
        kicker: "07 — GEAR",
        title: "MERCHANDISE",
        buy: "Buy",
        viewItem: "View item",
      },
      partners: {
        kicker: "08 — ALLIANCE",
        title: "PARTNERS",
        cta: "Become a partner",
        copy: "Interested in working with WORTEX?",
      },
      contact: {
        kicker: "09 — SIGNAL",
        line1: "GET IN CONTACT",
        line2: "WITH WORTEX",
        general: "General inquiries",
        generalCopy:
          "For general questions, tournament information, community topics and other enquiries.",
        podcast: "Podcast",
        podcastCopy: "For WRTX Podcast guests, topics, collaborations and podcast-related enquiries.",
        partnerships: "Partnerships",
        partnershipsCopy:
          "For sponsorships, brand partnerships, collaborations and working together with WORTEX.",
        follow: "Follow WORTEX",
        socials: "WORTEX social profiles",
        discord: "Join the WORTEX Discord",
      },
      footer: {
        social: "Social",
        tournaments: "Tournaments",
        built: "Built for the community.",
        designed: "Designed by",
        more: "MORE",
        backSite: "Back to main site",
        hungary: "Hungary",
        est: "Est. 2025",
      },
      result: {
        champion: "Champion",
        runnerUp: "Runner-up",
        top4: "Top 4",
        third: "3rd Place",
        fourth: "4th Place",
      },
      tourney: {
        series: "WORTEX TOURNAMENT SERIES",
        openCall: "OPEN CALL",
        archive: "EVENT HISTORY",
        field: "FIELD",
        awarded: "AWARDED",
        category: "CATEGORY",
        since: "WORTEX SINCE",
        events: "EVENTS",
        status: "STATUS",
        upcoming: "UPCOMING",
        tba: "TBA",
        past: "PAST EVENT",
        ongoing: "ONGOING SERIES",
        established: "SERIES ESTABLISHED",
        cardGame: "CARD GAME",
        rts: "RTS",
        top1: "TOP",
        top2: "PARTICIPANTS",
        prize1: "PRIZE MONEY",
        prize2: "AWARDED",
        total: "TOTAL AWARDED",
        eventsLine2: "EVENTS",
        unknown: "Unknown tournament.",
        sc2About: "ABOUT STARCRAFT II",
        scAbout: "ABOUT STARCRAFT",
        hsAbout: "ABOUT HEARTHSTONE",
        moreAbout: "ABOUT MORE GAMES",
        sc2Intro:
          "StarCraft II is WORTEX's flagship game — the title where everything started. It has been at the heart of WORTEX since the first tournament in 2025 and remains the main competitive stage of the series, bringing together some of the strongest and most recognizable players from the Hungarian StarCraft community.",
        scIntro:
          "Classic StarCraft returned to the stage at WORTEX in 2026. The first WORTEX StarCraft: Remastered tournament showed that there is still real interest in competitive Brood War, bringing the legendary RTS back into an offline WORTEX environment.",
        hsIntro:
          "Hearthstone joined WORTEX in 2026 with its first dedicated tournament series. The game brought a different competitive format to WORTEX while expanding the event beyond traditional RTS titles.",
        moreIntro: "WORTEX welcomes any game that shows genuine interest from its community.",
        moreExtra:
          "We want WORTEX to grow together with the players. While StarCraft II, StarCraft and Hearthstone currently form the core of our tournament lineup, we are open to expanding into other games where an active community wants to compete, participate and build something together.",
        sc2PrizeNote: "Prize money awarded across WORTEX StarCraft II tournaments so far.",
        scPrizeNote: "Prize money awarded in the first WORTEX StarCraft tournament.",
        hsPrizeNote: "Prize money awarded in the first WORTEX Hearthstone tournament.",
        scFirstNote: "First WORTEX StarCraft event",
        hsFirstNote: "First WORTEX Hearthstone tournament",
        broodKicker: "BROOD WAR / REMASTERED",
        moreLine1: "MORE",
        moreLine2: "GAMES",
        interest1: "GAMES WE ARE",
        interest2: "INTERESTED IN",
        noGame: "Don't see your game?",
        noGameCopy: "If your community wants to see a game represented at WORTEX, ",
        getInContact: "get in contact",
        bring: "Bring your game to WORTEX",
        mailSubject: "Bring a game to WORTEX",
        hubyKicker: "ON-SITE BO1 WINNER",
        hubyNote:
          "Winner of the separate on-site BO1 activity — not the main Hearthstone championship.",
        crumbTournaments: "Tournaments",
        crumbMore: "More Games",
        owAlt: "Overwatch, a community title WORTEX is open to featuring",
        hotsAlt: "Heroes of the Storm, a community title WORTEX is open to featuring",
        wowAlt: "World of Warcraft, a community title WORTEX is open to featuring",
        wcAlt: "Warcraft RTS, a community title WORTEX is open to featuring",
        videos: "videos",
      },
      cursor: {
        VIEW: "VIEW",
        READ: "READ",
        BUY: "BUY",
        PLAY: "PLAY",
        DRAG: "DRAG",
        BACK: "BACK",
        MAIL: "MAIL",
        OPEN: "OPEN",
      },
      meta: {
        homeTitle: "WORTEX | Home of Community Esports",
        homeDesc:
          "WORTEX is a community-driven esports platform bringing together tournaments, offline events, broadcasts, player stories and competitive gaming communities.",
        sc2Title: "StarCraft II | WORTEX Tournaments",
        sc2Desc:
          "Explore WORTEX StarCraft II tournaments, players, champions, event history, prize money and tournament VODs.",
        scTitle: "StarCraft: Brood War | WORTEX Tournaments",
        scDesc:
          "Explore WORTEX StarCraft: Brood War and StarCraft: Remastered tournaments, players, results, prize money and VODs.",
        hsTitle: "Hearthstone | WORTEX Tournaments",
        hsDesc:
          "Explore WORTEX Hearthstone tournaments, champions, players, prize money and match VODs.",
        moreTitle: "More Games | WORTEX",
        moreDesc:
          "Discover games and communities that could become part of future WORTEX tournaments and events.",
        articlesTitle: "Articles | WORTEX",
        articlesDesc:
          "Read WORTEX esports stories, tournament news, player features, Signature Series content and articles about StarCraft, Warcraft and gaming communities.",
      },
    },
    hu: {
      lang: {
        label: "Nyelv",
        english: "English",
        hungarian: "Magyar",
        open: "Nyelv választása",
        toEn: "Switch language to English",
        toHu: "Váltás magyar nyelvre",
      },
      skip: "Ugrás a tartalomhoz",
      nav: {
        primary: "Fő navigáció",
        tournament: "Verseny",
        about: "Rólunk",
        tournaments: "Versenyek",
        hall: "Hírességek csarnoka",
        vods: "VODok",
        articles: "Cikkek",
        merch: "Merch",
        partners: "Partnerek",
        contact: "Kapcsolat",
        openMenu: "Menü megnyitása",
        closeMenu: "Menü bezárása",
        backWortex: "← Vissza a WORTEX-re",
        backArticles: "← Vissza a cikkekhez",
        backEnd: "Vissza a WORTEX-re",
        more: "További",
      },
      hero: {
        origin: "01 — EREDET",
        scroll: "GÖRGETÉS",
        hungary: "MAGYARORSZÁG",
        est: "ALAPÍTVA 2025",
      },
      about: {
        kicker: "02 — IDENTITÁS",
        heading1: "RÓLUNK",
        heading2: "WORTEX",
        lead: "A WORTEX alapja a verseny, de a közösség ad neki erőt.",
        body1:
          'A WORTEX egy közösségközpontú esportplatform, amely <a href="#tournaments">versenyeken</a>, közvetítéseken, tartalmakon és offline eseményeken keresztül hozza össze a játékosokat, a nézőket és a történeteiket.',
        body2:
          "Egy egyszerű ötletből indult: olyan eseményt létrehozni, amelyre érdemes emlékezni, és amely több, mint pusztán mérkőzések.",
        body3:
          "A WORTEX szívében mindig a közösség áll. A játék és az eredmények fontosak, de ugyanilyen fontosak azok az emberek, személyiségek, rivalizálások és barátságok, amelyek életben tartják a kompetitív közösségeket.",
        body4:
          "A gyökereink a StarCraft és a Blizzard játékainak közösségéhez vezetnek, de a cél ennél nagyobb: egy olyan helyet szeretnénk építeni a játékosoknak és a rajongóknak, akiknek ezek a játékok még mindig valóban jelentenek valamit.",
        body5: "A verseny összehoz minket. A közösség teszi WORTEX-szé.",
        body6: "A közösségből. A közösségért.",
        metaCommunity: "Közösségi alapú",
        metaCommunityValue: "Játékosok és rajongók építik",
        metaFounded: "Alapítva",
        metaFocus: "Fókusz",
        metaFocusValue: "Versenyek / Tartalom / Események",
        metaMission: "Küldetés",
        metaMissionValue: "A közösségért",
        loading: "Objektum betöltése",
        model: "Interaktív 3D WORTEX-logó",
      },
      tournaments: {
        kicker: "03 — VERSENYEK",
        title: "VERSENYEK",
        view: "Megnyitás",
        premier: "01 · RTS · KIEMELT",
        moreMeta: "04 · TOVÁBBI",
        more: "TOVÁBBI",
        classic: "02 · RTS · KLASSZIKUS",
        cards: "03 · KÁRTYA · DIGITÁLIS",
        sc2Alt: "StarCraft II, a WORTEX kiemelt esportjátéka",
        moreAlt: "Közösségi játékok, amelyek a WORTEX versenyein is helyet kaphatnak",
        scAlt: "StarCraft: Brood War / Remastered verseny a WORTEX-en",
        hsAlt: "Hearthstone verseny a WORTEX-en",
      },
      hof: {
        kicker: "04 — LEGENDÁK",
        line1: "HÍRESSÉGEK",
        line2: "CSARNOKA",
        archive: "ARCHÍVUM",
        aria: "{player} a WORTEX {year} {game} bajnoka volt.",
      },
      vods: {
        kicker: "05 — ARCHÍV FILM",
        line1: "NÉZD",
        line2: "ÚJRA",
        prev: "Előző",
        next: "Következő",
        prevAria: "Előző videók",
        nextAria: "Következő videók",
        carousel: "Videókarusszel",
        play: "Lejátszás",
        eventFilm: "Eseményfilm",
        documentary: "Dokumentumfilm",
        interview: "Interjú",
        groupA: "StarCraft II A csoport",
        groupB: "StarCraft II B csoport",
        remasteredSemis: "StarCraft: Remastered elődöntők",
        grandFinal: "StarCraft II döntő 2026",
        watchSeries: "Nézd vissza a mérkőzéseket",
        watch: "Megnézés",
        film: "FILM",
        titleLine1: "NÉZD",
        titleLine2: "VISSZA",
        semiFinals: "ELŐDÖNTŐK",
        top8a: "TOP 8 — A CSOPORT",
        top8b: "TOP 8 — B CSOPORT",
        playIn1: "PLAY-IN — 1. RÉSZ",
        playIn2: "PLAY-IN — 2. RÉSZ",
        week2: "2. HÉT",
        week3: "3. HÉT",
        groupStage: "Csoportkör",
        qualifier: "Selejtező",
        showmatch: "Showmatch",
        grandFinalType: "Döntő",
      },
      articles: {
        kicker: "06 — LEGFRISSEBB / TÖRTÉNETEK",
        title: "CIKKEK",
        all: "Összes cikk",
        read: "Cikk olvasása",
        stories: "Történetek",
        intro: "Történetek a WORTEX-ről, a játékosainkról, az eseményeinkről és a játékokról, amelyek összehozzák a közösséget.",
        related: "KAPCSOLÓDÓ",
        relatedMuted: "CIKKEK",
        relatedEyebrow: "Még több",
        keep: "Fedezd fel tovább a WORTEX-et",
        discord: "Csatlakozz a Discordhoz",
        missing: "A cikk nem található.",
        crumb: "Cikkek",
        crumbLabel: "Morzsamenü",
        published: "Közzétéve",
        updated: "Frissítve",
        back: "← Vissza a cikkekhez",
      },
      merch: {
        kicker: "07 — FELSZERELÉS",
        title: "MERCH",
        buy: "Vásárlás",
        viewItem: "Termék megtekintése",
      },
      partners: {
        kicker: "08 — SZÖVETSÉG",
        title: "PARTNEREK",
        cta: "Legyél partnerünk",
        copy: "Szeretnél a WORTEX-szel dolgozni?",
      },
      contact: {
        kicker: "09 — JEL",
        line1: "LÉPJ KAPCSOLATBA",
        line2: "A WORTEX-SZEL",
        general: "Általános kapcsolat",
        generalCopy:
          "Általános kérdésekhez, versenyinfókhoz, közösségi témákhoz és egyéb megkeresésekhez.",
        podcast: "Podcast",
        podcastCopy: "WRTX Podcast-vendégekhez, témákhoz, együttműködésekhez és podcasttal kapcsolatos megkeresésekhez.",
        partnerships: "Partnerkapcsolatok",
        partnershipsCopy:
          "Szponzorációhoz, márkaegyüttműködésekhez és a WORTEX-szel való közös munkához.",
        follow: "Kövesd a WORTEX-et",
        socials: "A WORTEX közösségi profiljai",
        discord: "Csatlakozz a WORTEX Discordjához",
      },
      footer: {
        social: "Közösségi média",
        tournaments: "Versenyek",
        built: "A közösségért építve.",
        designed: "Tervezte",
        more: "TOVÁBBI",
        backSite: "Vissza a főoldalra",
        hungary: "Magyarország",
        est: "Alapítva 2025",
      },
      result: {
        champion: "Bajnok",
        runnerUp: "Második helyezett",
        top4: "Top 4",
        third: "3. hely",
        fourth: "4. hely",
      },
      tourney: {
        series: "WORTEX VERSENYSOROZAT",
        openCall: "NYÍLT FELHÍVÁS",
        archive: "KORÁBBI ESEMÉNYEK",
        field: "MEZŐNY",
        awarded: "KIOSZTVA",
        category: "KATEGÓRIA",
        since: "WORTEX-BEN",
        events: "ESEMÉNYEK",
        status: "STÁTUSZ",
        upcoming: "KÖVETKEZŐ",
        tba: "HAMAROSAN",
        past: "LEZAJLOTT ESEMÉNY",
        ongoing: "FOLYAMATOS SOROZAT",
        established: "ELINDULT SOROZAT",
        cardGame: "KÁRTYAJÁTÉK",
        rts: "RTS",
        top1: "KIEMELT",
        top2: "JÁTÉKOSOK",
        prize1: "KIOSZTOTT",
        prize2: "PÉNZDÍJ",
        total: "ÖSSZESEN KIOSZTVA",
        eventsLine2: "ESEMÉNYEK",
        unknown: "Ismeretlen verseny.",
        sc2About: "A STARCRAFT II-RŐL",
        scAbout: "A STARCRAFT-RÓL",
        hsAbout: "A HEARTHSTONE-RÓL",
        moreAbout: "TOVÁBBI JÁTÉKOK",
        sc2Intro:
          "A StarCraft II a WORTEX kiemelt játéka — az a cím, amellyel minden elkezdődött. A 2025-ös első verseny óta a WORTEX középpontjában áll, és továbbra is a sorozat legfontosabb kompetitív játéka, ahol a magyar StarCraft-közösség legerősebb és legismertebb játékosai közül többen is összecsapnak.",
        scIntro:
          "A klasszikus StarCraft 2026-ban tért vissza a WORTEX színpadára. Az első WORTEX StarCraft: Remastered verseny megmutatta, hogy továbbra is komoly érdeklődés övezi a kompetitív Brood Wart, és a legendás RTS ismét offline környezetben kapott helyet a WORTEX-en.",
        hsIntro:
          "A Hearthstone 2026-ban csatlakozott a WORTEX-hez az első saját versenysorozatával. A játék új kompetitív formátumot hozott az eseménybe, és tovább bővítette a WORTEX-et a hagyományos RTS-játékokon túl.",
        moreIntro: "A WORTEX nyitott minden olyan játék felé, amely mögött valódi közösségi érdeklődés áll.",
        moreExtra:
          "Azt szeretnénk, hogy a WORTEX a játékosokkal együtt fejlődjön. Jelenleg a StarCraft II, a StarCraft és a Hearthstone alkotja versenyeink magját, de nyitottak vagyunk új játékokra is, ahol egy aktív közösség szeretne versenyezni, részt venni és közösen építeni valamit.",
        sc2PrizeNote: "A WORTEX StarCraft II versenyein eddig kiosztott pénzdíj.",
        scPrizeNote: "Az első WORTEX StarCraft versenyen kiosztott pénzdíj.",
        hsPrizeNote: "Az első WORTEX Hearthstone versenyen kiosztott pénzdíj.",
        scFirstNote: "Az első WORTEX StarCraft-esemény",
        hsFirstNote: "Az első WORTEX Hearthstone-verseny",
        broodKicker: "BROOD WAR / REMASTERED",
        moreLine1: "TOVÁBBI",
        moreLine2: "JÁTÉKOK",
        interest1: "AMIK ÉRDEKELNEK",
        interest2: "MINKET",
        noGame: "Nem találod a játékodat?",
        noGameCopy: "Ha a közösséged szeretné viszontlátni a játékát a WORTEX-en, ",
        getInContact: "írj nekünk",
        bring: "Hozd el a játékod a WORTEX-re",
        mailSubject: "Játék a WORTEX-re",
        hubyKicker: "HELYSZÍNI BO1 GYŐZTES",
        hubyNote:
          "A külön helyszíni BO1 játék győztese — nem a fő Hearthstone-bajnokság címe.",
        crumbTournaments: "Versenyek",
        crumbMore: "További játékok",
        owAlt: "Overwatch, egy közösségi cím, amelyet a WORTEX szívesen fogadna",
        hotsAlt: "Heroes of the Storm, egy közösségi cím, amelyet a WORTEX szívesen fogadna",
        wowAlt: "World of Warcraft, egy közösségi cím, amelyet a WORTEX szívesen fogadna",
        wcAlt: "Warcraft RTS, egy közösségi cím, amelyet a WORTEX szívesen fogadna",
        videos: "videók",
      },
      cursor: {
        VIEW: "NÉZET",
        READ: "OLVASÁS",
        BUY: "VÁSÁRLÁS",
        PLAY: "LEJÁTSZÁS",
        DRAG: "HÚZÁS",
        BACK: "VISSZA",
        MAIL: "LEVÉL",
        OPEN: "NYITÁS",
      },
      meta: {
        homeTitle: "WORTEX | A közösségi esport otthona",
        homeDesc:
          "A WORTEX egy közösségközpontú esportplatform, amely versenyeken, offline eseményeken, közvetítéseken és játékosközpontú tartalmakon keresztül hozza össze a kompetitív gaming közösségeket.",
        sc2Title: "StarCraft II | WORTEX versenyek",
        sc2Desc:
          "Ismerd meg a WORTEX StarCraft II versenyeit, játékosait, bajnokait, korábbi eseményeit, pénzdíjait és mérkőzés-VOD-jait.",
        scTitle: "StarCraft: Brood War | WORTEX versenyek",
        scDesc:
          "Ismerd meg a WORTEX StarCraft: Brood War és StarCraft: Remastered versenyeit, játékosait, eredményeit, pénzdíjait és mérkőzéseit.",
        hsTitle: "Hearthstone | WORTEX versenyek",
        hsDesc:
          "Ismerd meg a WORTEX Hearthstone versenyeit, bajnokait, játékosait, pénzdíjait és mérkőzés-VOD-jait.",
        moreTitle: "További játékok | WORTEX",
        moreDesc:
          "Fedezd fel, milyen további játékok és közösségek válhatnak a jövőben a WORTEX versenyeinek részévé.",
        articlesTitle: "Cikkek | WORTEX",
        articlesDesc:
          "WORTEX-esporttörténetek, versenyhírek, játékosportrék, Signature Series-tartalmak és cikkek a StarCraft, a Warcraft és a gaming közösségekről.",
      },
    },
  };

  let current = readStored();
  const listeners = [];
  let bound = false;

  function t(key, fallback) {
    const fromCurrent = lookup(translations[current], key);
    if (fromCurrent != null && fromCurrent !== "") return fromCurrent;
    const fromEn = lookup(translations.en, key);
    if (fromEn != null && fromEn !== "") return fromEn;
    if (fallback != null) return fallback;
    return "";
  }

  function placementLabel(value) {
    const raw = String(value || "");
    const key = raw.toLowerCase().replace(/[\s-]+/g, "");
    const map = {
      champion: "result.champion",
      runnerup: "result.runnerUp",
      top4: "result.top4",
      "3rdplace": "result.third",
      "4thplace": "result.fourth",
    };
    return t(map[key] || "", raw);
  }

  function pageMeta() {
    const body = document.body || {};
    const data = body.dataset || {};
    if (data.article) {
      const pack = articleMeta(data.article);
      const existingDesc = (document.querySelector('meta[name="description"]') || {}).content || "";
      const existingTitle = document.title || "";
      return {
        title: pack.title ? pack.title + " | WORTEX" : existingTitle,
        description: pack.og || pack.excerpt || existingDesc,
      };
    }
    if (data.articles) return { title: t("meta.articlesTitle"), description: t("meta.articlesDesc") };
    if (data.tournament === "starcraft2") return { title: t("meta.sc2Title"), description: t("meta.sc2Desc") };
    if (data.tournament === "starcraft") return { title: t("meta.scTitle"), description: t("meta.scDesc") };
    if (data.tournament === "hearthstone") return { title: t("meta.hsTitle"), description: t("meta.hsDesc") };
    if (data.tournament === "more") return { title: t("meta.moreTitle"), description: t("meta.moreDesc") };
    return { title: t("meta.homeTitle"), description: t("meta.homeDesc") };
  }

  function articleMeta(slug) {
    const lang = current;
    const pack = lookup(global.WORTEX && global.WORTEX.i18n && global.WORTEX.i18n._articles, lang + "." + slug) || {};
    return pack;
  }

  function setMetaTag(selector, attr, value) {
    const node = document.querySelector(selector);
    if (node && value) node.setAttribute(attr, value);
  }

  function updateMetadata() {
    const meta = pageMeta();
    if (meta.title) document.title = meta.title;
    setMetaTag('meta[name="description"]', "content", meta.description);
    setMetaTag('meta[property="og:title"]', "content", meta.title);
    setMetaTag('meta[property="og:description"]', "content", meta.description);
    setMetaTag('meta[name="twitter:title"]', "content", meta.title);
    setMetaTag('meta[name="twitter:description"]', "content", meta.description);
    setMetaTag('meta[property="og:locale"]', "content", current === "hu" ? "hu_HU" : "en_US");
  }

  function apply(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach(function (node) {
      const value = t(node.getAttribute("data-i18n"), node.textContent);
      if (value) node.textContent = value;
    });
    scope.querySelectorAll("[data-i18n-html]").forEach(function (node) {
      const value = t(node.getAttribute("data-i18n-html"));
      if (value) node.innerHTML = value;
    });
    scope.querySelectorAll("[data-i18n-attr]").forEach(function (node) {
      String(node.getAttribute("data-i18n-attr") || "")
        .split(";")
        .forEach(function (pair) {
          const parts = pair.split(":");
          const attr = (parts.shift() || "").trim();
          const key = parts.join(":").trim();
          if (!attr || !key) return;
          const value = t(key);
          if (value) node.setAttribute(attr, value);
        });
    });
    syncSwitcher();
    syncCompactNav();
  }

  function syncSwitcher() {
    document.querySelectorAll("[data-lang-code]").forEach(function (node) {
      node.textContent = current === "hu" ? "HU" : "EN";
    });
    document.querySelectorAll("[data-lang-flag]").forEach(function (node) {
      node.innerHTML = current === "hu" ? FLAG_HU : FLAG_GB;
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      const lang = btn.getAttribute("data-set-lang");
      const active = lang === current;
      btn.classList.toggle("is-active", active);
      if (active) btn.setAttribute("aria-current", "true");
      else btn.removeAttribute("aria-current");
      if (btn.getAttribute("role") === "option") {
        btn.setAttribute("aria-selected", active ? "true" : "false");
      }
    });
    document.documentElement.lang = current;
    document.documentElement.setAttribute("data-lang", current);
  }

  function closeMenus() {
    document.querySelectorAll(".lang-switch--bar").forEach(function (box) {
      const btn = box.querySelector(".lang-switch-btn");
      const menu = box.querySelector(".lang-menu");
      if (btn) btn.setAttribute("aria-expanded", "false");
      if (menu) menu.hidden = true;
    });
  }

  function syncCompactNav() {
    const compact =
      current === "hu" &&
      window.innerWidth <= 1440 &&
      document.body &&
      !document.body.classList.contains("is-tournament");
    document.documentElement.classList.toggle("is-hu-compact-nav", Boolean(compact));
  }

  function bind() {
    if (bound) return;
    bound = true;
    document.addEventListener("click", function (event) {
      const pick = event.target.closest("[data-set-lang]");
      if (pick) {
        event.preventDefault();
        setLanguage(pick.getAttribute("data-set-lang"));
        closeMenus();
        return;
      }
      const toggle = event.target.closest(".lang-switch-btn");
      if (toggle) {
        event.preventDefault();
        const box = toggle.closest(".lang-switch");
        const menu = box && box.querySelector(".lang-menu");
        const open = toggle.getAttribute("aria-expanded") === "true";
        closeMenus();
        if (menu && !open) {
          toggle.setAttribute("aria-expanded", "true");
          menu.hidden = false;
        }
        return;
      }
      if (!event.target.closest(".lang-switch")) closeMenus();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenus();
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      const box = event.target.closest(".lang-switch");
      const menu = box && box.querySelector(".lang-menu");
      if (!menu || menu.hidden) return;
      const options = Array.prototype.slice.call(menu.querySelectorAll("[data-set-lang]"));
      const index = options.indexOf(event.target.closest("[data-set-lang]"));
      if (!options.length) return;
      event.preventDefault();
      const next =
        event.key === "ArrowDown"
          ? options[(Math.max(index, 0) + 1) % options.length]
          : options[(index - 1 + options.length) % options.length];
      next.focus();
    });
    window.addEventListener("resize", syncCompactNav);
  }

  function setLanguage(lang) {
    const next = lang === "hu" ? "hu" : "en";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {}
    current = next;
    document.documentElement.classList.add("is-i18n-switching");
    apply();
    updateMetadata();
    listeners.forEach(function (fn) {
      try {
        fn(next);
      } catch (error) {}
    });
    document.dispatchEvent(new CustomEvent("wortex:languagechange", { detail: { lang: next } }));
    window.setTimeout(function () {
      document.documentElement.classList.remove("is-i18n-switching");
    }, 160);
  }

  function init() {
    bind();
    apply();
    updateMetadata();
    document.querySelectorAll(".lang-option-flag[data-flag]").forEach(function (node) {
      node.innerHTML = node.getAttribute("data-flag") === "hu" ? FLAG_HU : FLAG_GB;
    });
  }

  global.WORTEX = global.WORTEX || {};
  global.WORTEX.i18n = {
    t: t,
    placement: placementLabel,
    getLanguage: function () {
      return current;
    },
    setLanguage: setLanguage,
    apply: apply,
    init: init,
    onChange: function (fn) {
      if (typeof fn === "function") listeners.push(fn);
    },
    articleMeta: articleMeta,
    blocks: function (slug, fallback) {
      if (current !== "hu") return fallback;
      const hu = lookup(global.WORTEX.i18n._blocks, slug);
      return Array.isArray(hu) && hu.length ? hu : fallback;
    },
    localizeArticle: function (article) {
      if (!article) return article;
      if (current !== "hu") return article;
      const pack = articleMeta(article.slug);
      if (!pack || !pack.title) return article;
      return Object.assign({}, article, pack);
    },
    _articles: {},
    _blocks: {},
  };
})(window);
