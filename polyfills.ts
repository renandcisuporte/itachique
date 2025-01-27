import { FormData as NodeFormData } from 'formdata-node'

// Verifica se `FormData` já está definido globalmente para evitar conflitos
if (typeof global.FormData === 'undefined') {
  global.FormData = NodeFormData as unknown as typeof FormData
}
