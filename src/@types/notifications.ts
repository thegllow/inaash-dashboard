export interface NotificationsResponse {
  status: boolean
  message: string
  data: Data
  guard: string
  errors: null
  response_code: number
  request_body: RequestBody
}

export interface Data {
  helpers: Helpers
  items: Items
}

export interface Helpers {
  introduction: Introduction
}

export interface Introduction {
  title: string
  description: string
}

export interface Items {
  data: Notification[]
  links: Links
  meta: Meta
}

export interface Notification {
  id: string
  name: string
  date: string
  type: string
}

export interface Links {
  first: string
  last: string
  prev: null
  next: null
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface Link {
  url: null | string
  label: string
  active: boolean
}

export interface RequestBody {
  per_page: number
  page: number
  sort_column: string
  sort_direction: string
  date_from: Date
  date_to: Date
}
