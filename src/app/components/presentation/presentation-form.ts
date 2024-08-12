import {Presentation} from '@interfaces/presentation'
import {InputLabel} from '@elements/input-label'
import {builtIn} from '@utils/decorators'
import {Button} from '@elements/button'
import {values} from '@utils/values'
import {Form} from '@elements/form'
import {h} from '@utils/h'

@builtIn('form', 'cw-presentation-form')
export class PresentationForm extends Form<Presentation> {
  header = h('h2', {textContent: 'Presentation'})

  controls = {
    title: new InputLabel('Title', 'text', 'title').setRequired(true),
    speaker: new InputLabel('Speaker', 'text', 'speaker').setRequired(true),
    role: new InputLabel('Role', 'text', 'role').setRequired(true),
    photo: new InputLabel('Photo', 'file', 'photo').setRequired(true),
    company: new InputLabel('Company', 'text', 'company'),
  }

  actions = {
    // reset: new Button('Reset', 'reset'),
    submit: new Button('Submit', 'submit'),
  }

  connectedCallback() {
    this.controls.title.setAttribute('value', 'Palestra')
    this.controls.speaker.setAttribute('value', 'Guilherme')
    this.controls.role.setAttribute('value', 'Arquiteto Web')
    this.append(...values(this.controls), ...values(this.actions))
  }
}
