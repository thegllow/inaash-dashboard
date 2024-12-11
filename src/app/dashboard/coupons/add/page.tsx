import { Space, Stack, Title } from "@mantine/core"
import { useTranslation } from "react-i18next"
import AddCouponForm from "./components/form"

const AddCoupon = () => {
  const { t } = useTranslation()
  return (
    <Stack>
      <Title order={2}>{t("coupons.title")}</Title>
      <Space />
      <AddCouponForm />
    </Stack>
  )
}

export default AddCoupon
