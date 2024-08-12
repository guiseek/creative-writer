import {ImageLayer} from '@models/image-layer'
import {Presentation} from './presentation'
import {Schema} from './schema'

export interface EventMap {
  sponsorInputChange: File
  sponsorLayerAdded: ImageLayer
  sponsorInputError: File

  formChange: Schema

  submitPresentation: Presentation
}
