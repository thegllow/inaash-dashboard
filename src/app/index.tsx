import { useTranslation } from "react-i18next"

const Index = () => {
  const { t } = useTranslation()
  return <div>{t("login.title")}</div>
}

export default Index
