import { Locale } from '../../src/@core/domain/entity/locale-entity'
import { LocaleProps } from '../../src/@core/domain/schemas/locale-schema'

let input: LocaleProps = {
  name: 'title'
}

test('Deve ser possivel cadastrar um local', () => {
  const res = Locale.create(input)
  expect(res).toBeTruthy()
  expect(res.id).toBeTruthy()
  expect(res.name).toBe(input.name)
})

test('Não deve ser possivel cadastrar um local com nome vazio', () => {
  try {
    Locale.create({
      name: ''
    })
  } catch (error: any) {
    expect(error.errors).toMatchObject({
      name: ['Você dever informar um local de evento']
    })
  }
})
