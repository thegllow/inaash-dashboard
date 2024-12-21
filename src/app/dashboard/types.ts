export interface GeneralStatisticsResponse {
  status: boolean
  message: string
  data: Data
  guard: string
  errors: null
  response_code: number
  request_body: unknown[]
}

export interface Data {
  total_certificates: string
  total_revenue: string
  total_users: string
  total_certificates_statistics: TotalCertificatesStatistics
}

export interface TotalCertificatesStatistics {
  x: string
  y: number
}

export interface UserGraphResponse {
  status: boolean
  message: string
  data: {
    graph: Graph
  }
  guard: string
  errors: null
  response_code: number
  request_body: null
}

export interface Graph {
  hourly: ChartData[]
  daily: ChartData[]
  weekly: ChartData[]
  monthly: ChartData[]
  yearly: ChartData[]
}

export interface ChartData {
  x: string
  y: number
  y_ar: number
  y_en: number
  y_fr: number
  y_ur: number
  y_fil: number
}

export interface RevenueGraphResponse {
  status: boolean
  message: string
  data: {
    graph: {
      hourly: ChartData[]
      daily: ChartData[]
      weekly: ChartData[]
      monthly: ChartData[]
      yearly: ChartData[]
    }
  }
  guard: string
  errors: null
  response_code: number
  request_body: null
}
