import { horizontalLogo } from "@/assets"
import { AppShell, Box, Burger, Group, Indicator, Select } from "@mantine/core"
import { Bell } from "lucide-react"
import { useTranslation } from "react-i18next"

const Header = ({ opened, toggle }: { opened: boolean; toggle: () => void }) => {
  const { i18n } = useTranslation()
  const lang = i18n.language
  console.log("🚀 ~ Header ~ lang:", lang)
  return (
    <AppShell.Header className="!border-b-gray-300">
      <Group justify="space-between" h="100%" px="md" wrap="nowrap">
        <Group wrap="nowrap">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Box hiddenFrom="md">
            <img className="h-12" src={horizontalLogo} alt="logo " />
          </Box>
        </Group>
        <Group wrap="nowrap" align="center">
          <Select
            defaultValue={lang}
            className="max-w-32"
            variant="filled"
            data={[
              {
                value: "ar",
                label: "عربي",
              },
              {
                value: "en",
                label: "أنجليزي",
              },
            ]}
          />
          <Indicator color="red">
            <Bell />
          </Indicator>
        </Group>
      </Group>
    </AppShell.Header>
  )
}

export default Header
