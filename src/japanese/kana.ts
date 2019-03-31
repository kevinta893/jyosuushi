/* tslint:disable object-literal-sort-keys */

export interface ConversionChart {
  [romaji: string]: string;
}

export class KanaDefinition {
  public constructor(
    public readonly codepointStart: number,
    public readonly codepointEnd: number,
    public readonly conversionChart: ConversionChart
  ) {}

  public isOnlyKana(str: string): boolean {
    for (let index = 0; index < str.length; ++index) {
      const code = str.charCodeAt(index);
      if (code < this.codepointStart || code > this.codepointEnd) {
        return false;
      }
    }

    return true;
  }
}

export const Hiragana = new KanaDefinition(0x3041, 0x309f, {
  a: "あ",
  i: "い",
  u: "う",
  e: "え",
  o: "お",
  la: "ぁ",
  li: "ぃ",
  lu: "ぅ",
  le: "ぇ",
  lo: "ぉ",
  ka: "か",
  ki: "き",
  ku: "く",
  ke: "け",
  ko: "こ",
  kya: "きゃ",
  kyi: "きぃ",
  kyu: "きゅ",
  kyo: "きょ",
  kye: "きぇ",
  sa: "さ",
  si: "し",
  shi: "し",
  su: "す",
  se: "せ",
  so: "そ",
  sha: "しゃ",
  sya: "しゃ",
  syi: "しぃ",
  shu: "しゅ",
  syu: "しゅ",
  sho: "しょ",
  syo: "しょ",
  she: "しぇ",
  sye: "しぇ",
  ta: "た",
  ti: "ち",
  chi: "ち",
  tu: "つ",
  tsu: "つ",
  te: "て",
  to: "と",
  cha: "ちゃ",
  tya: "ちゃ",
  tyi: "ちぃ",
  tsi: "つぃ",
  chu: "ちゅ",
  tyu: "ちゅ",
  cho: "ちょ",
  tyo: "ちょ",
  che: "ちぇ",
  tye: "ちぇ",
  na: "な",
  ni: "に",
  nu: "ぬ",
  ne: "ね",
  no: "の",
  nya: "にゃ",
  nyi: "にぃ",
  nyu: "にゅ",
  nye: "にぇ",
  nyo: "にょ",
  ha: "は",
  hi: "ひ",
  hu: "ふ",
  he: "へ",
  ho: "ほ",
  hya: "ひゃ",
  hyi: "ひぃ",
  hyu: "ひゅ",
  hye: "ひぇ",
  hyo: "ひょ",
  fa: "ふぁ",
  fi: "ふぃ",
  fu: "ふ",
  fe: "ふぇ",
  fo: "ふぉ",
  fya: "ふゃ",
  fyi: "ふぃ",
  fyu: "ふゅ",
  fye: "ふぇ",
  fyo: "ふょ",
  ma: "ま",
  mi: "み",
  mu: "む",
  me: "め",
  mo: "も",
  mya: "みゃ",
  myi: "みぃ",
  myu: "みゅ",
  mye: "みぇ",
  myo: "みょ",
  ya: "や",
  yi: "い",
  yu: "ゆ",
  ye: "いぇ",
  yo: "よ",
  ra: "ら",
  ri: "り",
  ru: "る",
  re: "れ",
  ro: "ろ",
  rya: "りゃ",
  ryi: "りぃ",
  ryu: "りゅ",
  rye: "りぇ",
  ryo: "りょ",
  lya: "りゃ",
  lyi: "りぃ",
  lyu: "りゅ",
  lye: "りぇ",
  lyo: "りょ",
  wa: "わ",
  wi: "うぃ",
  wu: "う",
  we: "うぇ",
  wo: "を",
  wya: "うゃ",
  wyi: "ゐ",
  wyu: "うゅ",
  wye: "ゑ",
  wyo: "うょ",
  da: "だ",
  di: "ぢ",
  du: "づ",
  de: "で",
  do: "ど",
  dya: "ぢゃ",
  dyi: "ぢぃ",
  dyu: "ぢゅ",
  dye: "ぢぇ",
  dyo: "ぢょ",
  pa: "ぱ",
  pi: "ぴ",
  pu: "ぷ",
  pe: "ぺ",
  po: "ぽ",
  pya: "ぴゃ",
  pyi: "ぴぃ",
  pyu: "ぴゅ",
  pye: "ぴぇ",
  pyo: "ぴょ",
  ga: "が",
  gi: "ぎ",
  gu: "ぐ",
  ge: "げ",
  go: "ご",
  gya: "ぎゃ",
  gyi: "ぎぃ",
  gyu: "ぎゅ",
  gye: "ぎぇ",
  gyo: "ぎょ",
  ja: "じゃ",
  ji: "じ",
  ju: "じゅ",
  je: "じぇ",
  jo: "じょ",
  jya: "じゃ",
  jyi: "じぃ",
  jyu: "じゅ",
  jye: "じぇ",
  jyo: "じょ",
  za: "ざ",
  zi: "じ",
  zu: "ず",
  ze: "ぜ",
  zo: "ぞ",
  zya: "じゃ",
  zyi: "じぃ",
  zyu: "じゅ",
  zye: "じぇ",
  zyo: "じょ",
  va: "ヴぁ",
  vi: "ヴぃ",
  vu: "ヴ",
  ve: "ヴぇ",
  vo: "ヴぉ",
  vya: "ヴゃ",
  vyu: "ヴゅ",
  vye: "ヴぃぇ",
  vyo: "ヴょ",
  ba: "ば",
  bi: "び",
  bu: "ぶ",
  be: "べ",
  bo: "ぼ",
  bya: "びゃ",
  byi: "びぃ",
  byu: "びゅ",
  bye: "びぇ",
  byo: "びょ",
  xa: "ぁ",
  xi: "ぃ",
  xu: "ぅ",
  xe: "ぇ",
  xo: "ぉ",
  xya: "ゃ",
  xyi: "ぃ",
  xyu: "ゅ",
  xye: "ぇ",
  xyo: "ょ",
  rr: "っr",
  tt: "っt",
  yy: "っy",
  pp: "っp",
  ss: "っs",
  dd: "っd",
  ff: "っf",
  gg: "っg",
  hh: "っh",
  jj: "っj",
  kk: "っk",
  ll: "っl",
  zz: "っz",
  xx: "っx",
  cc: "っc",
  vv: "っv",
  bb: "っb",
  ww: "っw",
  nn: "ん",
  mm: "っm",
  nq: "んq",
  nw: "んw",
  nr: "んr",
  nt: "んt",
  np: "んp",
  ns: "んs",
  nd: "んd",
  nf: "んf",
  ng: "んg",
  nh: "んh",
  nj: "んj",
  nk: "んk",
  nl: "んl",
  nz: "んz",
  nx: "んx",
  nc: "んc",
  nv: "んv",
  nb: "んb",
  nm: "んm",
  "1": "１",
  "2": "２",
  "3": "３",
  "4": "４",
  "5": "５",
  "6": "６",
  "7": "７",
  "8": "８",
  "9": "９",
  "0": "０",
  " ": "　",
  "-": "ー",
  _: "＿",
  ".": "。",
  ",": "、",
  ":": "：",
  ";": "；",
  "'": "’",
  "*": "＊",
  "<": "＜",
  ">": "＞",
  "|": "｜",
  "+": "＋",
  "!": "！",
  '"': "”",
  "#": "＃",
  "%": "％",
  "&": "＆",
  "(": "（",
  ")": "）",
  "=": "＝",
  "?": "？",
  "@": "＠",
  $: "＄",
  "¥": "￥",
  "{": "｛",
  "}": "｝",
  "[": "「",
  "]": "」",
  "/": "／",
  "\\": "＼",
  n1: "ん１",
  n2: "ん２",
  n3: "ん３",
  n4: "ん４",
  n5: "ん５",
  n6: "ん６",
  n7: "ん７",
  n8: "ん８",
  n9: "ん９",
  n0: "ん０",
  "n ": "ん　",
  "n-": "んー",
  n_: "ん＿",
  "n.": "ん。",
  "n,": "ん、",
  "n:": "ん：",
  "n;": "ん；",
  "n'": "ん’",
  "n*": "ん＊",
  "n<": "ん＜",
  "n>": "ん＞",
  "n|": "ん｜",
  "n£": "ん£",
  "n€": "ん€",
  "n¡": "ん¡",
  "n+": "ん＋",
  "n!": "ん！",
  'n"': "ん”",
  "n#": "ん＃",
  "n%": "ん％",
  "n&": "ん＆",
  "n(": "ん（",
  "n)": "ん）",
  "n=": "ん＝",
  "n?": "ん？",
  "n@": "ん＠",
  n$: "ん＄",
  "n¥": "ん￥",
  "n{": "ん｛",
  "n}": "ん｝",
  "n[": "ん「",
  "n]": "ん」",
  "n/": "ん／",
  "n\\": "ん＼",
  nå: "んå",
  nä: "んä",
  nö: "んö",
  nø: "んø",
  næ: "んæ"
});

const CODEPOINT_KATAKANA_FIRST = 0x30a1;
const CODEPOINT_KATAKANA_LAST = 0x30ff;
const DELTA_HIRAGANA_TO_KATAKANA =
  CODEPOINT_KATAKANA_FIRST - Hiragana.codepointStart;

const katakanaConversionChart: ConversionChart = Object.keys(
  Hiragana.conversionChart
).reduce((katakana: ConversionChart, romaji: string) => {
  const characters: string[] = [];
  const hiragana = Hiragana.conversionChart[romaji];
  for (let index = 0; index < hiragana.length; ++index) {
    const code = hiragana.charCodeAt(index);
    if (code >= Hiragana.codepointStart && code <= Hiragana.codepointEnd) {
      characters.push(String.fromCharCode(code + DELTA_HIRAGANA_TO_KATAKANA));
    } else {
      characters.push(hiragana[index]);
    }
  }

  katakana[romaji] = characters.join();
  return katakana;
}, {});

export const Katakana = new KanaDefinition(
  CODEPOINT_KATAKANA_FIRST,
  CODEPOINT_KATAKANA_LAST,
  katakanaConversionChart
);

export function getAsHiragana(kana: string): string {
  const characters: string[] = [];
  for (let index = 0; index < kana.length; ++index) {
    const codepoint = kana.codePointAt(index)!;
    if (
      codepoint >= Hiragana.codepointStart &&
      codepoint <= Hiragana.codepointEnd
    ) {
      characters.push(kana[index]);
    } else if (
      codepoint >= Katakana.codepointStart &&
      codepoint <= Katakana.codepointEnd
    ) {
      characters.push(
        String.fromCharCode(codepoint - DELTA_HIRAGANA_TO_KATAKANA)
      );
    } else {
      throw new Error(`'${kana[index]}' is not kana!`);
    }
  }

  return characters.join("");
}
