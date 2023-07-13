export type AdminUser = {
  id: number,
  name: string,
  email: string,
  avatar: string,
  createdAt: string,
  updatedAt: string,
  PostsCount: number,
  ReportsCount: number
}

export type AdminPost =  {
  id: number,
  title: string,
  post: string,
  image: string,
  user_id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  User: Pick<AdminUser, "id" | "name" | "avatar">
}

export type AdminReport = {
  id: number,
  title: string,
  from?: string,
  report: string,
  stock_id?: number,
  publish_date?: string,
  stock_name?: string,
  createdAt: string,
  updatedAt: string,
  userId: number,
  stockId?: number,
  User: Pick<AdminUser, "id" | "name" | "avatar">
}