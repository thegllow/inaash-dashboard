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
