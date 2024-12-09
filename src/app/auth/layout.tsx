import { Outlet } from "react-router"
import { logo } from "../../assets"
import { Navigate, usePathname } from "@/lib/i18n/navigation"
import { getSession } from "@/utils/get-session"

export default function AuthLayout() {
  const whiteList = ["/auth/reset-password"]
  const pathname = usePathname()
  const session = getSession()
  if (session?.token && !whiteList.includes(pathname)) {
    return <Navigate to="/dashboard" replace />
  }
  return (
    <section className="flex h-full min-h-[100svh] items-center justify-center ~p-8/10">
      <div className="flex w-full items-center py-10 ~gap-8/32 max-md:flex-col-reverse">
        <div className="w-full md:w-1/2">
          <div className="max-w-md max-md:mx-auto md:ms-auto">
            <Outlet />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img className="max-md:mx-auto max-md:w-32" src={logo} />
        </div>
      </div>
    </section>
  )
}
