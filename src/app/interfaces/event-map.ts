import {Presentation, SubmittedPresentation} from './presentation'
import {PresentationLayer} from '@models/presentation-layer'
import {ImageLayer} from '@models/image-layer'
import {Schema} from './schema'

export interface EventMap {
  'sponsor.created': ImageLayer
  'sponsor.selected': File

  'presentation.created': PresentationLayer
  'presentation.handled': Presentation
  'presentation.submitted': SubmittedPresentation

  'form.updated': Schema
}
