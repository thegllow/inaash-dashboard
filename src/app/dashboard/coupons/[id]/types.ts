import { Coupon } from "../types"

export interface CouponResponse {
  status: boolean
  message: string
  data: Data
  guard: string
  errors: null
  response_code: number
  request_body: null
}

export interface Data {
  item: Coupon
}
