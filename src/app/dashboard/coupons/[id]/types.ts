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

export interface Coupon {
  id: string
  name: string
  code: string
  type: string
  amount: string
  date_start: Date
  date_end: Date
  max_uses: string
  max_customer_uses: string
  uses_count: string
  paid_amount: string
  paid_amount_after_discount: string
  discount_amount: string
  status: string
  deleted_at: null
  video_ids: number[]
  langs: string[]
}
