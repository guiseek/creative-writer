import {appendWord} from './append-word'

export function wrapText(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = []
  const words = text.split(' ')

  let currentLine = ''

  for (const word of words) {
    const newLine = appendWord(ctx, currentLine, word, maxWidth)

    if (newLine) {
      lines.push(currentLine)
      currentLine = newLine
    } else {
      currentLine += (currentLine ? ' ' : '') + word
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}
