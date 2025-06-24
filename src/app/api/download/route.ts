import { readFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const image = searchParams.get('image')
    const ext = image?.split('.').pop()

    if (!image && ['png', 'jpg', 'jpeg'].includes(ext!)) {
      throw new Error('Arquivo não suportado')
    }

    // process.cwd() is the root of the Next.js app
    const buffer = await readFile(path.join(process.cwd(), 'public', image!))

    //  set the headers to tell the browser to download the file
    const headers = new Headers()

    // remember to change the filename `test.pdf` to whatever you want the downloaded file called
    headers.append('Content-Disposition', 'attachment; filename=' + image)
    headers.append('Content-Type', 'application/jpeg')

    return new NextResponse(buffer, {
      headers
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Erro ao processar upload.' },
      { status: 400 }
    )
  }
}
