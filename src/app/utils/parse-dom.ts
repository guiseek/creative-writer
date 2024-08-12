export const parseDOM = <T>(string: string, type: DOMParserSupportedType) => {
  const parser = new DOMParser()
  const document = parser.parseFromString(string, type)
  return document.firstElementChild as T
}
