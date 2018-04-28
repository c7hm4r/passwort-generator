# Passwort-Generator

[In English](./README.md)

Dies ist ein kleines Kommandozeilenwerkzeug, das eine Liste leicht merkbarer Passwörter in deutscher Sprache generiert, ähnlich *Diceware*. Es verwendet dabei den [DeReWo-Korpus](http://www1.ids-mannheim.de/kl/projekte/methoden/derewo.html) deutscher Wörter, der nach der allgemeinen Worthäufigkeit sortiert ist. Das Programm lässt kürzere und häuftigere Wörter öfter in den Passwörtern erscheinen, wobei eine händisch optimierte Formel verwendet wird.

## Sicherheit

Trotz dass die Gewichtung der Wörter unterschiedlich ist, stellt das Programm sicher, dass die vorgegebene Entropie erreicht wird. Die Entropie ist ein Maß dafür, wie viele Versuche eine Angreifer benötigen würde, wenn er jedes passwort ausprobieren würde (brute force).

Das Programm gibt eine Liste von Passwörtern auf der Konsole aus. Passwörter, die später in der Liste auftauchen haben für sich eine höhere Entropie um die Auswahl eines (möglicherweise schwachen) Passworts durch den Benutzer zu kompensieren. Darum hat die Anzahl der dargestellten Passwörter keinen Einfluss auf die Passwortstärke so lange das Werzeug nicht mehrmals aufgerufen wird.

Berücksichtigen Sie, dass die kryptograpfische Sicherheit der Passwörter von der Zufälligkeit abhängig ist, die auf der Maschine verfügbar ist, auf der das Werkzeug ausgeführt wird. Es verwendet [seedrandom](https://github.com/davidbau/seedrandom) als Pseudozufallszahlengenerator, der die Node.js-Kryptografie-API verwendet.

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
./node_modules/.bin/ts-node index.ts
```

Um die Datei `dereGrundformlistClean.txt` zu generieren, die existiert, um die Passwortgenerierung zu beschleunigen, führen Sie aus:

```shell
./node_modules/.bin/ts-node extractWordsFromDeReWoGrundformliste.ts
```

## Konfiguration

Momentan gibt es keine Konfiguration außerhalb des Quellcodes. Die Passwortentropie and -anzahl kann am Beginn der Datei `index.ts` mit einem Texteditor angepasst werden.
