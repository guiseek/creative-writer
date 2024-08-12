import {Config, LayerSchema, EventHandler, FormControl} from '@interfaces'
import {config, formControl, layerSchema} from './config'
import {font, EventEmitter, entries} from '@utils'
import {Canvas, Sidenav} from '@elements'
import {load, set} from '@websqnl/di'
import {loadApp} from './app/app'
import './style.scss'

// const moduleStrings = import.meta.glob('../public/**/*.svg', {
//   query: '?raw',
//   import: 'default',
// })
// const moduleUrls = import.meta.glob('../public/**/*.svg', {
//   query: '?url',
//   import: 'default',
// })

const modules = import.meta.glob('./**/*.js', {
  import: '',
  eager: true,
})

// console.log(moduleStrings);
for (const path of entries(modules)) {
  console.log(path);

}
// console.log(moduleUrls);


// const canvas = new Canvas(1080, 1080)

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

font('Mukta', [200, 300, 400, 500, 600, 700, 800]).then(() => {
  console.log(app)

  loadApp(app)
})
