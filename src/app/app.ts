import {onSponsorInputChange, onFormChange, onSubmitPresentation} from '@events'
import {EventHandler, FormControl, LayerSchema, Schema} from '@interfaces'
import {Form, Canvas, Sidenav, Accordion} from '@elements'
import {PresentationForm} from '@components/presentation'
import {h, readDataFile} from '@utils'
import {config} from '../config'
import {use} from '@websqnl/di'

export const loadApp = (container: HTMLElement) => {
  const canvas = use(Canvas)

  const sidenav = use(Sidenav)

  const layer = use(LayerSchema)
  const control = use(FormControl)

  const emitter = use(EventHandler)

  const accordion = new Accordion()

  /**
   *  ___ _ __   ___  _ __  ___  ___  _ __
   * / __| '_ \ / _ \| '_ \/ __|/ _ \| '__|
   * \__ \ |_) | (_) | | | \__ \ (_) | |
   * |___/ .__/ \___/|_| |_|___/\___/|_|
   *     |_|
   */
  control.sponsor.input.onchange = () => {
    const [file] = control.sponsor.input.files ?? []
    emitter.emit('sponsorInputChange', file)
  }

  emitter.on('sponsorInputChange', onSponsorInputChange)

  control.sponsor.button.onclick = () => {
    control.sponsor.input.click()
  }

  const form = new Form<Schema>(() => {
    console.log(form.value);
    
    emitter.emit('formChange', form.value)
  })

  emitter.on('formChange', onFormChange)

  /**
   *                                 _        _   _
   *  _ __  _ __ ___  ___  ___ _ __ | |_ __ _| |_(_) ___  _ __
   * | '_ \| '__/ _ \/ __|/ _ \ '_ \| __/ _` | __| |/ _ \| '_ \
   * | |_) | | |  __/\__ \  __/ | | | || (_| | |_| | (_) | | | |
   * | .__/|_|  \___||___/\___|_| |_|\__\__,_|\__|_|\___/|_| |_|
   * |_|
   */

  control.presentation.add.onclick = () => {
    const form = new PresentationForm()
    accordion.add(`Presentation ${accordion.items.length + 1}`, form)

    form.onsubmit = (ev) => {
      ev.preventDefault()

      const photo = form.value.photo as any
      if (photo instanceof File) {
        readDataFile(photo).then(({data}) => {
          emitter.emit('submitPresentation', {...form.value, photo: data})
        })
      }
    }
  }

  emitter.on('submitPresentation', onSubmitPresentation)

  layer.grid.setSize(config.grid.tile).setOrder(10).render()

  layer.background.setDraggable(false).setSrc(form.value.logo).render()

  layer.logo.setOrder(4).setSrc('logo.svg').render()

  layer.title
    .setText(control.title.value)
    .setSize(78)
    .setColor('white')
    .render()

  canvas.add(layer.grid, layer.logo, layer.background, layer.title)

  form.append(
    control.background,
    control.logo,
    control.title,
    control.presentation.add,
    control.sponsor.button,
    accordion,
    control.grid
  )

  canvas.setGrid(Math.round(config.grid.w / config.grid.tile))

  sidenav.add(form)

  const main = h('main')

  main.append(canvas)
  container.append(main, sidenav)
}
