// global.d.ts
import { FormData as NodeFormData } from 'formdata-node'

declare global {
  var FormData: typeof NodeFormData
}

export {}
