import { downloadFile } from "@/utils/download-file"
import { Button, ButtonProps } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { CloudDownload } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

type Props = ButtonProps & {
  queryFun: (args: URLSearchParams) => Promise<unknown>
}

const ExportButton = ({ queryFun, ...props }: Props) => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { mutate, isPending } = useMutation({
    async mutationFn() {
      const funcSearchParams = new URLSearchParams(searchParams)
      funcSearchParams.set("export", "true")
      return await queryFun(funcSearchParams)
    },
    onSuccess(response) {
      downloadFile((response as { data: Blob }).data, "coupons.xlsx")
    },
  })
  const handleExport = () => {
    mutate()
  }

  return (
    <Button
      variant="white"
      className="!border !border-gray-300"
      color="gray.9"
      size="sm"
      leftSection={<CloudDownload size={20} />}
      onClick={handleExport}
      loading={isPending}
      {...props}>
      {t("global.export")}
    </Button>
  )
}

export default ExportButton
