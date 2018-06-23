# Passwort-Generator

[Auf Deutsch](./README.de.md)

This is a little command line tool which generates a list of memorable passwords in German language. It uses the [*DeReWo* corpus](http://www1.ids-mannheim.de/kl/projekte/methoden/derewo.html) of German words, which is ordered by common word frequency. The programm makes shorter and more common words appear more often in the passwords via a manually tweaked formula.

## Security

Despite the weight of the words being differently, the program makes sure that the specified entropy is reached. The entropy is some measure how many tries an attacker would need if he wanted to try every password (brute force).

The programm prints a list of passwords to the console output. Passwords which appear later in the list have a larger individual entropy to compensate the selection of a (possibly weak) password of the user. So the number of printed passwords does not affect password strength as long as the tool is not invoked multiple times per password.

Note the cryptographic security of the passwords depends on the randomness available on the machine the tool is executed. It uses [seedrandom](https://github.com/davidbau/seedrandom) as pseudo random number generator which uses the Node.js cryptophy API.

**Although the output looks safe, the author cannot guarantee that this software works as expected.**

## Usage

To run this tool the following prerequisites must be installed:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)
- [Git](https://git-scm.com/)
- Basic knowledge about the command line

Then run the following commands to generate a list of passwords:

```shell
git clone https://github.com/c7hm4r/passwort-generator
cd passwort-generator
yarn
yarn build
yarn -s start
```

Example output:

```text
ein essay koennen motettenchor knien allein
koenigreich grundsaetzlich es eingangs fall anmeldung
auto landfrau fertigungskontrolle also getto
immer im gewerkschaftsintern schmetterling weit versprechen
dahinfallen fuer liveshow sprechen ueberlegen
demokratietheoretisch umkleidebereich um gast geschaeftsmaessigkeit
kuenstler winzigklein sanitaeranlage zu 45 kommen
juedisch marabu 3 3500 odebrecht
ausgegeben seehund zu sein 60 ruecklage
los ausnahmeregelung milliardenaufwand auf er gesamtdeutsch
13 machen automat wirklich an einige verkleiden
szene der halten eher sterben zweidrittelmehrheit wenn
haben wichtig verursachen minderheitsbeteiligung uhr freistaat
35 jahr nahe september gemeinschaftskundeunterricht arbeitsschuh
tanzkaffee konzertbesuch 70 65 herzlich
2 haus strafprozess simpel nachdem zuschauerstrom
wiederholung hergeschoben 8 immer wenig spielen
farblos jagdbehoerde inselhauptstadt sonntagskonzert
mutter nach anfang mehr kunstwerk es herkunft
vorschlag proportion oberlicht sie hundert forschungsreise
erhalten stroemungsproporz furche auszubildende das
bundesrepublik knapp rotfront das wohnblock vernetzen
besuchen nah ausbrechen durchwegs zu einschraenkung
14 preis gemeindrat weil zuschauer an erhalten
besuch bei landkreis 1 bemerkung im so
ja ruhig aufstand vorstoss vor beerdigung
typen zwangsumsiedlung projekt zur immateriell investition
ihr zwoelf feilschen sieben abgestrahlt objektiv
zweite charakterfrage leserbrief kombination sicher erst
aussenbeauftragte muskelmasse scheurmann markiert
sogar sicherungsaufgabe beteiligte gemeinschaft november zusammenkommen
kostenfuehrerschaft frueh weit vernehmung stammform
aus sagen sich rund bayerisch spind schoepfung
leute auch fuer pflanzen unter foehre 3
in hier mol nun lieferpreis einzelinformation
nahezu vereinsvorsitzender folgen reizen 0 stammesvolk
verhalten verschaffen rotschimmel googeln klub
fuer ein foerderunterricht regiermeister 8000 abrufen
euro von er dampfbad fuersorgeamt ein forscher
noch arbeit informationsveranstaltung teil letzte jung ebenfalls
rente neuorganisiert jetzt einfach links alle
verwechslungskomoedie deutsch uebersetzung startpreis als samstag
serienrolle strassenschuh noch trieb geld
abendessen dazu alkohol fuss ein chance versroman
uebernatuerlich on unhandlich offiziell werden missbrauch
nennen abgesehen 2 auswirkung urploetzlich auf
jugendliche neu griechisch sagen stadel 850 fackellauf
alternativblatt naturdenkmal oesterreichisch regulation farbschleier
begabt maerz fuer kanton regierung eis verein
sich stecken preis zurueck studiert babygruppe
```

You can choose any password from the list (generated on your computer). The author’s favorite from the example list is: `tanzkaffee konzertbesuch 70 65 herzlich`

To generate the file `dereGrundformlistClean.txt`, which exists to speed up password generation, run:

```shell
./node_modules/.bin/ts-node extractWordsFromDeReWoGrundformliste.ts
```

## Configuration

Currently there is no configuration outside the code. The password entropy and count can be adapted at the top of the file `index.ts` using a text editor.
