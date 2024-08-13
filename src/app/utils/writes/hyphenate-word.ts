export function hyphenateWord(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  word: string,
  maxWidth: number
): string {
  let hyphenatedWord = word;

  for (let i = 0; i < word.length; i++) {
    const subString = hyphenatedWord.slice(0, i + 1);
    const widthWithHyphen = ctx.measureText(subString + "-").width;

    if (widthWithHyphen > maxWidth) {
      return subString + "-";
    }
  }

  return hyphenatedWord;
}
