import type {GridLayer, ImageLayer, PhotoLayer, TextLayer} from '@models'

export interface PresentationLayerSchema {
  title: TextLayer
  speaker: TextLayer
  role: TextLayer
  photo: PhotoLayer
  company?: TextLayer
}

export abstract class LayerSchema {
  abstract grid: GridLayer
  abstract logo: ImageLayer
  abstract background: ImageLayer
  abstract title: TextLayer
  abstract presentations: PresentationLayerSchema[]
  abstract sponsors: ImageLayer[]
  abstract devParana: ImageLayer
}
