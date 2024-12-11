import { Route, Routes } from "react-router-dom"
import Index from "./app/index"
import Login from "./app/auth/login/page"
import AuthLayout from "./app/auth/layout"
import OTP from "./app/auth/otp/page"
import ResetPassword from "./app/auth/reset-password/page"
import { DashboardLayout } from "./app/dashboard/layout"
import Coupons from "./app/dashboard/coupons/page"
import AddCoupon from "./app/dashboard/coupons/add/page"

const Router = () => {
  return (
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
          <Route path="coupons">
            <Route index element={<Coupons />} />
            <Route path="add" element={<AddCoupon />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default Router
