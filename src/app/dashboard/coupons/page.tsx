import SearchInput from "@/components/ui/search-input"
import { Link } from "@/lib/i18n/navigation"
import { Button, Group, Space, Stack, Title } from "@mantine/core"
import { CloudDownload, SlidersHorizontal } from "lucide-react"
import { useTranslation } from "react-i18next"
import TableCom from "./components/table"

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
          <Button
            variant="white"
            className="!border !border-gray-300"
            color="gray.9"
            size="sm"
            leftSection={<CloudDownload size={20} />}>
            {t("global.export")}
          </Button>
          <Button
            variant="white"
            className="!border !border-gray-300"
            color="gray.9"
            size="sm"
            leftSection={<SlidersHorizontal size={20} />}>
            {t("global.filters")}
          </Button>
        </Group>
      </Group>
      <TableCom />
    </Stack>
  )
}

export default Coupons
