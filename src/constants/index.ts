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

export { MONTH, UPLOAD_DIR_ADVERTISEMENTS, UPLOAD_URL_ADVERTISEMENTS, YEAR }
