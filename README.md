# Passwort-Generator

[Auf Deutsch](./README.de.md)

This is a little command line tool which generates a list of memorable passwords in German language. It uses the [*DeReWo* corpus](http://www1.ids-mannheim.de/kl/projekte/methoden/derewo.html) of German words, which is ordered by common word frequency. The programm makes shorter and more common words appear more often in the passwords via a manually tweaked formula.

## Security

Despite the weight of the words being differently, the program makes sure that the specified entropy is reached. The entropy is some measure how many tries an attacker would need if he wanted to try every password (brute force).

The programm prints a list of passwords to the console output. Passwords which appear later in the list have a larger individual entropy to compensate the selection of a (possibly weak) password of the user. So the number of printed passwords does not affect password strength as long as the tool is not invoked multiple times per password.

Note the cryptographic security of the passwords depends on the randomness available on the machine the tool is executed. It uses [seedrandom](https://github.com/davidbau/seedrandom) as pseudo random number generator which uses the Node.js cryptophy API.

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
./node_modules/.bin/ts-node index.ts
```

To generate the file `dereGrundformlistClean.txt`, which exists to speed up password generation, run:

```shell
./node_modules/.bin/ts-node extractWordsFromDeReWoGrundformliste.ts
```

## Configuration

Currently there is no configuration outside the code. The password entropy and count can be adapted at the top of the file `index.ts` using a text editor.
