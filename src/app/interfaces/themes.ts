interface Theme {
  primary: [number, number, number]
  onPrimary: [number, number, number]
  surface: [number, number, number]
  onSurface: [number, number, number]
}

export abstract class Themes {
  abstract light: Theme
  abstract dark: Theme
}
