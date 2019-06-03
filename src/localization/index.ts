import * as React from "react";

import { Counter, Item, StudyPack } from "../redux";

export const VARIABLE_ALEC_DEITLOFF = 17;
export const VARIABLE_ICON_CREDIT_LINK = 18;
export const VARIABLE_FAVICON_CREDIT_LINK = 19;

export type CreditsPiece =
  | string
  | typeof VARIABLE_ALEC_DEITLOFF
  | typeof VARIABLE_ICON_CREDIT_LINK
  | typeof VARIABLE_FAVICON_CREDIT_LINK;

export default interface Localization {
  alecDeitloff: string;
  andSoForth: string;
  buttonIgnoreAnswer: string;
  buttonNextQuestion: string;
  counterItemsPrefix: (numCounters: number) => string;
  counterName: (counter: Counter) => string;
  countersDisplayHeader: (numCounters: number) => string;
  credits: ReadonlyArray<CreditsPiece>;
  furtherIrregulars: string;
  hereAreTheFirstXNumbers: (amountToDisplay: number) => string;
  highScoreEncouragements: ReadonlyArray<string>;
  irregularsWarning: (
    numIrregulars: number,
    highlightIrregular: (contents: string) => React.ReactNode
  ) => React.ReactNode[];
  irregularsWarningNoIrregulars: string;
  itemPlural: (item: Item) => string;
  itemSingular: (item: Item) => string;
  lowScoreEncouragements: ReadonlyArray<string>;
  resultColumnHeaderCounter: string;
  resultColumnHeaderRule: string;
  resultColumnHeaderStudyPack: string;
  resultColumnHeaderKanji: string;
  resultColumnHeaderHiragana: string;
  resultCorrectHeader: string;
  resultIncorrectHeader: string;
  resultSkippedHeader: string;
  resultTableIntro: string;
  resultsTableIrregularLabel: string;
  siteTagline: string;
  skippedQuestionResult: string;
  startQuiz: string;
  studyPackName: (studyPack: StudyPack) => string;
  studyPackSelectionHeader: string;
  studyPackSelectionSubheader: string;
  studyPackSize: (size: number) => string;
  submittedLabel: string;
  tsuNotice: string;
  tutorial: string;
  tutorialPage1: string;
  tutorialPage2: string;
  tutorialPage3: string;
  tutorialPage4: string;
  tutorialPage5: string;
  tutorialPage6: string;
  xOfYCorrect: (x: number, y: number) => string;
}
