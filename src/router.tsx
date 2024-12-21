import { Route, Routes } from "react-router-dom"
import Login from "./app/auth/login/page"
import AuthLayout from "./app/auth/layout"
import OTP from "./app/auth/otp/page"
import ResetPassword from "./app/auth/reset-password/page"
import { DashboardLayout } from "./app/dashboard/layout"
import Coupons from "./app/dashboard/coupons/page"
import AddCoupon from "./app/dashboard/coupons/add/page"
import React, { Suspense } from "react"
import { Loader } from "@mantine/core"
import { Navigate } from "./lib/i18n/navigation"
import Users from "./app/dashboard/users/page"
import ViewUser from "./app/dashboard/users/[id]/page"
import Home from "./app/dashboard/page"
const ViewCoupon = React.lazy(async () => import("./app/dashboard/coupons/[id]/page"))
const EditCoupon = React.lazy(async () => import("./app/dashboard/coupons/[id]/edit/page"))

const Router = () => {
  return (
    <Routes>
      <Route path="/:locale?">
        <Route index element={<Navigate to={"/dashboard"} />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<Navigate to={"/auth/login"} />} />
          <Route path="login" element={<Login />} />
          <Route path="otp" element={<OTP />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center py-20">
                    <Loader size={"md"} />
                  </div>
                }>
                <Home />
              </Suspense>
            }
          />
          {/* coupons */}
          <Route path="coupons">
            <Route index element={<Coupons />} />
            <Route path="add" element={<AddCoupon />} />
            <Route
              path=":id"
              element={
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center py-20">
                      <Loader size={"md"} />
                    </div>
                  }>
                  <ViewCoupon />
                </Suspense>
              }
            />
            <Route
              path=":id/edit"
              element={
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center py-20">
                      <Loader size={"md"} />
                    </div>
                  }>
                  <EditCoupon />
                </Suspense>
              }
            />
          </Route>
          {/* users */}
          <Route path="users">
            <Route index element={<Users />} />
            <Route
              path=":id"
              element={
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center py-20">
                      <Loader size={"md"} />
                    </div>
                  }>
                  <ViewUser />
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
