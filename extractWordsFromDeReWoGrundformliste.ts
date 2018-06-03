import * as fs from "fs";
import { join } from "path";
import pify = require("pify");
import seedrandom = require("seedrandom");

const specialLetterReplacements = [
    { orig: "ä", dest: "ae" },
    { orig: "ö", dest: "oe" },
    { orig: "ü", dest: "ue" },
    { orig: "ß", dest: "ss" },
    { orig: "é", dest: "e" },
    { orig: "è", dest: "e" },
    { orig: "á", dest: "a" },
    { orig: "ó", dest: "o" },
    { orig: "ñ", dest: "n" },
    { orig: "ã", dest: "a" },
    { orig: "ç", dest: "c" },
    { orig: "ê", dest: "e" },
    { orig: "î", dest: "i" },
    { orig: "ë", dest: "e" },
    { orig: "ô", dest: "o" },
    { orig: "ù", dest: "u" },
    { orig: "à", dest: "a" },
    { orig: "å", dest: "a" },
    { orig: "í", dest: "i" },
    // { orig: "", dest: "" },
    // { orig: "", dest: "" },
];

const specialLetterRegexes = specialLetterReplacements
    .map((replacement) => {
        const regEx = new RegExp(replacement.orig.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gu");
        return {
            dest: replacement.dest,
            regEx,
        };
    });

function normalizeWord(word: string): string {
    let result = word.toLowerCase();
    for (const replacement of specialLetterRegexes) {
        result = result.replace(replacement.regEx, replacement.dest);
    }
    return result;
}

interface IDerewoGrundformListData {
    preamble: string;
    words: string[];
}

function readDerewoGrundformList(listPath: string): Promise<IDerewoGrundformListData> {
    return pify(fs.readFile)(listPath, "utf8").then((data: string) => {
        const valuableLines =
            data
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line.length > 0);
        const preambleEnd = valuableLines.findIndex((line) => line[0] !== "#");
        const preamble = valuableLines.slice(0, preambleEnd).join("\n");
        const dataLines =
            valuableLines
                .slice(preambleEnd)
                .filter((line) => line[0] !== "#");
        const firstColumnRE = new RegExp(/^[^\s()]+/);
        const firstColumns = dataLines
            .map((line) => firstColumnRE.exec(line))
            .filter((match) => match !== null)
            .map((match) => {
                if (match === null) {
                    throw new Error();
                }
                return match[0];
            });

        const wordRE = new RegExp(/[^\s.,;:|()\/]+(?![^\s.,;:|()\/]+\/)/g);
        const words: string[] = [];
        firstColumns
            .map((column) => {
                const matchList = column.match(wordRE);
                if (matchList === null) {
                    throw new Error("every first column should contain a word");
                }
                return matchList;
            })
            .forEach((matchList) => {
                words.push.apply(words, matchList);
            });
        const normalizedWords = words
            .map(normalizeWord);
        const withoutDups = new Array<string>();
        const known = new Set<string>();
        normalizedWords.forEach((word) => {
            if (!known.has(word)) {
                known.add(word);
                withoutDups.push(word);
            }
        });
        return {
            preamble,
            words: withoutDups,
        };
    });
}

function writeWordList(path: string, words: string[], preamble?: string): Promise<void> {
    const parts: string[] =
        preamble ?
            [preamble].concat(words) :
            words;
    const data = parts.join("\n");

    return pify(fs.writeFile)(path, data, {
        encoding: "utf8",
    });
}

function removeWords(
    words: string[],
    excludedWordsListPath: string)
    : Promise<string[]> {
    return pify(fs.readFile)(excludedWordsListPath, "utf8").then((data: string) => {
        const excludedWords = new Set<string>(
            data
                .split("\n")
                .map((word) => word.trim())
                .filter((word) => word.length === 0 || word[0] === "#"),
        );
        return words.filter((word) => !excludedWords.has(word));
    });
}

async function main(): Promise<void> {
    const cwd = process.cwd();
    const origPath = join(cwd, "derewo-v-ww-bll-320000g-2012-12-31-1.0.txt");
    const excludedWordsPath = join(cwd, "derewoExcluded.txt");
    const destPath = join(cwd, "derewoGrundformlisteClean.txt");

    const derewoData = await readDerewoGrundformList(origPath);
    const remainingWords = await removeWords(derewoData.words, excludedWordsPath);
    await writeWordList(destPath, derewoData.words, derewoData.preamble);
}

main();
