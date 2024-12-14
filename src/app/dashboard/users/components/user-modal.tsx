import { ActionIcon, Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Plus } from "lucide-react"
import { useTranslation } from "react-i18next"

const UserModal = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const { t } = useTranslation()
  return (
    <>
      <Modal opened={opened} onClose={close}>
        {/* Modal content */}
      </Modal>

      <Button onClick={open} visibleFrom="md">
        {t("users.add-button")}
      </Button>
      <ActionIcon onClick={close} size={"md"} radius={"sm"} hiddenFrom="md">
        <Plus size={18} />
      </ActionIcon>
    </>
  )
}

export default UserModal
