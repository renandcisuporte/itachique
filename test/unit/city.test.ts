import { City } from '../../src/@core/domain/entity/city-entity'
import { CityProps } from '../../src/@core/domain/schemas/city-schema'

let input: CityProps = {
  city: 'title'
}

test('Deve ser possivel cadastrar uma cidade', () => {
  const res = City.create(input)
  expect(res).toBeTruthy()
  expect(res.id).toBeTruthy()
  expect(res.city).toBe(input.city)
})

test('Não deve ser possivel cadastrar uma cidade com nome vazio', () => {
  try {
    City.create({ city: '' })
  } catch (error: any) {
    expect(error.errors).toMatchObject({
      city: ['Você dever informar a cidade do evento']
    })
  }
})
