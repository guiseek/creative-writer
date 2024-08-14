import type {GridLayer, ImageLayer, TextLayer} from '@models'
import type {PresentationSchema} from './presentation'

export abstract class LayerSchema {
  abstract grid: GridLayer
  abstract logo: ImageLayer
  abstract background: ImageLayer
  abstract title: TextLayer
  abstract presentations: PresentationSchema[]
  abstract sponsors: ImageLayer[]
  abstract devParana: ImageLayer
}
