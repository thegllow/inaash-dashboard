import { handleFormError } from "@/utils/handle-form-errors"
import { ResetPasswordSchema } from "@/validation/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, PasswordInput, Stack, Text, Title } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

const ResetPassword = () => {
  const { t } = useTranslation()
  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  })
  const { control, formState } = form
  const { errors } = formState

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      console.log("🚀 ~ onSubmit ~ data:", data)
    } catch (error) {
      handleFormError(error, form)
    }
  })

  return (
    <Stack gap={"xl"}>
      <div className="space-y-1 text-center">
        <Title order={2}>{t("reset-password.title")}</Title>
        <Text c="gray.5">{t("reset-password.description")}</Text>
      </div>
      <Stack component={"form"} onSubmit={onSubmit} gap={"lg"}>
        <Controller
          control={control}
          name="password"
          render={({ field }) => {
            return (
              <PasswordInput
                label={t("reset-password.form.password-label")}
                {...field}
                error={errors.password && t(`login.form.errors.${errors.password.message as "required"}`)}
              />
            )
          }}
        />
        <Controller
          control={control}
          name="password_confirmation"
          render={({ field }) => {
            return (
              <PasswordInput
                label={t("reset-password.form.password-confirmation-label")}
                {...field}
                error={
                  errors.password_confirmation &&
                  t(`reset-password.form.errors.${errors.password_confirmation.message as "required"}`)
                }
              />
            )
          }}
        />

        <Button type="submit" loading={form.formState.isSubmitting} size="lg" color="primary">
          {t("reset-password.form.save-button")}
        </Button>
        {errors.root ? <p className="text-sm font-medium text-red-500">{errors.root.message}</p> : null}
      </Stack>
    </Stack>
  )
}

export default ResetPassword
