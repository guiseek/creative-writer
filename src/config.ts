import type {Config, FormControl, LayerSchema} from '@interfaces'
import {GridLayer, ImageLayer, TextLayer} from '@models'
import {
  Input,
  Button,
  FieldSet,
  InputLabel,
  RadioLabel,
  SliderLabel,
  CheckboxLabel,
} from '@elements'

const width = 1080
const height = 1080

const grid = {
  x: 0,
  y: 0,
  w: width,
  h: height,
  tile: 12,
  active: true,
}

const background = {
  x: 0,
  y: 0,
  w: width,
  h: height,
}

const logo = {
  x: 50,
  y: 50,
  w: 128,
  h: 128,
}

const title = {
  x: 300,
  y: 60,
  w: width - 128 - 50,
  h: 128,
}

const sponsor = {
  x: 0,
  y: height - 180,
  w: 360,
  h: 180,
}

const devParana = {
  x: width - 360,
  y: height - 180,
  w: 360,
  h: 180,
}

const logos = [
  ['Admin', 'logos/admin.svg'],
  ['Agile', 'logos/agile.svg'],
  ['Avisos', 'logos/avisos.svg'],
  ['Curitiba', 'logos/curitiba.svg'],
  ['Delphi', 'logos/delphi.svg'],
  ['Geral', 'logos/geral.svg'],
  ['NodeJS', 'logos/nodejs.svg'],
  ['PHP', 'logos/php.svg'],
  ['Rust', 'logos/rust.svg'],
  ['TypeScript', 'logos/typescript.svg'],
  ['Vagas', 'logos/vagas.svg'],
]

const backgrounds = [
  ['Github', 'images/github-wall.svg'],
  ['Bermuda', 'images/bermuda-circle.svg'],
]

export const config: Config = {
  width,
  height,
  grid,
  logo,
  background,
  title,
  sponsor,
  devParana,
  backgrounds,
  logos,
}

export const layerSchema: LayerSchema = {
  grid: new GridLayer(
    config.grid.x,
    config.grid.y,
    config.grid.w,
    config.grid.h
  ),
  background: new ImageLayer(
    config.background.x,
    config.background.y,
    config.background.w,
    config.background.h
  ),
  logo: new ImageLayer(
    config.logo.x,
    config.logo.y,
    config.logo.w,
    config.logo.h
  ),
  title: new TextLayer(
    config.title.x,
    config.title.y,
    config.title.w,
    config.title.h
  ),
  presentations: [],
  sponsors: [],
  devParana: new ImageLayer(
    config.logo.x,
    config.logo.y,
    config.logo.w,
    config.logo.h
  ),
}

export const formControl: FormControl = {
  grid: new FieldSet('Grid'),
  title: new InputLabel('Title', 'text', 'title'),
  background: new FieldSet('Background'),
  logo: new FieldSet('Logo'),
  sponsor: {
    input: new Input('file', 'file', false),
    button: new Button('Select image'),
  },
  presentation: {
    add: new Button('Add presentation', 'button', () => {}, 'text'),
  },
  reset: new Button('Reset', 'reset'),
}

formControl.grid.add(
  new SliderLabel('Grid', 'grid', config.grid.tile),
  new CheckboxLabel('Active', 'gridActive', 'true', config.grid.active)
)

formControl.logo.add(
  ...config.logos.map(([text, value]) => {
    return new RadioLabel(text, 'logo', value)
  })
)

formControl.background.add(
  ...config.backgrounds.map(([text, value]) => {
    return new RadioLabel(text, 'background', value)
  })
)
