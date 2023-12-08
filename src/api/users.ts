import { z } from 'zod'
import restClient from './axios'

const userSchama = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string().url()
})

export const userCreateSchema = z.object({
  id: z.number().optional(),
  first_name: z.string().min(1, { message: 'Cannot be empty' }),
  last_name: z.string().min(1, { message: 'Cannot be empty' }),
  avatar: z.string().min(1, { message: 'Avatar url should have at least 1 character' }).optional()
})

export const userCreatedResponseSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  createdAt: z.string().datetime()
})

const usersSchama = z.array(userSchama)

export type UserSchema = z.infer<typeof userSchama>
export type UserCreateSchema = z.infer<typeof userCreateSchema>
export type UserCreatedResponseSchema = z.infer<typeof userCreatedResponseSchema>
export type UsersSchema = z.infer<typeof usersSchama>

const ROOT = 'users'
const serviceUsers = {
  async getAll(page: number = 1): Promise<UsersSchema> {
    const res = (await restClient.get(`${ROOT}?page=${page}`)).data.data
    const users = usersSchama.parse(res)
    return users
  },
  async getByID(id: string): Promise<UserSchema> {
    const res = (await restClient.get(`${ROOT}/${id}`)).data.data
    const user = userSchama.parse(res)
    return user
  },
  async create(user: UserCreateSchema): Promise<UserCreatedResponseSchema> {
    const res = (await restClient.post(`${ROOT}`, user)).data
    const userCreated = userCreatedResponseSchema.parse(res)
    return userCreated
  },
  async update(user: UserCreateSchema): Promise<UserCreateSchema> {
    if (!user.id) {
      throw new Error('ID not provided')
    }
    const res = (await restClient.patch(`${ROOT}/${user.id}`, user)).data
    const userCreated = userCreateSchema.parse(res)
    return userCreated
  },
  async delete(id: string): Promise<number> {
    const res = (await restClient.patch(`${ROOT}/${id}`)).status
    return res
  }
}

export default serviceUsers
