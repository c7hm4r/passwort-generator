import * as fs from "fs";
import { join } from "path";
import pify = require("pify");
import seedrandom = require("seedrandom");

// The entropy/complexity/strength of the passwords in bits
const targetComplexityBits = 70;

// Size of the password list
const passwordChoiseLength = 50;

function readWordList(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const wordRE = new RegExp(/^[-a-z0-9]+$/);
            const words = data
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line.length > 0 && line[0] !== "#");
            words.forEach((word) => {
                const test = wordRE.test(word);
                if (!test) {
                    throw new Error("Does not match: " + word);
                }
            });
            const withoutDups = new Array<string>();
            const known = new Set<string>();
            words.forEach((word) => {
                if (!known.has(word)) {
                    known.add(word);
                    withoutDups.push(word);
                }
            });
            resolve(withoutDups);
        });
    });
}

function getRelativeWordFrequency(word: string, rank: number): number {
    return 1 / Math.sqrt(word.length + 1) / (25 + rank);
}

function informationOfWord(frequency: number, totalFrequency: number): number {
    return -Math.log2(frequency / totalFrequency);
}

/**
 * Searches through an ordered list of elements.
 *
 * @param {number} keys ascending ordered list of keys
 * @param {number} query key to search
 * @returns {number} index of last key lower than lookup or -1 if there is none
 */
function binarySearch(keys: number[], query: number): number {
    // every item below minIndex is assumed to be lower than query
    let minIndex = 0;
    // every item starting from maxIndex is assumed to be larger than or equal to query
    let maxIndex = keys.length;
    while (minIndex < maxIndex) {
        const index = Math.floor((minIndex + maxIndex) / 2);
        const key = keys[index];
        if (key < query) {
            minIndex = index + 1;
        } else {
            maxIndex = index;
        }
    }
    return minIndex - 1;
}

function accumulate(values: number[]): number[] {
    const count = values.length;
    const accumulated = new Array(count + 1);
    let sum = 0;
    accumulated[0] = 0;
    for (let i = 0; i < count; i++) {
        sum += values[i];
        accumulated[i + 1] = sum;
    }
    return accumulated;
}

interface IWordConfig {
    word: string;
    frequency: number;
}

class PasswordGenerator {
    private words: IWordConfig[];
    private accumulatedFrequencies: number[];
    private frequencySum: number;

    constructor(words: IWordConfig[]) {
        this.words = words.sort((a, b) => a.frequency - b.frequency);
        this.accumulatedFrequencies =
            accumulate(this.words.map((w) => w.frequency));
        this.frequencySum = this.accumulatedFrequencies[words.length];
    }

    public generatePassword(rng: seedrandom.prng, minBits: number): string {
        const passwordWords = [];
        let currentBitCount = 0;
        while (currentBitCount < minBits) {
            const randomPosition = rng.quick() * this.frequencySum;
            const nextFrequencyIndex = Math.min(
                Math.max(
                    binarySearch(this.accumulatedFrequencies, randomPosition),
                    0),
                this.words.length - 1);
            currentBitCount += informationOfWord(
                this.words[nextFrequencyIndex].frequency,
                this.frequencySum);
            const nextWord = this.words[nextFrequencyIndex].word;
            passwordWords.push(nextWord);
        }
        return passwordWords.join(" ");
    }
}

function memorableNumbers(): number[] {
    const result = [];
    for (let i = 0; i < 20; i++) {
        result.push(i);
    }
    for (let i = 20; i < 100; i += 5) {
        result.push(i);
    }
    for (let i = 100; i < 200; i += 10) {
        result.push(i);
    }
    for (let i = 200; i < 1000; i += 50) {
        result.push(i);
    }
    for (let i = 1000; i < 2000; i += 100) {
        result.push(i);
    }
    for (let i = 1000; i < 10000; i += 500) {
        result.push(i);
    }
    return result;
}

function memorableNumberConfigs(): IWordConfig[] {
    const maxFrequency = getRelativeWordFrequency("zahl", 20);
    return memorableNumbers().map((num) => ({
        frequency: maxFrequency / Math.log2(Math.max(2, num)),
        word: "" + num,
    }));
}

function mapFrequencyFunction(
    getFrequency: (word: string, rank: number) => number,
    words: string[],
): IWordConfig[] {
    return words.map((word, rank) => ({
        frequency: getFrequency(word, rank),
        word,
    }));
}

async function main(): Promise<void> {
    const random = seedrandom();
    const listPath = join(process.cwd(), "derewoGrundformlisteClean.txt");

    const textWordList = mapFrequencyFunction(
        getRelativeWordFrequency,
        await readWordList(listPath));
    const numberList = memorableNumberConfigs();
    const passwordGenerator = new PasswordGenerator(textWordList.concat(numberList));

    for (let i = 0; i < passwordChoiseLength; i++) {
        // Why not `singlePasswordStrength =
        //      targetComplexityBits + Math.log2(numberList)`?
        // Because the set of passwords which can be generated with some `minBits` value
        // does not include some of the passwords generated with a lower `minBits` value.
        // As the average entropy should be higher than `minBits`,
        // there is probably no significant problem.
        const singlePasswordStrength = targetComplexityBits + Math.log2(i + 1);
        // tslint:disable-next-line:no-console
        console.log(passwordGenerator.generatePassword(random, singlePasswordStrength));
    }
}

main();
