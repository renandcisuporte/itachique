import path from 'path'

const date = new Date()
const test = date.toISOString().split('T')[0]
const [YEAR, MONTH] = test.split('-')

const UPLOAD_URL_ADVERTISEMENTS = [
  'advertisements',
  String(YEAR),
  String(MONTH)
].join('/')
const UPLOAD_DIR_ADVERTISEMENTS = path.join(
  process.cwd(),
  'public',
  'advertisements',
  String(YEAR),
  String(MONTH)
)

// Diretório onde os arquivos serão armazenados
const UPLOAD_DIR_UPLOADS = path.join(
  process.cwd(),
  'public',
  'uploads',
  String(YEAR),
  String(MONTH)
)
const UPLOAD_URL_UPLOADS = ['uploads', String(YEAR), String(MONTH)].join('/')

export {
  MONTH,
  UPLOAD_DIR_ADVERTISEMENTS,
  UPLOAD_DIR_UPLOADS,
  UPLOAD_URL_ADVERTISEMENTS,
  UPLOAD_URL_UPLOADS,
  YEAR
}
