# Browser Technologies
//Robuuste, toegankelijke websites leren bouwen … 

## Opdracht 1 - Progressive Enhancement
Voor de opdracht ga ik uitzoeken hoe goed mijn OBA project genaamd Imposters presteert op het gebied van Progressive Enhancement. 

### Features

#### Afbeeldingen
Afbeeldingen zijn essentieel voor mijn concept. De afbeeldingen van de posters liggen aan de kern van het concept. Als deze, om welke reden dan ook, niet geladen worden is de website zo goed als waardeloos.

Ik heb alt teksten toegevoegd om toch nog iets mee te kunnen geven. Omdat deze afbeeldingen dynamisch ingeladen worden is het moeilijk om een passende alt tekst mee te geven. Ik heb gekozen om de titel, die in veel gevallen een duidelijke omschrijven geeft, te gebruiken.

Ook heb ik logica toegevoegd die een afbeelding van lagere kwaliteit inlaadt op kleinere viewports (900px of lager). Het liefst zou ik dit doen afhankelijk van de internetsnelheid.

```
if (window.innerWidth > 900) {
  newUrl = url.replace('level3', 'level2')
}
```
#### Custom fonts
Op de website gebruik ik inderdaad een custom font. Dit font is afkomstig van fonts.google.com. Het font laadt heel snel en is erg betrouwbaar. Voor het geval dat het font toch niet laadt heb ik het volgende gedaan:

Ik laad de fonts nu in via mijn eigen CSS ipv een extern bestand. Zo kan ik makkelijk de 'font-diplay: swap;' property meegeven. Ook heb ik een fallback font ingesteld. Op deze manier wacht de pagina niet tot het font geladen is om de test te weergeven.

```
/* latin-ext */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 900;
  src: local('Montserrat Black'), url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_epG3gfD_vx3rCubqg.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  font-display: swap;
}
```

Ook filter ik welke fonts ik precies inlaad. Het google font 'Montserrat' dat ik gebruik komt standaard met Vietnamese en Cyrillische tekens. Deze heb ik weggelaten omdat ik deze niet gebruik.

#### Javascript
Omdat het gaat om een single-page web app is de website onbruikbaar zonder javascript. Hier is helaas weinig aan te doen. Ik zou een melding kunnen weergeven die gebruikers vraagt om wanneer mogelijk javascript aan te zetten.

Ik gebruik op dit moment voor mijn slider zowel flickity.js en jquery. Ik zou een eigen slider kunnen bouwen om niet meer van deze bestanden afhankelijk te zijn. Het zou de website ook iets sneller maken.

#### Kleur
Ik heb met de tool Sim Daltonism (https://michelf.ca/projects/sim-daltonism/) onderzocht hoe mijn website eruit ziet voor kleurenblinden. Bij alle meest voorkomende vormen van kleurenblindheid is de website op zichzelf goed bruikbaar. Dit geldt niet altijd voor de posters maar daar heb ik helaas weinig invloed op. De beschrijving bij de posters is denk ik voldoende om dit goed te maken.

Omdat de navigatie bij laag contrast een beetje moeilijk zichtbaar is heb een een underline toegevoegd voor extra duidelijkheid.

![](https://github.com/hackshackshacks/browser-technologies/blob/master/opdracht1/Screen%20Shot%202018-03-15%20at%2023.58.57.png?raw=true)

#### Breedband internet
Om te testen hoe mijn site presteert wanneer de gebruiker een langzame verbinding heeft. Dit doe ik met behulp van de chrome developer tools. De volledige website kost 1mb om te laden. 800/1000kb zijn gebruikt voor het laden van de afbeeldingen. Op dit moment laad ik meteen alle posters in van het gebouw Paradiso. De mogelijkheid is er om pas wanneer de user op 'volgende' klikt de volgende poster op te halen. Dit zou wel betekenen dat de ervaring voor gebruikers met snel internet wat minder wordt.

Wel worden de posters en achtergrond afbeeldingen opgeslagen in localStorage. Dit betekent dat de tweede keer laden een stuk sneller gaat dan de eerste. De tweede keer laden is meestal minder dan 150kb zelfs als er een nieuwe achtergrond wordt ingeladen.

#### Cookies
Op mijn website maak ik geen gebruik van cookies. 

#### Localstorage
Mijn website slaat alle geladen posters en achtergrondafbeeldingen op in localStorage. Dit zorgt ervoor dat er geen nieuwe API call gedaan hoeft te worden voor afbeeldingen die al een keer zijn geladen.

De gebruiker kan cookies en localStorage vrij makkelijk uitzetten. Dit betekent op mijn website dat de app opnieuw een api call gaat doen op de urls van de afbeeldingen op te halen. Dit is niet per se erg en de website werkt nog prima.

#### Muis/trackpad
Ik ben er achter gekomen dat mijn website totaal niet werkt zonder muis. Tabs slaan de navigatie volledig over en er zijn geen duidelijke focus states. De omschrijving van de posters is zelfs totaal onzichtbaar.

Ik heb het volgende gedaan:
* Navigatie verbeterd zodat deze bij tabben wordt meegenomen.
* Focus states toevoegen aan alle elementen.
* Met focus within is de omschrijving nu ook zichtbaar als de focus op de volgende/vorige knop staat.

![](https://github.com/hackshackshacks/browser-technologies/blob/master/opdracht1/Screen%20Shot%202018-03-15%20at%2023.58.57.png?raw=true)
*Active*

![](https://github.com/hackshackshacks/browser-technologies/blob/master/opdracht1/Screen%20Shot%202018-03-16%20at%2000.13.08.png?raw=true)
*Focus*

### To do
* Herschrijven van flickity carousel.

### Opdracht 1.1 - Breek het Web
Het Web laten 'breken' door features van het platform bewust uit te zetten. Images, custom fonts, JavaScript, kleur, breedband internet, etc. Allemaal met als doel je te laten beseffen hoeveel je nog niet weet van het Web, erachter komen dat je misschien aannames hebt die niet kloppen, en om je je in te laten leven in de eindgebruiker.

Onderzoek minimaal twee features. Dat betekent uitvogelen wat het voor impact heeft op de sites die je kent en normaal gebruikt. Kies sites in je directe omgeving: van je werkgever, lokale vereniging, de cafetaria om de hoek, en/of eerdere projecten die je zelf gedaan hebt.

Kies 2 features van de 8
- Zoek uit welke problemen ze kunnen veroorzaken (verzamel cijfers, meningen, ervaringen)
- Zoek uit hoe je dit kunt testen (hoe kun je een feature ‘uitzetten’)
- Vind een aantal sites waar dit ook problemen oplevert (uit je directe omgeving)
- Beschrijf hoe je dit kan fiksen
- Maak hierover een presentatie en neem die woensdag mee, dan gaan we de resultaten bespreken
Lezen: [Everyone has JavaScript, right?](https://kryogenix.org/code/browser/everyonehasjs.html) en [I Turned Off JavaScript and it was Glorious](https://www.wired.com/2015/11/i-turned-off-javascript-for-a-whole-week-and-it-was-glorious/)


### Opdracht 1.2 - Fork je OBA
Hoe zit het eigenlijk met Progressive Enhancement van je OBA opdracht? Waarschijnlijk kan daar wel het één en ander aan verbeterd worden, dat ding is immers in een week in elkaar gehackt! 

Voor deze opdracht ga je toepassen wat je van opdracht 1.1 hebt geleerd.
- Pas Progressive enhancement toe op je OBA Web App. 
- Check je OBA Web App op de 8 features uit opdracht 1.1 en verbeter de code waar mogelijk.
- Test  je OBA Web App in het device lab.
- Laat je OBA Web App voorlezen door een screenreader. 
- Gebruik onderstaande artikelen om je code te optimaliseren.
[The accessibility mindset](https://24ways.org/2015/the-accessibility-mindset/) en [Accessibility Originates With UX: A BBC iPlayer Case Study](https://www.smashingmagazine.com/2015/02/bbc-iplayer-accessibility-case-study/)

Criteria
- Zet je code op Github
- Schrijf een Readme met een beschrijving van de problemen die je hebt gevonden, hoe je die hebt opgelost, of hoe je dit zou oplossen (met todo’s) als je genoeg tijd en budget zou hebben 


 