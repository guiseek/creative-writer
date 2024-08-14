import {SwitchLabel} from '@elements/switch'
import {Themes} from '@interfaces/themes'
import {builtIn} from '@utils/decorators'

type Theme = 'dark' | 'light'

const capitalize = (value: string) => {
  return value.slice(0, 1).toUpperCase() + value.slice(1)
}

@builtIn('label', 'cw-theme-toggle')
export class ThemeToggle extends SwitchLabel {
  constructor(private themes: Themes) {
    super('Theme', 'theme', ' true')
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('cw-theme-toggle')

    this.element.oninput = () => {
      if (this.element.checked) {
        this.setCurrent('dark')
      } else {
        this.setCurrent('light')
      }
    }

    this.setCurrent(this.current)
  }

  get current() {
    return (localStorage.getItem('theme') ?? 'light') as Theme
  }

  setCurrent(theme: Theme) {
    if (theme === 'dark') this.element.checked = true
    this.text.textContent = capitalize(theme)
    localStorage.setItem('theme', theme)
    this.#setProperties(theme)
  }

  #setProperties(key: Theme) {
    const theme = this.themes[key]
    document.documentElement.style.colorScheme = key
    document.documentElement.style.setProperty(
      `--cw-primary-rgb`,
      theme.primary.join(',')
    )
    document.documentElement.style.setProperty(
      `--cw-onprimary-rgb`,
      theme.onPrimary.join(',')
    )
    document.documentElement.style.setProperty(
      `--cw-surface-rgb`,
      theme.surface.join(',')
    )
    document.documentElement.style.setProperty(
      `--cw-onsurface-rgb`,
      theme.onSurface.join(',')
    )
  }
}
