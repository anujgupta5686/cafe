// ✅ Correct - Using export type
export type MenuItem = {
  _id: string
  name: string
  description: string
  price: number
  image: string
  createdAt?: string
  updatedAt?: string
}

export type CartItem = MenuItem & {
  quantity: number
}

export type OrderItem = {
  menuItemId: string
  name: string
  price: number
}

export type Order = {
  _id: string
  customerName: string
  mobile: string
  address: string
  specialInstructions: string
  items: OrderItem[]
  totalAmount: number
  createdAt: string
  updatedAt: string
}

export type Admin = {
  id: string
  email: string
  name: string
}

export type ApiResponse<T = any> = {
  success: boolean
  message?: string
  data: T
}
