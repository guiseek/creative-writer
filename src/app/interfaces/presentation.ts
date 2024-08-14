import {PhotoLayer} from '@models/photo-layer'
import {WordLayer} from '@models/word-layer'

export interface SubmitedSpeaker {
  name: string
  role: string
  company?: string
}

export interface SubmittedPresentation extends SubmitedSpeaker {
  title: string
  photo: File
}

export interface Presentation extends SubmitedSpeaker {
  title: string
  photo: string
}

export interface PresentationSchema {
  title: WordLayer
  speaker: WordLayer
  role: WordLayer
  photo: PhotoLayer
  company?: WordLayer
}
