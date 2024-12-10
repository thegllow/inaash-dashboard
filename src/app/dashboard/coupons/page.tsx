import SearchInput from "@/components/ui/search-input"
import { Link } from "@/lib/i18n/navigation"
import { Button, Group, Space, Stack, Title } from "@mantine/core"
import { useTranslation } from "react-i18next"
import TableCom from "./components/table"
import Filters from "./components/filters"
import ExportButton from "@/components/common/export-button"
import { GetCoupons } from "./get-coupons"

const Coupons = () => {
  const { t } = useTranslation()
  return (
    <Stack>
      <Group justify="space-between" gap={"lg"}>
        <Title order={2}>{t("coupons.title")}</Title>
        <Button component={Link} to={`/dashboard/coupons/add`}>
          {t("coupons.add-button")}
        </Button>
      </Group>

      <Space />
      <Space />

      <Group justify="space-between" gap={"lg"}>
        <SearchInput />
        <Group>
          <ExportButton queryFun={GetCoupons} />
          <Filters />
        </Group>
      </Group>
      <TableCom />
    </Stack>
  )
}

export default Coupons
