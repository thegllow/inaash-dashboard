import { useParams } from "@/lib/i18n/navigation"
import { showErrorMessage } from "@/utils/show-error-message"
import { UserSchema } from "@/validation/user"
import { Stack, Text, TextInput } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import ar from "react-phone-number-input/locale/ar.json"
import en from "react-phone-number-input/locale/en.json"
import PhoneInput from "react-phone-number-input/react-hook-form"
import "react-phone-number-input/style.css"
import { z } from "zod"

const UserForm = () => {
  const { lang } = useParams()
  const form = useFormContext<z.infer<typeof UserSchema>>()
  const {
    control,
    formState: { errors },
  } = form
  const { t } = useTranslation()
  return (
    <Stack>
      <Controller
        name="first_name"
        control={control}
        render={({ field }) => {
          return (
            <TextInput
              variant="filled"
              className="grow"
              label={t(`users.form.first_name-input-label`)}
              placeholder={t(`users.form.first_name-input-placeholder`)}
              error={showErrorMessage(errors, "first_name")}
              {...field}
            />
          )
        }}
      />
      <Controller
        name="last_name"
        control={control}
        render={({ field }) => {
          return (
            <TextInput
              variant="filled"
              className="grow"
              label={t(`users.form.last_name-input-label`)}
              placeholder={t(`users.form.last_name-input-placeholder`)}
              error={showErrorMessage(errors, "last_name")}
              {...field}
            />
          )
        }}
      />
      <div>
        <Text mb={"xs"}>{t(`users.form.mobile-input-label`)}</Text>
        <div dir="ltr">
          <PhoneInput
            className="items-end"
            variant="filled"
            control={form.control}
            name="mobile"
            labels={lang === "ar" ? ar : en}
            international
            countryCallingCodeEditable={false}
            defaultCountry="SA"
            inputComponent={TextInput}
            radius="md"
            error={showErrorMessage(errors, "mobile")}
          />
        </div>
      </div>
      <Controller
        name="email"
        control={control}
        render={({ field }) => {
          return (
            <TextInput
              color="gray.1"
              variant="filled"
              type="email"
              className="grow"
              label={t(`users.form.email-input-label`)}
              placeholder={t(`users.form.email-input-placeholder`)}
              error={showErrorMessage(errors, "email")}
              {...field}
            />
          )
        }}
      />
    </Stack>
  )
}

export default UserForm
