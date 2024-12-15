import { ActionIcon, Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Plus } from "lucide-react"
import { useTranslation } from "react-i18next"
import UserForm from "./user-form"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserSchema } from "@/validation/user"

const UserModal = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const { t } = useTranslation()
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
    },
  })
  return (
    <>
      <Modal opened={opened} onClose={close} centered size={"md"} title={t("users.add-title")}>
        <FormProvider {...form}>
          <UserForm />
        </FormProvider>
      </Modal>

      <Button onClick={open} visibleFrom="md">
        {t("users.add-button")}
      </Button>
      <ActionIcon onClick={open} size={"md"} radius={"sm"} hiddenFrom="md">
        <Plus size={18} />
      </ActionIcon>
    </>
  )
}

export default UserModal
