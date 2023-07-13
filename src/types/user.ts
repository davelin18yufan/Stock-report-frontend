export type PayloadProp = {
  email: string,
  password: string,
  name?: string,
}

export type User =  {
  id: number,
  name: string,
  email: string,
  avatar: string,
  createdAt: string,
  updatedAt: string
}

export type LoginResponse = {
  token: string,
  user: User
}