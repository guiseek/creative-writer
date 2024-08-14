import {
  Input,
  Button,
  FieldSet,
  InputLabel,
  SliderLabel,
  CheckboxLabel,
} from '@elements'

export interface FormGridControl {
  size: SliderLabel
  active: CheckboxLabel
}

export interface FormSponsorControl {
  input: Input<File>
  button: Button
}

export interface FormPresentationControl {
  add: Button
}

export abstract class FormControl {
  abstract grid: FieldSet
  abstract title: InputLabel<string>
  abstract date: InputLabel<string>
  abstract time: InputLabel<string>
  abstract location: InputLabel<string>
  abstract background: FieldSet
  abstract logo: FieldSet
  abstract sponsor: FormSponsorControl
  abstract presentation: FormPresentationControl
  abstract reset: Button
}
