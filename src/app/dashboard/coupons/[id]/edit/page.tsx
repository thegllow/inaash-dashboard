import { Stack, Title } from "@mantine/core"
import { Space } from "lucide-react"
import { useTranslation } from "react-i18next"
import AddCouponForm from "../../add/components/form"
import { useParams } from "@/lib/i18n/navigation"
import { useSuspenseQuery } from "@tanstack/react-query"
import { GetCoupon } from "../get-coupon"

const EditCoupon = () => {
  const { t } = useTranslation()
  const { id } = useParams() as { id: string }
  const { data: coupon } = useSuspenseQuery({
    queryKey: ["coupon", id],
    queryFn: () => GetCoupon(id),
  })
  return (
    <Stack>
      <Title order={2}>{t("coupons.edit.title")}</Title>
      <Space />
      <AddCouponForm coupon={coupon} />
    </Stack>
  )
}

export default EditCoupon
