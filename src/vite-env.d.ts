/// <reference types="vite/client" />

declare const app: HTMLDivElement

declare module '*.html' {
  const content: HTMLCollection;
  export default content;
}