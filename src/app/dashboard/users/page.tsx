import ExportButton from "@/components/common/export-button"
import SearchInput from "@/components/ui/search-input"
import { useSmallScreen } from "@/hooks/use-small-screen"
import { Group, Space, Stack, Title } from "@mantine/core"
import { useTranslation } from "react-i18next"
import Filters from "./components/filters"
import TableCom from "./components/table"
import UserModal from "./components/user-modal"
import { GetUsers } from "./get-users"

const Users = () => {
  const { t } = useTranslation()
  const sm = useSmallScreen()
  return (
    <Stack>
      <Group justify="space-between" gap={"lg"}>
        <Title size={sm ? "h3" : "h2"} order={2}>
          {t("users.title")}
        </Title>
        <UserModal />
      </Group>

      <Space />
      <Space />

      <Group justify="space-between" gap={"lg"} wrap="nowrap">
        <SearchInput />
        <Group wrap="nowrap">
          <ExportButton queryFun={GetUsers} filename="users" />
          <Filters />
        </Group>
      </Group>
      <TableCom />
    </Stack>
  )
}

export default Users
