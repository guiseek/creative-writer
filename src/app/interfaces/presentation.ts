import {PhotoLayer} from '@models/photo-layer'
import {TextLayer} from '@models/text-layer'
import {WordLayer} from '@models/word-layer'
export interface SubmittedPresentation {
  name: string
  role: string
  company?: string
  title: string
  photo?: File
  photoUrl?: string
}

export interface Presentation {
  title: string
  name: string
  role: string
  company?: string
  photo: string
}

export interface PresentationSchema {
  title: TextLayer
  speaker: WordLayer
  // role: WordLayer
  photo: PhotoLayer
  company?: WordLayer
}
