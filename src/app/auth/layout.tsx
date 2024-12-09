import { Outlet } from "react-router"
import { logo } from "../../assets"

export default function AuthLayout() {
  return (
    <section className="flex h-full min-h-[100svh] items-center justify-center p-10">
      <div className="flex w-full items-center ~gap-20/32 max-lg:flex-col-reverse">
        <div className="w-full lg:w-1/2">
          <div className="max-w-md max-lg:mx-auto lg:ms-auto">
            <Outlet />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <img className="max-lg:mx-auto max-lg:w-32" src={logo} />
        </div>
      </div>
    </section>
  )
}
