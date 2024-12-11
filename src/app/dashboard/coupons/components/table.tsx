import Error from "@/components/common/error"
import Loader from "@/components/common/loader"
import PaginationCom from "@/components/common/pagination"
import { Link } from "@/lib/i18n/navigation"
import { ActionIcon, Badge, Box, Button, Popover, Stack, Table, TableTh, TableThead } from "@mantine/core"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { ChartNoAxesCombined, MoreVertical, User } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router"
import { GetCoupons } from "../get-coupons"
import ToggleActivity from "./toggle-activity"
const tableHead = [
  "name",
  "code",
  "discount",
  "used-by",
  "start-date",
  "end-date",
  "status",
  "is-active",
  "more",
] as const
export const couponStatus = {
  Active: {
    label: "active",
    color: "green",
  },
  Inactive: {
    label: "inactive",
    color: "blue",
  },
  Expired: {
    label: "expired",
    color: "red",
  },
}
const TableCom = () => {
  // const {data,isloading,isError} = useQuery
  const { t } = useTranslation()

  const [searchParams] = useSearchParams()

  const { data, status, error } = useQuery({
    queryKey: ["coupons", searchParams.toString()],
    queryFn: async () => await GetCoupons(searchParams),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  })
  if (status === "pending") return <Loader />

  return (
    <>
      <Table.ScrollContainer minWidth={1100}>
        <Table
          highlightOnHover
          highlightOnHoverColor="#f6f6f6"
          className="overflow-hidden rounded-md bg-white">
          <TableThead>
            <Table.Tr>
              {tableHead.map((element) => {
                return <TableTh key={element}>{t(`coupons.table.${element}`)}</TableTh>
              })}
            </Table.Tr>
          </TableThead>
          <Table.Tbody>
            {status === "error" ? <Error error={error} /> : null}
            {status === "success"
              ? data.data.map((coupon) => (
                  <Table.Tr key={coupon.id}>
                    <Table.Td>{coupon.name}</Table.Td>
                    <Table.Td>{coupon.code}</Table.Td>
                    <Table.Td>{coupon.discount_amount}</Table.Td>
                    <Table.Td>{coupon.uses_count}</Table.Td>
                    <Table.Td>{dayjs(coupon.date_start).format("DD/MM/YYYY")}</Table.Td>
                    <Table.Td>{dayjs(coupon.date_end).format("DD/MM/YYYY")}</Table.Td>
                    <Table.Td>
                      <Badge
                        color={couponStatus[coupon.status as keyof typeof couponStatus].color}
                        rightSection={
                          <Box
                            bg={couponStatus[coupon.status as keyof typeof couponStatus].color}
                            className="size-1.5 rounded-full"></Box>
                        }>
                        {t(
                          `coupons.table.status-label.${couponStatus[coupon.status as keyof typeof couponStatus].label as "active"}`,
                        )}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {coupon.status === "Expired" ? null : <ToggleActivity coupon={coupon} />}
                    </Table.Td>
                    <Table.Td>
                      <Popover width={170} shadow="lg" position="left-start">
                        <Popover.Target>
                          <ActionIcon variant="subtle" color="gray" aria-label="Settings">
                            <MoreVertical />
                          </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown className="!border-none" p="xs">
                          <Stack gap={"xs"}>
                            <Button
                              variant="subtle"
                              size="sm"
                              component={Link}
                              to={`/dashboard/coupons/${coupon.id}`}
                              color="black"
                              justify="start"
                              leftSection={<User size={20} />}>
                              {t("global.details")}
                            </Button>
                            <Button
                              variant="subtle"
                              size="sm"
                              color="black"
                              component={Link}
                              to={`/dashboard/coupons/${coupon.id}/reports`}
                              justify="start"
                              leftSection={<ChartNoAxesCombined size={20} />}>
                              {t("global.reports")}
                            </Button>
                          </Stack>
                        </Popover.Dropdown>
                      </Popover>
                    </Table.Td>
                  </Table.Tr>
                ))
              : null}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <PaginationCom last_page={data?.meta.last_page} />
    </>
  )
}

export default TableCom
