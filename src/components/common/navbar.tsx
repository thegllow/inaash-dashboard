import { AppShell, Button, Group, ScrollArea, Stack, Text } from "@mantine/core"
import { BadgePercent, BlocksIcon, DollarSign, Globe, LogOut, UserCheck, Users } from "lucide-react"
import { useTranslation } from "react-i18next"

import { horizontalLogo } from "@/assets"
import { NavLink, usePathname } from "@/lib/i18n/navigation"
import { cn } from "@/utils/cn"

const navItems = [
  {
    label: "home",
    link: "/dashboard",
    icon: BlocksIcon,
  },

  {
    label: "users",
    link: "/dashboard/users",
    icon: Users,
  },
  {
    label: "coupons",
    link: "/dashboard/coupons",
    icon: BadgePercent,
  },
  {
    label: "financial",
    link: "/dashboard/financial",
    icon: DollarSign,
  },
  {
    label: "permeations",
    link: "/dashboard/permeations",
    icon: UserCheck,
  },
  {
    label: "manage-site",
    link: "/dashboard/site",
    icon: Globe,
  },
] as const
const Navbar = ({ toggle }: { toggle: () => void }) => {
  const { t } = useTranslation()
  const pathname = usePathname()

  return (
    <AppShell.Navbar withBorder={false} p="lg">
      <Stack gap={"xl"} justify="space-between" flex={1}>
        <Stack gap={"xl"}>
          <AppShell.Section>
            <Group className="" justify="center">
              <img className="h-16" src={horizontalLogo} alt="logo " />
            </Group>
          </AppShell.Section>
          <ScrollArea>
            <Stack gap={"md"} flex={1}>
              {navItems.map((item) => (
                <Button
                  onClick={toggle}
                  justify="start"
                  className={cn(pathname === item.link && "!border-[#E2E2E2] !bg-[#F6F6F6] !text-secondary")}
                  variant={pathname === item.link ? "outline" : "subtle"}
                  color={"gray.9"}
                  component={NavLink}
                  to={item.link}
                  key={item.label}>
                  <Group gap={"xs"} key={item.label} wrap="nowrap" justify="start">
                    <item.icon width={20} />
                    <Text fz={"sm"} key={item.label}>
                      {t(`nav.items.${item.label as "home"}`)}
                    </Text>
                  </Group>
                </Button>
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
        <Stack>
          <Button justify="start" variant="subtle" color="gray.9" leftSection={<LogOut size={20} />}>
            {t("global.logout-button")}
          </Button>
        </Stack>
      </Stack>
    </AppShell.Navbar>
  )
}

export default Navbar
