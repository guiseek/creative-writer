import {DetailsLayer, GridLayer, ImageLayer, TextLayer} from '@models'
import type {Config, FormControl, LayerSchema} from '@interfaces'
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
const tile = 6

const grid = {
  x: 0,
  y: 0,
  w: width,
  h: height,
  tile,
  active: false,
}

const background = {
  x: 0,
  y: 0,
  w: width,
  h: height,
}

const logo = {
  x: 30,
  y: 30,
  w: 160,
  h: 160,
}

const title = {
  x: 220,
  y: 20,
  w: width - 180,
  h: 180,
}

const presentation = {
  x: 0,
  y: 180,
  w: width,
  h: 180 * 3,
}

const date = {
  x: 0,
  y: height - 360,
  w: 270,
  h: 180,
}

const time = {
  x: date.x + date.w,
  y: date.y,
  w: 180,
  h: date.h,
}

const location = {
  x: time.x + time.w,
  y: time.y,
  w: width - time.x - time.w,
  h: time.h,
}

const details = {
  x: 0,
  y: height - 360,
  w: width,
  h: 180,
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
  details,
  date,
  time,
  location,
  presentation,
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
  details: new DetailsLayer(
    config.details.x,
    config.details.y,
    config.details.w,
    config.details.h
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
  date: new InputLabel('Date', 'date', 'date'),
  time: new InputLabel('Time', 'time', 'time'),
  location: new InputLabel('Location', 'text', 'location'),
  background: new FieldSet('Background'),
  logo: new FieldSet('Logo'),
  sponsor: {
    input: new Input('file', 'file', false),
    button: new Button('Add sponsor'),
  },
  presentation: {
    add: new Button('Add presentation', 'button'),
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
