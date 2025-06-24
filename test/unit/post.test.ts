import { Post } from '../../src/@core/domain/entity/post-entity'
import { PostProps } from '../../src/@core/domain/schemas/post-schema'

let input: PostProps = {
  title: 'title',
  date: new Date(),
  localeText: 'localeText',
  localeId: 'localeId',
  cityId: 'cityId',
  coverImage: 'coverImage'
}

test('Deve ser possivel cadastrar um post', () => {
  const post = Post.create(input)
  expect(post).toBeTruthy()
  expect(post.id).toBeTruthy()
  expect(post.title).toBe(input.title)
})

test('Não deve ser possivel cadastrar um post', () => {
  try {
    Post.create({
      ...input,
      title: ''
    })
  } catch (error: any) {
    expect(error.errors).toMatchObject({
      title: ['Você deve informar um título para o evento']
    })
  }
})
