import {hyphenateWord} from './hyphenate-word'

export function appendWord(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  line: string,
  word: string,
  maxWidth: number,
): string | null {
  const testLine = line + (line ? ' ' : '') + word
  const testWidth = ctx.measureText(testLine).width

  if (testWidth > maxWidth) {
    if (ctx.measureText(word).width > maxWidth) {
      return hyphenateWord(ctx, word, maxWidth)
    }
    return word
  }

  return null
}
