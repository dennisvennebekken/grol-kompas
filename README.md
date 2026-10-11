# Grol Kompas — beheerdershandleiding

Wegwijzer voor trainers, leiders, spelers en ouders binnen de jeugdopleiding van s.v. Grol.
Live op **https://dennisvennebekken.github.io/grol-kompas/**

Dit document is bedoeld voor wie het Kompas in de toekomst beheert. Je hebt geen
programmeerervaring nodig voor het meeste onderhoud, maar wel een beetje geduld en
een GitHub-account met toegang tot deze repository.

---

## 1. Hoe het in elkaar zit

Het Kompas is **één HTML-bestand**. Geen framework, geen bouwstap, geen server, geen
database. `index.html` bevat de volledige opmaak (CSS), alle teksten en alle
programmatuur (JavaScript). Je opent het bestand, je past iets aan, je uploadt het,
klaar.

Die keuze is bewust. Een vrijwilligersproject moet over vijf jaar nog te beheren zijn
door iemand die hier nu nog niets van weet. Alles wat je nodig hebt zit in één bestand
en een webbrowser.

De app is een **PWA** (progressive web app): wie hem op zijn telefoon aan het
beginscherm toevoegt, heeft een app-icoon en kan het Kompas ook zonder internet lezen.
Dat regelt `sw.js`.

### Bestanden

| Bestand | Wat het is |
|---|---|
| `index.html` | De hele app: opmaak, teksten, data en programmatuur (~190 kB) |
| `sw.js` | Service worker — zorgt dat de app offline werkt |
| `manifest.json` | App-naam, kleuren en iconen voor "toevoegen aan beginscherm" |
| `toegang.json` | De toegangscode. Enige bestand dat je kunt wijzigen zonder iets van code te weten |
| `documenten/` | De PDF's en Excel-bestanden uit de bibliotheek |
| `img/` | Logo, iconen, visiekaarten, sfeerbeelden |
| `img/hero/` | De brede beelden bovenaan elke pagina |
| `fonts/` | Barlow Condensed en Inter, meegeleverd zodat de app offline er goed uitziet |

---

## 2. Publiceren

De site draait op **GitHub Pages** vanuit de `main`-branch, map root. Alles wat je naar
deze repository uploadt staat binnen een paar minuten online.

**Een bestand wijzigen en publiceren:**

1. Pas het bestand aan op je eigen computer.
2. Ga naar `https://github.com/dennisvennebekken/grol-kompas/upload/main`
   (of `/upload/main/documenten` voor de documentenmap).
3. Sleep het bestand erin — een bestaand bestand met dezelfde naam wordt overschreven.
4. Vul onderaan een korte omschrijving in van wat je hebt veranderd.
5. Klik op **Commit changes**.

**Let op:** GitHub Pages heeft één tot twee minuten nodig om te herbouwen. Zie je je
wijziging nog niet, zet dan tijdelijk `?v=2` achter de URL om de cache van je browser
te omzeilen: `.../grol-kompas/index.html?v=2`.

**Tekstje wijzigen zonder downloaden:** klik in GitHub op het bestand, dan op het
potloodje rechtsboven. Voor `toegang.json` en `README.md` is dat de makkelijkste weg.
Voor `index.html` werkt het ook, maar in een bestand van 190 kB zoeken is lastiger dan
in een teksteditor op je eigen computer.

---

## 3. De meest voorkomende klussen

### 3.1 Toegangscode wijzigen

Open `toegang.json` en verander de vier cijfers:

```json
{ "code": "1919" }
```

Opslaan via **Commit changes**. Binnen een paar minuten geldt de nieuwe code, en
iedereen die de oude had krijgt het invoerscherm opnieuw te zien.

> De code is een **drempel, geen beveiliging**. Hij staat in een openbaar bestand en is
> leesbaar voor wie zoekt, en de PDF's in `documenten/` blijven rechtstreeks opvraagbaar
> via hun eigen adres. Wil je echte afscherming, dan heb je andere hosting nodig
> (bijvoorbeeld Cloudflare Access voor de hele site). Zet dus nooit iets in het Kompas
> dat niet openbaar mag worden.

### 3.2 Een document toevoegen aan de bibliotheek

Drie stappen, en sla er geen over:

1. Upload het bestand naar `documenten/` (zie hoofdstuk 2).
2. Voeg het toe aan de lijst `BIEB` in `index.html`. Zoek op `const BIEB`. Elke regel
   heeft drie delen: bestandsnaam, titel, ondertitel.

   ```js
   ['Bestandsnaam.pdf', 'Titel in de bibliotheek', 'korte toelichting'],
   ```

   De bestandsnaam moet **exact** kloppen, inclusief hoofdletters, spaties en streepjes.
   Een typefout levert een link op die niets doet.
3. Wil je het document ook op een pagina zelf tonen, voeg daar dan een `<a class="doc">`
   toe. Kopieer een bestaande regel en pas de link en de tekst aan.

### 3.3 Een document verwijderen

Omgekeerd, en ook hier alle stappen:

1. Haal de regel uit `BIEB`.
2. Haal eventuele `<a class="doc">`-links naar dat bestand uit de pagina's.
   Zoek in `index.html` op de bestandsnaam om ze allemaal te vinden.
3. Verwijder het bestand uit `documenten/` in de repository: klik erop in GitHub,
   dan op het prullenbakje, dan **Commit changes**.

Stap 3 is de belangrijkste. Zolang het bestand er staat is het opvraagbaar, ook als er
nergens meer naar wordt gelinkt.

### 3.4 Trainers en leiders bijwerken

Zoek in `index.html` op `id="p-staf"`. De teams staan in gewone HTML-tabellen, per bouw.
Een regel ziet er zo uit:

```html
<tr><td><b>JO13-1</b></td><td>Rik Gockel · Tom Kaak · Thijmen de Vries</td><td></td></tr>
```

De derde kolom is voor een opmerking (bijvoorbeeld `breedtesporttraining`). Namen scheid
je met ` · `. Voor een openstaande plek:

```html
<td><span class="badge rood">VACATURE</span></td>
```

**Zet hier geen telefoonnummers in.** Het Kompas staat op een openbare website. Alleen
functionarissen van wie de gegevens ook op svgrol.nl staan, krijgen een nummer — en dan
op de pagina Praktisch & contact, niet in deze tabellen.

### 3.5 Technisch coördinatoren en leeftijdscoördinatoren

Die staan apart, in `BEGELEIDING`. Zoek op `const BEGELEIDING`:

```js
o13:{tc:'Alexander Esseling', lc:'Lucas van Katwijk'},
```

`tc` is de technisch coördinator, `lc` de leeftijdscoördinator. Deze namen verschijnen
automatisch in het blok "Jouw aanspreekpunten" op elke teampagina. Eén plek aanpassen is
dus genoeg.

### 3.6 Een kalenderitem toevoegen of wijzigen

Zoek op `const KAL`. Elke regel is één gebeurtenis:

```js
{d:'2027-01-25', t:'o', ti:'Overleg Technisch Hart · 20.00 uur', tag:'TH'},
```

| Veld | Betekenis |
|---|---|
| `d` | Datum, altijd `jjjj-mm-dd` |
| `t` | Soort — zie hieronder |
| `ti` | De tekst die in de tijdlijn verschijnt |
| `tag` | Het labeltje rechts, kort houden |

Soorten (`t`): `b` bijeenkomst (rood) · `o` overleg (blauw) · `e` evaluatie (goud) ·
`i` teamindeling (groen) · `v` vakantie en overig (grijs).

De volgorde in de lijst maakt niet uit; de app sorteert zelf op datum. Het blok "Deze
week bij Grol" en de filterknoppen werken automatisch mee.

### 3.7 Naar een nieuw seizoen

Dit is de grootste jaarlijkse klus. In volgorde:

1. **`KAL`** helemaal vervangen door de data van het nieuwe seizoen. Let op hoe de dagen
   vallen: een datum die dit jaar op zaterdag valt, doet dat volgend jaar niet.
   Controleer de competitiestart bij de KNVB en de schoolvakanties bij de Rijksoverheid.
2. **`FASEN`** aanpassen — de gekleurde balk "het seizoen in één oogopslag".
   `v` is de startdatum, `t` de einddatum, `l` het label, `c` de kleur, `w` de relatieve
   breedte. De `w`-waarden samen bepalen de verhoudingen; die hoeven niet op te tellen
   tot honderd.
3. **`BEGELEIDING`** en de stafpagina bijwerken met de nieuwe trainers en coördinatoren.
4. **Jaartallen in de teksten.** Zoek op het oude seizoen (`2026-2027`) en loop alle
   treffers na: paginatitels, de Informatiegids, het vergaderschema.
5. **`VERSIE`** bijwerken, zie 3.8.
6. **`CACHE_VERSIE`** in `sw.js` ophogen, zie hoofdstuk 5.

### 3.8 Versiedatum

Zoek op `const VERSIE`:

```js
const VERSIE='10 oktober 2026 · ontwerp 2.1';
```

Die tekst verschijnt onderaan de homepagina bij "Over deze app" en wordt meegestuurd met
de feedbackknop. Werk hem bij als je iets inhoudelijks verandert — zo kun je later zien
welke versie iemand voor zich had.

---

## 4. De data in index.html

Alle inhoud die meer dan een enkele keer voorkomt, staat in lijsten bovenaan het
script-blok. Dat betekent: je past één plek aan en de app werkt overal mee.

| Lijst | Waarvoor |
|---|---|
| `PRINCIPES` | De 14 spelprincipes, met uitleg per principe |
| `TEAMS` | Per leeftijdsgroep: spelprincipes, techniek, tactiek, mentaal, fysiek, visiekaart |
| `BEGELEIDING` | Technisch coördinator en leeftijdscoördinator per groep |
| `POSITIES` | Profielen per positie in de 1-4-3-3 |
| `VELDPOS` | Waar de rugnummers op het veldplaatje staan (`x`/`y` in pixels) |
| `STAPPEN` | De zes stappen van het teamindelingsproces |
| `CRITERIA` | De vier criteria voor de teamindeling |
| `BIEB` | De bibliotheek, gegroepeerd per rubriek |
| `KAL` | De jaarkalender |
| `FASEN` | De seizoensbalk |
| `CHECKS` | De startchecklist voor nieuwe trainers |

**Voetbal+ is een uitzondering.** In `TEAMS` heeft dat team `apart:true` en géén
`tech`, `tac`, `men`, `fys` of `pr`. Er is voor Voetbal+ bewust geen voetbalvisie: plezier
staat voorop. Code die door `TEAMS` heen loopt moet daar rekening mee houden — zie de
valkuilen in hoofdstuk 8.

---

## 5. Offline werken (sw.js)

`sw.js` bewaart de app op het toestel van de gebruiker. Zonder dat zou het Kompas op het
sportpark, waar het netwerk slecht is, onbruikbaar zijn.

Drie strategieën:

- **`index.html`** — eerst het netwerk, dan pas de opgeslagen versie. Zo zien mensen
  wijzigingen meteen.
- **`toegang.json`** — altijd eerst het netwerk, zodat een nieuwe code direct geldt.
- **Alles anders** (beelden, lettertypen, PDF's) — eerst de opgeslagen versie. Wat je één
  keer hebt geopend blijft offline beschikbaar.

**Hoog `CACHE_VERSIE` op** als je iets verandert aan beelden, lettertypen of de lijst
`SCHIL`:

```js
const CACHE_VERSIE = 'grol-kompas-v6';
```

Maak er `v7` van. Bij de eerstvolgende keer openen gooien alle toestellen de oude
voorraad weg en halen ze alles opnieuw op. Doe dit niet bij elke tekstwijziging — dat is
onnodig dataverbruik voor de gebruiker, en voor `index.html` is het niet nodig.

---

## 6. Zoeken

De zoekfunctie bouwt zichzelf. Bij het opstarten loopt `bouwIndex()` door alle pagina's
en knipt de inhoud in blokken (`.kaart`, `.principe`, `table`, `.motto`, `.stap`, `.criterium`).
Nieuwe tekst die je in een bestaande kaart zet, is dus meteen vindbaar — daar hoef je
niets voor te doen.

Twee uitzonderingen, die handmatig worden bijgevoegd:

- **Teampagina's**, omdat die pas worden opgebouwd als je een team aanklikt.
- **Kalender en startchecklist**, omdat die uit lijsten komen in plaats van uit HTML.

Zet je een nieuw soort blok op een pagina en wil je dat het vindbaar is, voeg de
CSS-klasse dan toe aan de regel met `querySelectorAll` in `bouwIndex()`.

---

## 7. Vormgeving

Alle kleuren en maten staan als variabelen bovenaan de CSS, bij `:root`:

```css
--blauw:#16337e;   /* clubblauw, hoofdkleur */
--rood:#c4122f;    /* clubrood, accenten */
--goud:#e8a400;    /* let op / concept */
--radius:16px;     /* afronding van kaarten */
```

Wijzig je `--blauw`, dan verandert de hele app mee. Elke pagina heeft daarnaast een eigen
accentkleur via `style="--accent:var(--rood)"` op de `<section>`.

**Donkere modus** werkt automatisch mee via `prefers-color-scheme: dark`. Voeg je nieuwe
kleuren toe, kijk dan of er ook een donkere variant nodig is.

**Iconen** zijn SVG's die bovenaan het bestand als `<symbol>` staan en overal worden
aangeroepen met:

```html
<svg class="i"><use href="#i-naam"/></svg>
```

Een nieuw icoon voeg je toe door een `<symbol>` bij te zetten met een eigen `id`. Houd
`viewBox="0 0 24 24"` aan en gebruik `stroke="currentColor"`, dan neemt het icoon
automatisch de kleur van de tekst over.

---

## 8. Valkuilen

Dit zijn dingen die in de praktijk zijn misgegaan. Lees ze even door voordat je begint.

**Een fout in de data maakt de hele app leeg.** Het script loopt van boven naar beneden en
roept pas aan het eind `route()` aan, de functie die een pagina toont. Loopt het daarvoor
ergens vast, dan krijgt de bezoeker een witte pagina — niet alleen op het stuk dat kapot
is, maar overal. Er staan daarom `try/catch`-blokken omheen. Haal die niet weg.

Zie je een lege app: open de ontwikkelaarsconsole van je browser (F12, tabblad Console).
Daar staat precies welke regel het probleem veroorzaakt. Negen van de tien keer is het een
ontbrekende komma of een aanhalingsteken te veel in een lijst.

**Voetbal+ heeft geen voetbalinhoud.** Schrijf je iets dat door `TEAMS` heen loopt, vang
dan `t.apart` af. Dit is al een keer misgegaan: zonder die controle probeerde de code
`t.tech.m` te lezen bij een team dat geen `tech` heeft, en viel de hele app om.

**Bestandsnamen met spaties.** De documenten heten "Hand-out Spelprincipes Grol.pdf" en
dergelijke. Dat werkt, maar kopieer de naam altijd letterlijk. Een hoofdletter verschil
is op de server van GitHub een ander bestand.

**Maak teksten niet passend met afbrekingen.** Op mobiel zijn lange woorden en tabellen
een uitdaging. Gebruik géén `overflow-wrap:anywhere` of automatisch afbreken — dat is
geprobeerd en levert onleesbare verticale woorden op. De gekozen oplossing is: tabellen
horizontaal laten scrollen, en smalle schermen een gestapelde weergave geven.

**Privacy.** Geen telefoonnummers van trainers en leiders in de app. Het clubbrede
overzicht met alle 06-nummers hoort niet in deze repository. Alleen functionarissen van
wie de gegevens al op svgrol.nl staan krijgen een nummer.

**Alles in deze repository is openbaar** — ook oudere versies van bestanden, via de
geschiedenis van de repository. Zet er dus nooit iets in dat later weer weg zou moeten.
Een bestand verwijderen haalt het niet uit de geschiedenis.

---

## 9. Welke documenten mogen online

Leidraad van het Voetbalbestuur: **alles wat in het Kompas staat, is actueel en
vastgesteld.**

Dat betekent in de praktijk:

- Geen archiefstukken van vorige seizoenen.
- Geen cursus- of studieopdrachten die nooit als beleid zijn vastgesteld.
- Geen evaluatie- of beoordelingsformulieren die intern worden gebruikt.
- Stukken die nog niet zijn vastgesteld: óf niet publiceren, óf onmiskenbaar als
  **concept** markeren. De jaarkalender is daar nu een voorbeeld van — zie de
  `conceptbalk` en de klasse `badge concept`.

Twijfel je? Leg het voor aan het Voetbalbestuur voordat je publiceert. De Commissie
Jeugdzaken beheert het Kompas, het Voetbalbestuur gaat over wat er in mag.

---

## 10. Testen voor je publiceert

Er zijn geen automatische tests. Wat wel werkt:

1. Open `index.html` op je eigen computer in een browser (dubbelklikken volstaat). Het
   toegangsscherm verschijnt dan niet — lokaal geopend slaat de app dat bewust over,
   zodat je kunt testen.
2. Druk op **F12** en kijk op het tabblad Console of er rode foutmeldingen staan.
3. Klik elke pagina in het menu één keer aan. Een lege pagina valt meteen op.
4. Doe een zoekopdracht op iets wat je net hebt toegevoegd.
5. Maak het venster smal (of gebruik de telefoonweergave in de ontwikkelaarsconsole) en
   kijk of tabellen en contactgegevens nog leesbaar zijn.

Pas daarna uploaden. En controleer na het publiceren de live site nog een keer — met
`?v=2` achter de URL, anders kijk je naar de versie uit je eigen cache.

---

## 11. Eigendom en contact

De **inhoud** van het Grol Kompas — beleidsstukken, documenten, namen, beeldmateriaal en
het clublogo — is eigendom van s.v. Grol te Groenlo.

De **opzet, vormgeving en programmatuur** zijn ontworpen, gebouwd en worden beheerd door
Dennis Vennebekken. Overname of hergebruik voor een andere vereniging of organisatie
alleen na schriftelijke toestemming.

Vragen over gebruik buiten s.v. Grol: dennis@venden.nl
