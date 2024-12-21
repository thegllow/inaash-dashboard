import { horizontalLogo } from "@/assets"
import { AppShell, Box, Burger, Group, Select } from "@mantine/core"
import { useTranslation } from "react-i18next"
import UserNotifications from "./user-notifications"

const Header = ({ opened, toggle }: { opened: boolean; toggle: () => void }) => {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const handleChangeLanguage = (value: string | null) => {
    if (!value) return
    i18n.changeLanguage(value)
  }

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
            size="sm"
            defaultValue={lang}
            allowDeselect={false}
            onChange={handleChangeLanguage}
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
          <UserNotifications />
        </Group>
      </Group>
    </AppShell.Header>
  )
}

export default Header
