import {config, formControl, layerSchema, themes} from './config'
import {ThemeToggle} from '@components/theme'
import {font, EventEmitter} from '@utils'
import {Canvas, Sidenav} from '@elements'
import {load, set} from '@websqnl/di'
import {loadApp} from './app/app'
import {
  Config,
  Themes,
  LayerSchema,
  EventHandler,
  FormControl,
} from '@interfaces'
import './style.scss'

load(
  set(
    {
      ref: Config,
      use: config,
    },
    {
      ref: Canvas,
      use(config: Config) {
        return new Canvas(config.width, config.height)
      },
      dep: [Config],
    },
    {
      ref: Sidenav,
    },
    {
      ref: EventHandler,
      use: EventEmitter,
    },
    {
      ref: LayerSchema,
      use: layerSchema,
    },
    {
      ref: FormControl,
      use: formControl,
    },
    {
      ref: Themes,
      use: themes,
    },
    {
      ref: ThemeToggle,
      dep: [Themes],
    }
  )
)

font('Mukta', [200, 300, 400, 500, 600, 700, 800]).then(() => loadApp(app))
