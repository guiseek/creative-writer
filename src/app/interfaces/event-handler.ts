import {EventEmitter} from '@utils/event-emitter'
import {EventMap} from './event-map'

export abstract class EventHandler extends EventEmitter<EventMap> {}
