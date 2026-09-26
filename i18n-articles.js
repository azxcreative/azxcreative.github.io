/* ============================================================
   WORTEX article copy — Hungarian overlays
   ============================================================ */
(function (global) {
  const W = (global.WORTEX = global.WORTEX || {});
  W.i18n = W.i18n || {};

  W.i18n._articles = {
    en: {
      "wortex-from-community-to-offline-stage": {
        title: "WORTEX — From Community to Offline Stage",
        excerpt: "WORTEX started with a simple idea: create tournaments people would actually want to remember.",
        og: "How WORTEX grew from a tournament idea into an offline esports experience built around competition, production and the people around the games.",
      },
      "signature-series-panda": {
        title: "Signature Series — The Players Behind WORTEX",
        excerpt: "Before the bracket tells you who won, Signature Series tells you who is playing.",
        og: "WORTEX Signature Series introduces the players behind the bracket, starting with Panda — the 2026 underdog.",
      },
      "warcraft-starcraft-new-era": {
        title: "Warcraft Returns, StarCraft Looks to a New Era",
        excerpt:
          "BlizzCon 2026 delivered major news for two of Blizzard's foundational universes: a new Warcraft III campaign and an entirely new direction for StarCraft.",
        og: "Warcraft III: Reforged receives Forsaken Kingdom, while Blizzard announces STARCRAFT, an original open-world shooter planned for Spring 2030.",
      },
    },
    hu: {
      "wortex-from-community-to-offline-stage": {
        title: "WORTEX — A közösségtől az offline színpadig",
        excerpt: "A WORTEX egy egyszerű ötlettel indult: olyan versenyeket létrehozni, amelyekre később is emlékezni akarnak az emberek.",
        deck: "A WORTEX egy egyszerű ötlettel indult: olyan versenyeket létrehozni, amelyekre később is emlékezni akarnak az emberek.",
        imageLabel: "A WORTEX csapata készülődik az offline esporteseményre",
        heroCaption: "Készülődés a WORTEX offline eseményére.",
        og: "Hogyan nőtt a WORTEX egy versenyötletből offline esportélménnyé, amely a versenyről, a produkcióról és a játékok körüli emberekről szól.",
      },
      "signature-series-panda": {
        title: "Signature Series — A játékosok a WORTEX mögött",
        excerpt: "Mielőtt a tablo megmondaná, ki nyert, a Signature Series megmutatja, ki lép pályára.",
        deck: "Mielőtt a tablo megmondaná, ki nyert, a Signature Series megmutatja, ki lép pályára.",
        imageLabel: "Panda, a WORTEX Signature Series StarCraft II-játékosa",
        og: "A WORTEX Signature Series a tablo mögötti játékosokat mutatja be — kezdve Pandával, a 2026-os sötét lóval.",
      },
      "warcraft-starcraft-new-era": {
        title: "A Warcraft visszatér, a StarCraft új korszakba lép",
        excerpt:
          "A BlizzCon 2026 két alapvető Blizzard-univerzumban hozott nagy bejelentést: új Warcraft III-kampányt és teljesen új irányt a StarCraftnak.",
        deck:
          "A BlizzCon 2026 két alapvető Blizzard-univerzumban hozott nagy bejelentést: új Warcraft III-kampányt és teljesen új irányt a StarCraftnak.",
        imageLabel: "Warcraft III: Reforged — Forsaken Kingdom kulcsművészet",
        heroCaption: "Warcraft III: Reforged — Forsaken Kingdom. Kép: Blizzard Entertainment.",
        og: "A Warcraft III: Reforged megkapja a Forsaken Kingdom kampányt, a Blizzard pedig bejelentette a STARCRAFT nyílt világú shootert, 2030 tavaszára.",
      },
    },
  };

  W.i18n._blocks = {
    "wortex-from-community-to-offline-stage": [
      { type: "h2", lines: ["Egy versenytől", "egy eseményig"] },
      {
        type: "p",
        text: "A verseny számít, de a WORTEX soha nem akart csupán egy tablo és egy streamlink lenni. A kezdetektől az volt a cél, hogy a kompetitív játék, a közvetítés, a vizuális identitás, a játékostörténetek és végül az offline közönség egy helyre kerüljön. Ennek az alapja a StarCraft II lett.",
        links: [{ phrase: "StarCraft II", href: "../tournaments/starcraft2.html" }],
      },
      {
        type: "p",
        text: "Az első WORTEX-verseny 2025-ben indította el a sorozatot: Nihed lett az első bajnok, Psz pedig a döntős. Egy évvel később a WORTEX már tágabb eseményként tért vissza. A StarCraft II maradt a kiemelt cím, de a StarCraft: Remastered és a Hearthstone is bekerült a programba, így az esemény túlmutatott egyetlen kompetitív közösségen.",
        links: [
          { phrase: "StarCraft II", href: "../tournaments/starcraft2.html" },
          { phrase: "StarCraft: Remastered", href: "../tournaments/starcraft.html" },
          { phrase: "Hearthstone", href: "../tournaments/hearthstone.html" },
        ],
      },
      {
        type: "p",
        text: "Freeman lett a 2026-os StarCraft II-bajnok, Psz pedig ismét bejutott a döntőbe. StarCraft: Remasteredben Eagle lett az első WORTEX-bajnok, a Team Zentris játékosa, non pedig a második helyezett. A Hearthstone is először csatlakozott a WORTEX-hez, a főversenyt Valnarr nyerte. Az eredmények azonban csak egy részét jelentik a projektnek.",
      },
      { type: "h2", lines: ["Az offline", "élmény"] },
      {
        type: "split",
        side: "left",
        figure: {
          file: "assets/img/casters-setup.jpg",
          cgi: "assets/cgi/shard.svg",
          label: "WORTEX-kommentátorok és közvetítőállás a kulisszák mögött",
          caption: "Kulisszatitkok a WORTEX közvetítő- és produkciós felállásáról.",
        },
        blocks: [
          {
            type: "p",
            text: "Minden verseny mögött ott van az a munka, ami a mérkőzéslistából eseményt csinál. Fel kell építeni a produkciót, a castereknek stabil felállás kell, a játékosoknak színpad, a partnereknek megjelenés, a közvetítésnek pedig saját identitás. Végül pedig okot kell adni arra, hogy az emberek együtt nézzék.",
          },
          {
            type: "p",
            text: "Ezért lett egyre fontosabb a WORTEX-nek az offline elem. Az eseményt nem csak a pályán lévőknek tervezzük. A közönségnek, a kommentátoroknak, a produkciós csapatnak és a játékok körüli szélesebb közösségnek is szól.",
          },
        ],
      },
      {
        type: "figure",
        layout: "wide",
        file: "assets/img/venue-attendees.jpg",
        cgi: "assets/cgi/ring.svg",
        label: "Nézők és játékosok a WORTEX offline esporteseményén",
        caption: "Játékosok, nézők és stáb együtt az offline eseményen.",
      },
      { type: "h2", lines: ["Több, mint", "mérkőzések"] },
      {
        type: "p",
        text: "A WORTEX a versenyközvetítéseken túl is bővült. A Signature Series a játékosokra fókuszáló történetmesélést hozta be az esemény előtt. A WRTX Podcast hosszabb beszélgetéseknek adott helyet. A showmatch-ek ismert neveket hoztak össze a főtablón kívül. Az offline döntők pedig fizikailag átélhetővé tették a versenyt.",
        links: [
          { phrase: "versenyközvetítéseken", href: "../index.html#vods" },
          { phrase: "Signature Series", href: "signature-series-panda.html" },
        ],
      },
      { type: "h2", text: "A következő fejezet" },
      {
        type: "p",
        text: "A következő fejezet tétje nem az, hogy a WORTEX egyszerűen nagyobb legyen. Az, hogy jobb legyen: jobb események, jobb történetek, jobb produkció, több ok a játékosoknak a versenyzésre és több ok a nézőknek arra, hogy számítson nekik.",
      },
      {
        type: "p",
        text: "A játékok köre idővel bővülhet, de az alapötlet marad: olyan versenyt teremteni, amelyben érdemes játszani, olyan történeteket, amelyeket érdemes követni, és olyan eseményeket, amelyekre érdemes emlékezni.",
      },
      { type: "quote", text: "A verseny az alap. A körülötte lévő emberek teszik WORTEX-szé." },
    ],

    "signature-series-panda": [
      {
        type: "staccato",
        items: [
          "A versenyközvetítések természetesen az eredményekre figyelnek.",
          "Ki jutott tovább?",
          "Ki esett ki?",
          "Ki ért be a döntőbe?",
          "Ki lett a bajnok?",
        ],
      },
      { type: "h2", lines: ["Miért létezik a", "Signature Series"] },
      {
        type: "p",
        text: "A kompetitív jelenetek már jóval az eredménylista előtt az emberekről szólnak. Ez a WORTEX Signature Series alapötlete. A 2026-os szezonra készült, játékosközpontú videoformátum azt a célt szolgálja, hogy a versenyzőket még az offline színpad előtt bemutassa.",
      },
      {
        type: "p",
        text: "Nem az a cél, hogy eredményeket jósoljon. Hanem hogy a játékosok saját teret kapjanak: a játékhoz fűződő viszonyukat, kompetitív múltjukat, személyiségüket, elvárásaikat és azt a nézőpontot, amivel a WORTEX-re érkeznek. A 2026-os Signature Seriesben Panda, RobbyG, Milkaa és Psz szerepelt. Minden epizód rövid játékosportrénak készült, nem hagyományos versenyinterjúnak.",
      },
      { type: "h2", lines: ["Panda", "A sötét ló"] },
      {
        type: "p",
        text: "Panda a WORTEX 2026-ra úgy érkezett, mint akit a legegyszerűbb volt alábecsülni. Egy olyan csoportban, ahol bejáratott nevek és rutinos versenyzők szerepeltek, nem azokkal az elvárásokkal lépett pályára, amelyek a favoritokra nehezednek. Épp ezért volt az egyik legérdekesebb játékos, akit követni lehetett.",
        links: [{ phrase: "WORTEX 2026", href: "../tournaments/starcraft2.html" }],
      },
      {
        type: "p",
        text: "A sötét ló története azért működik, mert a közönség már az első játszma előtt érti az egyenlőtlenséget. A favorittól győzelmet várnak. A sötét lónak viszont lehetősége van megváltoztatni, hogyan látják. Pandának a WORTEX pont ilyen színpadot kínált.",
      },
      {
        type: "p",
        text: "A Signature Series-epizódját azért készítettük, hogy a játékost még azelőtt bemutassuk, hogy az eredmények meghatároznák. Nem csak a ranglistán vagy a korábbi helyezéseken keresztül, hanem úgy, hogy a néző megismerhesse azt az embert, aki belép a versenybe.",
      },
      {
        type: "youtube",
        id: "XYCvUr9jhUg",
        title: "WORTEX Signature Series — Panda",
        caption: "WORTEX Signature Series — Panda.",
      },
      {
        type: "p",
        text: "Ez a kontextus megváltoztatja, milyen egy mérkőzés. Ha a néző már tud valamit a név mögötti emberről, egy meglepetésgyőzelem többet jelent. Egy szoros széria többet jelent. Még a vereség is egy nagyobb történet része lesz, nem csupán még egy kieső név a tablón.",
      },
      {
        type: "p",
        text: "Ezért létezik a Signature Series. A videók nem a kompetitív közvetítést akarják kiváltani. Kontextust adnak a versenynek. Panda epizódja különösen jól mutatja a formátumot, mert a sötét ló szerepe már a torna előtt feltesz egy kérdést: mi van, ha mindenkit meglep? Ezt a kérdést tudja hozzáadni a játékostörténet egy esporteseményhez még azelőtt, hogy egyetlen mapot is lejátszanának.",
      },
      { type: "h2", text: "A sorozat" },
      {
        type: "p",
        text: "A Signature Series a WORTEX tartalmai mellett kapott helyet. A versenyközvetítések magát a küzdelmet mutatják. A WRTX Podcast hosszabb beszélgetéseket ad. A showmatch-ek különleges párosításokat hoznak. A Signature Series magukat a versenyzőket mutatja be. Együtt ezek a formátumok többféleképpen mesélik el az eseményt, mint amire egy tablo önmagában képes lenne.",
        links: [{ phrase: "versenyközvetítések", href: "../index.html#vods" }],
      },
      { type: "quote", text: "Mielőtt a mérkőzés elkezdődik, a történet már ott van." },
    ],

    "warcraft-starcraft-new-era": [
      {
        type: "p",
        text: "A Blizzard klasszikus stratégiai játékainak rajongói számára a BlizzCon 2026 két olyan bejelentést hozott, amely néhány éve még valószínűtlennek hangzott volna. A Warcraft III-nak új kampánya van. A StarCraftnak pedig új játéka. Nagyon különböző projektek, de együtt azt mutatják, hogy a Blizzard visszatér két olyan univerzumhoz, amelyek közösségei a saját eredeti korszakukon túl is játszottak.",
      },
      { type: "h2", lines: ["Warcraft III", "Forsaken Kingdom"] },
      {
        type: "p",
        text: "Több mint két évtized után a Warcraft III először kapott új történeti kampányt. A Warcraft III: Reforged — Forsaken Kingdom Lordaeronba visz vissza, és a királyság bukása, majd az Undercity-vé alakulása körüli időszakot járja körül. A kampány a Forsaken felemelkedését követi, köztük Sylvanas Windrunnert, és kitölti a Warcraft III és a World of Warcraft kezdete közötti történet egy részét.",
      },
      {
        type: "p",
        text: "A Forsaken Kingdom mégsem csupán egy újabb hagyományos Warcraft III-kampány. A Blizzard a főkampányt puha nyílt világú RPG-szerkezetként írta le, a Rexxar-kampány szellemében. A játékosok ismerős helyszíneken mozognak — köztük Stratholme-ban és az Undercityben —, miközben bővített RPG-rendszereket használnak, például:",
      },
      {
        type: "list",
        items: ["felszerelést", "tárhelyeket", "hőskészleteket", "tárgyakat", "talentrendszereket"],
      },
      {
        type: "p",
        text: "A kiadáshoz tartozik a Last Days of Lordaeron prológus is, amely hagyományosabb, lineáris Warcraft III-kampányélményt ad, mielőtt a tágabb Forsaken Kingdom-struktúra kinyílna.",
      },
      {
        type: "figure",
        layout: "wide",
        file: "assets/articles/warcraft-forsaken-gameplay.png",
        cgi: "assets/cgi/prism.svg",
        label: "Warcraft III: Reforged — Forsaken Kingdom játékmenet",
        caption: "Warcraft III: Reforged — Forsaken Kingdom. Kép: Blizzard Entertainment.",
      },
      {
        type: "p",
        text: "Épp ezért szokatlan a projekt. A Warcraft III mindig is az RTS és az RPG határán élt. A hősök, a szintezés, a tárgyak és a kampányos haladás a kezdetektől a játék identitásához tartoztak, és a Forsaken Kingdom úgy tűnik, inkább ebbe az irányba lép tovább, mintsem hogy egyszerűen lemásolná az eredeti kampányok szerkezetét.",
      },
      {
        type: "p",
        text: "A régi játékosok számára nehéz figyelmen kívül hagyni a jelentőségét. A Warcraft III évekig a kompetitív játékon, a custom mapeken, a moddingon és azon a közösségen keresztül maradt életben, amely tovább épített köré. Most a játék ismét hivatalos új történeti tartalmat kapott.",
      },
      { type: "h2", lines: ["A StarCraft", "új korszaka"] },
      {
        type: "figure",
        layout: "wide",
        file: "assets/articles/starcraft-new-game.jpg",
        cgi: "assets/cgi/core.svg",
        label: "STARCRAFT-bejelentés a Blizzard Entertainmenttől",
        caption: "STARCRAFT-bejelentés. Kép: Blizzard Entertainment.",
      },
      {
        type: "p",
        text: "A StarCraft bejelentése még váratlanabb. A Blizzard bemutatta a STARCRAFT-ot, egy eredeti nyílt világú shootert a Koprulu-szektorban, jelenleg 2030 tavaszára tervezve. Egy olyan franchise-nál, amelynek identitását 1998 óta a valós idejű stratégia határozta meg, ez drámai váltás.",
      },
      {
        type: "p",
        text: "Ez nem StarCraft III. Nem a Brood War vagy a StarCraft II leváltásaként beszélnek róla. A Blizzard az univerzumot egy másik műfajba viszi. A StarCraft-rajongóknak ez másfajta kérdést vet fel: milyen a Koprulu-szektor, ha a játékos már nem felülről irányít egy sereget?",
      },
      {
        type: "p",
        text: "A StarCraft világa mindig is hordozta egy közvetlenebb akciójáték alapanyagait: Terran tengerészgyalogosok, Ghostok, Zerg-rajok, Protoss harcosok, idegen bolygók, katonai frakciók és nagy léptékű konfliktusok. Egy nyílt világú shooter a nézőpontot változtatja meg, miközben ez az univerzum marad az alap.",
      },
      { type: "h2", lines: ["Mit jelent ez", "a klasszikus közösségeknek"] },
      {
        type: "p",
        text: "A kompetitív játékosok számára egyik bejelentés sem teszi kevésbé relevánssá a klasszikus játékokat. A Brood War Brood War marad. A StarCraft II StarCraft II marad. A Warcraft III továbbra is az egyik legjellegzetesebb kompetitív RTS, amit valaha csináltak. A kompetitív közösségek nem tűnnek el attól, hogy egy franchise másik műfajt is megpróbál. Ha valami, egy nagy új megjelenés épp visszaterelheti a figyelmet azokra a játékokra, amelyek ezeket az univerzumokat létrehozták.",
      },
      {
        type: "p",
        text: "Ez a WORTEX-nek is számít. A StarCraft II a WORTEX kiemelt címe, és az a játék, amellyel a versenysorozat indult. A StarCraft: Remastered 2026-ban lépett a WORTEX offline színpadára. A Warcraft pedig azoknak a közösségeknek egyike, amelyeket a WORTEX a jövőben mélyebben bevonna, ha a játékosok részéről van rá igény.",
        links: [
          { phrase: "StarCraft II", href: "../tournaments/starcraft2.html" },
          { phrase: "StarCraft: Remastered", href: "../tournaments/starcraft.html" },
          { phrase: "Warcraft", href: "../tournaments/more.html" },
        ],
      },
      {
        type: "p",
        text: "A Blizzard új projektjeinek iránya tehát nagyon különbözhet azoktól a versenyektől, amelyeket ma a WORTEX-en játszanak. Az ezek körül az univerzumok körül újraéledő figyelem mégis lehetőség. Az egyik franchise egy régi játékhoz tér vissza egy teljesen új kampánnyal. A másik a játéktörténet egyik leghíresebb stratégiai univerzumát viszi ismeretlen területre.",
      },
      {
        type: "p",
        text: "Egyik bejelentés sem a kézenfekvő utat választotta. Talán épp ez teszi őket érdekessé. Azoknak a közösségeknek, amelyek évtizedek óta életben tartották a Warcraftot és a StarCraftot, a BlizzCon 2026 emlékeztető volt: ezek az univerzumok még mindig változnak.",
      },
      {
        type: "quote",
        text: "A közösségek tartották életben ezeket a játékokat. Most az univerzumaik újra mozognak.",
      },
    ],
  };
})(window);
