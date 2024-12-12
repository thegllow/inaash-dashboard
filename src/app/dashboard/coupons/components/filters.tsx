import { Button, Checkbox, Divider, Popover, Stack } from "@mantine/core"
import { SlidersHorizontal } from "lucide-react"
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const couponStatus = ["Active", "Inactive", "Expired"] as const
const Filters = () => {
  const { t } = useTranslation()
  const [filters, setFilters] = useQueryState("statuses", parseAsArrayOf(parseAsString).withDefault([""]))
  const handleApplyFilters = () => {
    setFilters(state)
  }
  const [state, setState] = useState<string[]>(filters)
  return (
    <Popover width={200} position="bottom" withArrow>
      <Popover.Target>
        <Button
          variant="white"
          className="!border !border-gray-300"
          color="gray.9"
          size="sm"
          leftSection={<SlidersHorizontal size={20} />}>
          {t("global.filters")}
        </Button>
      </Popover.Target>
      <Popover.Dropdown className="!border-none">
        <Stack>
          <Checkbox.Group value={state} onChange={setState} label={t("coupons.table.status")}>
            <Stack mt="xs">
              {couponStatus.map((status) => (
                <Checkbox
                  key={status}
                  radius={"sm"}
                  color="secondary"
                  value={status}
                  label={t(`coupons.table.status-label.${status.toLocaleLowerCase() as "active"}`)}
                />
              ))}
            </Stack>
          </Checkbox.Group>
          <Divider />
          <Button size="sm" onClick={handleApplyFilters}>
            {t("global.apply")}
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default Filters
