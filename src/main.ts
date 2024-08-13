import {Config, LayerSchema, EventHandler, FormControl} from '@interfaces'
import {config, formControl, layerSchema} from './config'
import {font, EventEmitter} from '@utils'
import {Canvas, Sidenav} from '@elements'
import {load, set} from '@websqnl/di'
import {loadApp} from './app/app'
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
    }
  )
)

font('Mukta', [200, 300, 400, 500, 600, 700, 800]).then(() => loadApp(app))
