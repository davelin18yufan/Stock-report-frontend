export type PayloadProp = {
  email: string
  password: string
  name?: string
}

export type User = {
  id: number
  name: string
  email: string
  avatar: string
  createdAt?: string
  updatedAt?: string
  posts_count?: number
  reports_count?: number
  beingFavorite_count?: number
  FavoritePosts?: Post[]
}

export type LoginResponse = {
  token: string
  user: User
}

export type Post = {
  id: number
  title: string
  post: string
  image: string
  createdAt?: string
  updatedAt?: string
  userId: number
  User: User
  Favorite?: Favorite
}

export type Report = {
  id: number
  title: string
  from?: string
  report: string
  stock_id?: number
  publish_date?: string
  stock_name?: string
  createdAt: string
  updatedAt: string
  userId: number
  stockId?: number
}

export type Favorite = {
  userId: number
  postId: number
  createdAt: string
  updatedAt: string
}

export interface PostPayload<T> {
  title: string
  post: string
  image: T
}

export type ReportPayload = {
  title: string
  report: string
  from: string
  publishDate: string
  stock: number | null
}

export type Stock = {
  id: number
  name: string
  symbol: number
  createdAt: string
  updatedAt: string
  Reports?: Report[]
}
