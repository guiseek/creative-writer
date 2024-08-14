import {
  Presentation,
  PresentationSchema,
  SubmittedPresentation,
} from './presentation'
import {ImageLayer} from '@models/image-layer'
import {Schema} from './schema'

export interface EventMap {
  'sponsor.created': ImageLayer
  'sponsor.selected': File

  'presentation.created': PresentationSchema
  'presentation.handled': Presentation
  'presentation.submitted': SubmittedPresentation

  'form.updated': Schema
}
