import { Route, Routes } from "react-router-dom"
import Index from "./app/index"
import Login from "./app/auth/login/page"
import AuthLayout from "./app/auth/layout"
import OTP from "./app/auth/otp/page"
import ResetPassword from "./app/auth/reset-password/page"
import { DashboardLayout } from "./app/dashboard/layout"
import Coupons from "./app/dashboard/coupons/page"
import AddCoupon from "./app/dashboard/coupons/add/page"
import React, { Suspense } from "react"
import { Loader } from "@mantine/core"
const ViewCoupon = React.lazy(async () => import("./app/dashboard/coupons/[id]/page"))

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
            <Route
              path=":id"
              element={
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center">
                      <Loader size={"md"} />
                    </div>
                  }>
                  <ViewCoupon />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default Router
