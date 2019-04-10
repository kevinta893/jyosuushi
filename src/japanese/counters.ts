import { memoize } from "lodash";
import { getLeadingConsonant } from "./hepburn";
import { Gyou, HIRAGANA } from "./kana";
import {
  breakDownNumber,
  conjugateNumber,
  FinalNumberChanges,
  HYAKU,
  JYUU
} from "./numbers";
import { Tag } from "./tags";
import {
  castAwayTaggable,
  JapaneseWord,
  permutateTaggableWords,
  TaggableJapaneseWord,
  uniqueWords
} from "./words";

const COUNTER_K_P_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  6: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }]
  ],
  [HYAKU]: [[{ type: "trailing-small-tsu" }]]
};

const COUNTER_S_T_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }]
  ]
};

const COUNTER_H_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  6: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }]
  ],
  [HYAKU]: [[{ type: "trailing-small-tsu" }]]
};

const COUNTER_W_CHANGES: FinalNumberChanges = {
  4: [
    [
      {
        type: "replace",
        kana: "よ",
        kanji: "四"
      },
      { type: "tag", tag: "counter-wa-4-yo" }
    ],
    [
      {
        type: "replace",
        kana: "よん",
        kanji: "四"
      }
    ]
  ],
  6: [
    [
      {
        type: "trailing-small-tsu"
      },
      { type: "tag", tag: "counter-wa-6-8-small-tsu" }
    ],
    [
      {
        type: "replace",
        kana: "ろく",
        kanji: "六"
      },
      {
        type: "tag",
        tag: "counter-wa-6-8-full-num"
      }
    ]
  ],
  8: [
    [
      { type: "trailing-small-tsu" },
      { type: "tag", tag: "counter-wa-6-8-small-tsu" }
    ],
    [
      {
        type: "replace",
        kana: "はち",
        kanji: "八"
      },
      {
        type: "tag",
        tag: "counter-wa-6-8-full-num"
      }
    ]
  ],
  [JYUU]: [[{ type: "replace", kana: "じっ", kanji: "十" }]]
};

interface CounterChange {
  gyou?: Gyou;
  tag?: Tag;
}

const COUNTER_BA_GYOU: Readonly<CounterChange> = {
  gyou: "ba"
};

const COUNTER_PA_GYOU: Readonly<CounterChange> = {
  gyou: "pa"
};

function conjugateNumberAndCounterInternal(
  amount: number,
  counter: JapaneseWord
): ReadonlyArray<JapaneseWord> {
  const counterFirstConsonant = getLeadingConsonant(counter.kana);
  const amountBreakdown = breakDownNumber(amount);
  let numberChanges: FinalNumberChanges | undefined;
  let counterChanges: CounterChange[] | undefined;
  switch (counterFirstConsonant) {
    case "k":
    case "p": {
      numberChanges = COUNTER_K_P_CHANGES;
      break;
    }
    case "s":
    case "t": {
      numberChanges = COUNTER_S_T_CHANGES;
      break;
    }
    case "h":
    case "f": {
      numberChanges = COUNTER_H_CHANGES;

      switch (amountBreakdown.lowestUnit) {
        case "man":
        case "sen": {
          counterChanges =
            counterFirstConsonant === "h"
              ? [COUNTER_BA_GYOU]
              : [COUNTER_PA_GYOU];
          break;
        }
        case "hyaku":
        case "jyuu": {
          counterChanges = [COUNTER_PA_GYOU];
          break;
        }
        case "solo": {
          switch (amountBreakdown.solo) {
            case 1:
            case 6:
            case 8: {
              counterChanges = [COUNTER_PA_GYOU];
              break;
            }
            case 3: {
              counterChanges =
                counterFirstConsonant === "h"
                  ? [COUNTER_BA_GYOU]
                  : [COUNTER_PA_GYOU];
              break;
            }
            case 4: {
              counterChanges = [{}, COUNTER_PA_GYOU];
              break;
            }
          }

          break;
        }
      }
      break;
    }
    case "w": {
      numberChanges = COUNTER_W_CHANGES;

      switch (amountBreakdown.lowestUnit) {
        case "jyuu": {
          counterChanges = [COUNTER_PA_GYOU];
          break;
        }
        case "solo": {
          switch (amountBreakdown.solo) {
            case 3: {
              counterChanges = [COUNTER_BA_GYOU];
              break;
            }
            case 4: {
              counterChanges = [{}, { gyou: "ba", tag: "counter-wa-4-ba" }];
              break;
            }
            case 6:
            case 8: {
              counterChanges = [
                { tag: "counter-wa-6-8-wa" },
                { gyou: "pa", tag: "counter-wa-6-8-pa" }
              ];
              break;
            }
          }
          break;
        }
      }
      break;
    }
  }

  let finalizedCounter: TaggableJapaneseWord[];
  if (counterChanges) {
    const firstKana = counter.kana[0];
    const followingKana = counter.kana.slice(1);
    finalizedCounter = counterChanges.map(({ gyou, tag }) => ({
      kana: gyou
        ? HIRAGANA.changeGyou(firstKana, gyou) + followingKana
        : counter.kana,
      kanji: counter.kanji,
      tags: tag ? new Set([tag]) : new Set()
    }));
  } else {
    finalizedCounter = [{ ...counter, tags: new Set() }];
  }

  const words = permutateTaggableWords([
    conjugateNumber(amount, numberChanges),
    finalizedCounter
  ]);
  return uniqueWords(castAwayTaggable(words));
}

export const conjugateNumberAndCounter: (
  amount: number,
  counter: JapaneseWord
) => ReadonlyArray<JapaneseWord> = memoize(
  conjugateNumberAndCounterInternal,
  (amount: number, counter: JapaneseWord) =>
    [amount, counter.kana, counter.kanji].join("-")
);
