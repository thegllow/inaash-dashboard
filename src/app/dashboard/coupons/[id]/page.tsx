import { Link, useParams } from "@/lib/i18n/navigation"
import { ActionIcon, Badge, Box, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { couponStatus } from "../components/table"
import { GetCoupon } from "./get-coupon"
import { Pen } from "lucide-react"
import dayjs from "dayjs"
import { Coupon } from "../types"

const DataCell = ({ keyToRender, coupon }: { keyToRender: keyof Coupon; coupon: Coupon }) => {
  const { t } = useTranslation()
  return (
    <div>
      <Text c="gray.8">{t(`coupons.view.${keyToRender as "code"}`)}</Text>
      <Text size="lg" fw={500}>
        {keyToRender.includes("date")
          ? dayjs(coupon[keyToRender] as Date).format("DD/MM/YYYY")
          : (coupon[keyToRender] as string)}
      </Text>
    </div>
  )
}
const ViewCoupon = () => {
  const { id } = useParams() as { id: string }
  const { data: coupon } = useSuspenseQuery({
    queryKey: ["coupon", id],
    queryFn: () => GetCoupon(id),
  })

  const { t } = useTranslation()
  const keysToRender = ["name", "code", "amount", "max_uses", "date_start", "date_end"] as const
  const statisticsKeys = ["paid_amount_after_discount", "discount_amount", "paid_amount"] as const
  return (
    <Stack>
      <div className="rounded-lg bg-white ~p-3/5">
        <Group justify="space-between" mb={"lg"}>
          <Group gap="xs">
            <Title order={3}>{t("coupons.view.title")}</Title>
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
          </Group>
          <ActionIcon
            component={Link}
            to={`/dashboard/coupons/${id}/edit`}
            variant="subtle"
            size={"lg"}
            color="gray">
            <Pen size={18} />
          </ActionIcon>
        </Group>
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          {keysToRender.map((e) => {
            return <DataCell coupon={coupon} key={e} keyToRender={e} />
          })}
        </SimpleGrid>
      </div>
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        {statisticsKeys.map((key) => {
          return (
            <div key={key} className="space-y-3 rounded-lg bg-white ~p-3/4">
              <Text size="sm" c={"gray.8"}>
                {t(`coupons.view.${key}`)}
              </Text>
              <Text fw={"700"} size="lg">
                SAR {coupon[key]}
              </Text>
            </div>
          )
        })}
      </SimpleGrid>
    </Stack>
  )
}

export default ViewCoupon
