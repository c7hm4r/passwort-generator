# Passwort-Generator

[In English](./README.md)

Dies ist ein kleines Kommandozeilenwerkzeug, das eine Liste leicht merkbarer Passwörter in deutscher Sprache generiert, ähnlich *Diceware*. Es verwendet dabei den [DeReWo-Korpus](http://www1.ids-mannheim.de/kl/projekte/methoden/derewo.html) deutscher Wörter, der nach der allgemeinen Worthäufigkeit sortiert ist. Das Programm lässt kürzere und häufigere Wörter öfter in den Passwörtern erscheinen, wobei eine händisch optimierte Formel verwendet wird.

## Sicherheit

Trotz dass die Gewichtung der Wörter unterschiedlich ist, stellt das Programm sicher, dass die vorgegebene Entropie erreicht wird. Die Entropie ist ein Maß dafür, wie viele Versuche eine Angreifer benötigen würde, wenn er jedes passwort ausprobieren würde (*brute force*).

Das Programm gibt eine Liste von Passwörtern auf der Konsole aus. Passwörter, die später in der Liste auftauchen haben für sich eine höhere Entropie um die Auswahl eines (möglicherweise schwachen) Passworts durch den Benutzer zu kompensieren. Darum hat die Anzahl der dargestellten Passwörter keinen Einfluss auf die Passwortstärke so lange das Werzeug nicht mehrmals aufgerufen wird.

Berücksichtigen Sie, dass die kryptografische Sicherheit der Passwörter von der Zufälligkeit abhängig ist, die auf der Maschine verfügbar ist, auf der das Werkzeug ausgeführt wird. Es verwendet [seedrandom](https://github.com/davidbau/seedrandom) als Pseudozufallszahlengenerator, der die Node.js-Kryptografie-API verwendet.

**Obwohl die Ausgabe sicher aussieht, kann der Autor nicht garantieren, dass die Software wie erwartet funktioniert.**

## Verwendung

Um dieses Werkzeug auszuführen, müssen die folgenden Voraussetzungen installiert sein:

- [Node.js](https://nodejs.org/de/)
- [Yarn](https://yarnpkg.com/de/)
- [Git](https://git-scm.com/)
- Grundlegendes Wissen über die Kommandozeile

Führen Sie dann die folgenden Kommandos aus, um eine Liste von Passwörtern zu generieren:

```shell
git clone https://github.com/c7hm4r/passwort-generator
cd passwort-generator
yarn
yarn build
yarn -s start
```

Beispielausgabe:

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

Sie können ein beliebiges Passwort aus der (auf ihrem computer generierten) Liste auswählen. Der Favorit des Autors aus dieser Beispielliste ist: `tanzkaffee konzertbesuch 70 65 herzlich`

Um die Datei `dereGrundformlistClean.txt` zu generieren, die existiert, um die Passwortgenerierung zu beschleunigen, führen Sie aus:

```shell
./node_modules/.bin/ts-node extractWordsFromDeReWoGrundformliste.ts
```

## Konfiguration

Momentan gibt es keine Konfiguration außerhalb des Quellcodes. Die Passwortentropie and -anzahl kann am Beginn der Datei `index.ts` mit einem Texteditor angepasst werden.
