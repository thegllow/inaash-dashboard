import Header from "@/components/common/header"
import Navbar from "@/components/common/navbar"
import { AppShell, Box, useMatches } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Outlet } from "react-router"

export function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure()

  const layout = useMatches({
    md: "alt",
    sm: "default",
  }) as "alt" | "default"

  return (
    <AppShell
      className="bg-[#f6f6f6]"
      layout={layout}
      header={{ height: 58 }}
      navbar={{ width: 290, breakpoint: "md", collapsed: { mobile: !opened } }}
      padding="md">
      <Header opened={opened} toggle={toggle} />
      <Navbar toggle={toggle} />
      <AppShell.Main>
        <Box p={{ md: "lg" }} pt={"lg"}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}
