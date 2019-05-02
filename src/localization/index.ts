export const VARIABLE_ALEC_DEITLOFF = 17;
export const VARIABLE_ICON_CREDIT_LINK = 18;

export type CreditsPiece =
  | string
  | typeof VARIABLE_ALEC_DEITLOFF
  | typeof VARIABLE_ICON_CREDIT_LINK;

export default interface Localization {
  alecDeitloff: string;
  countersDisplayHeader: string;
  credits: ReadonlyArray<CreditsPiece>;
  resultCorrectHeader: string;
  resultIncorrectHeader: string;
  resultSkippedHeader: string;
  siteTagline: string;
  skippedQuestionResult: string;
  startQuiz: string;
  studyPackSelectionHeader: string;
  studyPackSelectionSubheader: string;
  studyPackSize(size: number): string;
}
