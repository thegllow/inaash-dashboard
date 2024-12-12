import Header from "@/components/common/header"
import Navbar from "@/components/common/navbar"
import { AppShell, useMatches } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Outlet } from "react-router"
import ProtectedRoute from "./components/protct-routes"
import { useQueryClient } from "@tanstack/react-query"
import { getVideos } from "@/services/utils/get-videos"
import { useEffect, useLayoutEffect } from "react"
import { useNavigate, usePathname } from "@/lib/i18n/navigation"
import { isAuthenticated } from "@/utils/is-authenticated"

export function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure()

  const layout = useMatches({
    md: "alt",
    sm: "default",
  }) as "alt" | "default"

  const queryClient = useQueryClient()
  // prefetch videos data
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["list", "videos"],
      queryFn: getVideos,
    })
  }, [queryClient])
  const pathName = usePathname()
  const navigate = useNavigate()
  useLayoutEffect(() => {
    if (!isAuthenticated()) navigate("/auth/login")
  }, [pathName])

  return (
    <AppShell
      className="bg-[#f6f6f6]"
      layout={layout}
      header={{ height: 58 }}
      navbar={{ width: 290, breakpoint: "md", collapsed: { mobile: !opened } }}
      padding="lg">
      <Header opened={opened} toggle={toggle} />
      <Navbar toggle={toggle} />
      <AppShell.Main>
        <ProtectedRoute />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
