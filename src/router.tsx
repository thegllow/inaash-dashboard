import { Route, Routes } from "react-router-dom"
import Index from "./app/index"
// import { NuqsAdapter } from "nuqs/adapters/react"
import Login from "./app/auth/login/page"
import AuthLayout from "./app/auth/layout"
import OTP from "./app/auth/otp/page"
import ResetPassword from "./app/auth/reset-password/page"
import { DashboardLayout } from "./app/dashboard/layout"
import Coupons from "./app/dashboard/coupons/page"

const Router = () => {
  return (
    // <NuqsAdapter>
    <Routes>
      <Route path="/:locale?">
        <Route index element={<Index />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="otp" element={<OTP />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<div>dashboard</div>} />
          <Route path="coupons" element={<Coupons />} />
        </Route>
      </Route>
    </Routes>
    // </NuqsAdapter>
  )
}

export default Router
