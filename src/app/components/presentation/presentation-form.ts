import {Presentation} from '@interfaces/presentation'
import {GithubUser} from '@interfaces/github-user'
import {InputLabel} from '@elements/input'
import {builtIn} from '@utils/decorators'
import {Button} from '@elements/button'
import {values} from '@utils/iterators'
import {Form} from '@elements/form'
import {h} from '@utils/h'

@builtIn('form', 'cw-presentation-form')
export class PresentationForm extends Form<Presentation> {
  header = h('h2', {textContent: 'Presentation'})

  controls = {
    title: new InputLabel('Title', 'text', 'title').setRequired(true),
    github: new InputLabel('Github', 'text', 'github'),
    speaker: new InputLabel('Speaker name', 'text', 'name').setRequired(true),
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

    this.controls.github.onchange = async () => {
      if (this.github.value) {
        const user = await this.getFromGithub(this.github.value)
        this.controls.speaker.element.setValue(user.name)
        const company = user.company.split(',').slice(0, 2).join(', ')
        this.controls.company.element.setValue(company)
      }
    }
  }

  async getFromGithub(user: string): Promise<GithubUser> {
    const req = fetch(`https://api.github.com/users/${user}`)
    return req.then((res) => res.json())
  }
}
