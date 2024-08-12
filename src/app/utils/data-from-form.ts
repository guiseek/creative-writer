export const dataFromForm = <T extends object>(form: HTMLFormElement) => {
  return Object.fromEntries(new FormData(form).entries()) as T
}
