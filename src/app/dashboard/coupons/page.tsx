import SearchInput from "@/components/ui/search-input"
import { Link } from "@/lib/i18n/navigation"
import { ActionIcon, Button, Group, Space, Stack, Title } from "@mantine/core"
import { useTranslation } from "react-i18next"
import TableCom from "./components/table"
import Filters from "./components/filters"
import ExportButton from "@/components/common/export-button"
import { GetCoupons } from "./get-coupons"
import { Plus } from "lucide-react"
import { useSmallScreen } from "@/hooks/use-small-screen"

const Coupons = () => {
  const { t } = useTranslation()
  const sm = useSmallScreen()
  return (
    <Stack>
      <Group justify="space-between" gap={"lg"}>
        <Title size={sm ? "h3" : "h2"} order={2}>
          {t("coupons.title")}
        </Title>
        <Button visibleFrom="md" component={Link} to={`/dashboard/coupons/add`}>
          {t("coupons.add-button")}
        </Button>
        <ActionIcon size={"md"} radius={"sm"} hiddenFrom="md" component={Link} to={`/dashboard/coupons/add`}>
          <Plus size={18} />
        </ActionIcon>
      </Group>

      <Space />
      <Space />

      <Group justify="space-between" gap={"lg"} wrap="nowrap">
        <SearchInput />
        <Group wrap="nowrap">
          <ExportButton queryFun={GetCoupons} />
          <Filters />
        </Group>
      </Group>
      <TableCom />
    </Stack>
  )
}

export default Coupons
