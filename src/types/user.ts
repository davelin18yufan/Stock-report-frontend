export type UserRequest = {
  email: string
  password: string
  passwordCheck?: string
  name?: string
  avatar?: string
}

export type ChildrenProp = {
  children: React.ReactNode
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
  User: User
  Stock?: Stock
}

export type Favorite = {
  userId: number
  postId: number
  createdAt: string
  updatedAt: string
}

// 推斷 FormData 中的型別
type FormData = ReturnType<typeof createFormData>
// 建立一個FormData Instance
function createFormData() {
  return new FormData()
}
export interface PostPayload<T> extends FormData{
  title: string
  post: string
  image?: T
}

export type ReportPayload = {
  title: string
  report: string
  from: string
  publishDate?: string
  stock?: number
}

export type Stock = {
  id: number
  name: string
  symbol: number
  createdAt: string
  updatedAt: string
  Reports?: Report[]
}

export type ApiResponse<T> = {
  status: string
  data: T
}
