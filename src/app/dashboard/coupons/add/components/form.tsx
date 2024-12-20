/* eslint-disable @typescript-eslint/no-unused-vars */
import { getVideos } from "@/services/utils/get-videos"
import { CouponSchema } from "@/validation/coupon"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Group, Radio, Space, Stack, Text, TextInput, TextInputProps } from "@mantine/core"
import { DateInput } from "@mantine/dates"

import { useQuery } from "@tanstack/react-query"
import { Percent } from "lucide-react"
import { Controller, FieldValues, FormProvider, useForm, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { DevTool } from "@hookform/devtools"
import { WEBSITE_LANGS } from "@/config"
import { cn } from "@/utils/cn"
import { z } from "zod"
import { handleFormError } from "@/utils/handle-form-errors"
import { PostAddCoupon } from "../add-coupon"
import { type Coupon } from "../../types"
import { PutUpdateCoupon } from "../../[id]/edit/update-coupon"
import { useNavigate } from "react-router-dom"
import { generateRandomCode } from "@/utils/generate-random-code"
import { showErrorMessage } from "@/utils/show-error-message"
const Input = ({ name, ...props }: TextInputProps & { name: string }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => {
        return (
          <TextInput
            className="grow"
            // @ts-expect-error name is a valid
            label={t(`coupons.add.form.${name}-input-label`)}
            // @ts-expect-error name is a valid
            placeholder={t(`coupons.add.form.${name}-input-placeholder`)}
            {...field}
            onChange={(e) => {
              if (name === "code") return onChange(e.target.value.toUpperCase())
              onChange(e)
            }}
            error={showErrorMessage(errors, name)}
            {...props}
          />
        )
      }}
    />
  )
}

const AddEditCouponForm = ({ coupon }: { coupon?: Coupon }) => {
  const isUpdate = coupon ? true : false
  const { t } = useTranslation()
  const form = useForm<z.infer<typeof CouponSchema>>({
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      name: coupon?.name || "", // Must be between 1 and 50 characters
      code: coupon?.code || "", // Unique coupon code (between 1-50 characters)
      amount: coupon?.amount ? Number(coupon.amount) : 0, // Must be between 0 and 100000
      video_ids: coupon?.video_ids ? coupon.video_ids.map((e) => e + "") : [], // Array of video IDs; ensure these IDs exist in your videos table
      date_start: coupon?.date_start ? new Date(coupon.date_start) : undefined, // Must be a valid date and after yesterday
      date_end: coupon?.date_end ? new Date(coupon.date_end) : undefined, // Must be after date_start and in the correct format
      max_uses: coupon?.max_uses ? Number(coupon.max_uses) : 1, // Must be a number and max 100000
      max_customer_uses: coupon?.max_customer_uses ? Number(coupon.max_customer_uses) : 1, // Number of uses per customer, must be less than 1000
      type: coupon?.type || "Percentage", // Must be one of the defined CouponType values
      langs: coupon?.langs || [], // Must be one or more of the defined Lang values
    },
  })

  const {
    control,
    formState: { errors, isSubmitting },
  } = form

  const { data: videos } = useQuery({
    queryKey: ["list", "videos"],
    queryFn: getVideos,
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = isUpdate
        ? await PutUpdateCoupon({ id: coupon!.id, ...data })
        : await PostAddCoupon(data)
      console.log("🚀 ~ onSubmit ~ response:", response)
    } catch (error) {
      handleFormError(error, form)
    }
  })

  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGenerateCode = () => {
    const code = generateRandomCode()
    form.setValue("code", code, { shouldDirty: true, shouldTouch: true })
  }

  return (
    <FormProvider {...form}>
      <Stack component={"form"} onSubmit={onSubmit} w={"100%"}>
        <Group w={"100%"}>
          <Input
            name="code"
            rightSectionWidth={"fit"}
            rightSection={
              <div className="mx-[3px]">
                <Button
                  onClick={handleGenerateCode}
                  variant="light"
                  color="secondary"
                  size="sm"
                  className="!border !border-secondary">
                  {t("coupons.add.form.generate-code")}
                </Button>
              </div>
            }
          />
          <Input name="name" />
        </Group>
        <Controller
          control={control}
          name={"type"}
          render={({ field }) => {
            return (
              <Radio.Group
                label={t(`coupons.add.form.type-input-label`)}
                {...field}
                error={showErrorMessage(errors, "type")}>
                <Stack gap={"xs"} mt="xs">
                  <Radio
                    color="secondary"
                    value="Percentage"
                    c={"gray"}
                    label={t(`coupons.add.form.type-input-percentage-label`)}
                  />
                  <Radio
                    color="secondary"
                    value="Fixed"
                    c={"gray"}
                    label={t(`coupons.add.form.type-input-fixed-label`)}
                  />
                </Stack>
              </Radio.Group>
            )
          }}
        />
        <Group w={"100%"}>
          <Input
            min={0}
            name="amount"
            rightSection={form.watch("type") === "Percentage" ? <Percent size={"20"} /> : null}
          />
          <div className="w-1/2"></div>
        </Group>
        <Controller
          control={control}
          name={"video_ids"}
          render={({ field }) => {
            return (
              <Checkbox.Group
                label={t(`coupons.add.form.video_ids-input-label`)}
                {...field}
                error={showErrorMessage(errors, "video_ids")}>
                <Stack gap={"xs"} mt="xs">
                  {videos?.map((video) => {
                    return (
                      <Checkbox
                        key={video.id}
                        color="secondary"
                        value={video.id}
                        c={"gray"}
                        label={video.title}
                      />
                    )
                  })}
                </Stack>
              </Checkbox.Group>
            )
          }}
        />
        <Controller
          control={control}
          name={"langs"}
          render={({ field }) => {
            return (
              <Checkbox.Group
                label={t(`coupons.add.form.langs-input-label`)}
                error={showErrorMessage(errors, "langs")}
                {...field}>
                <Group gap={"xs"} mt="xs">
                  {WEBSITE_LANGS?.map((lang) => {
                    return (
                      <Checkbox.Card
                        key={lang}
                        radius="md"
                        value={lang}
                        className={cn(
                          "group !w-fit !border-gray-200 !bg-white !px-4 !py-2 data-checked:!border-secondary data-checked:!bg-[#E8FAFA]",
                        )}>
                        <Group wrap="nowrap" align="flex-start">
                          <Checkbox.Indicator
                            color="secondary"
                            className="!hidden group-data-checked:!flex"
                          />
                          <Text className="!text-gray-400 group-data-checked:!text-secondary" fw={500}>
                            {t(`langs.${lang as "ar"}`)}
                          </Text>
                        </Group>
                      </Checkbox.Card>
                    )
                  })}
                </Group>
              </Checkbox.Group>
            )
          }}
        />
        <Group w={"100%"}>
          <Controller
            control={control}
            name={"date_start"}
            render={({ field }) => {
              return (
                <DateInput
                  size="md"
                  minDate={new Date()}
                  className="grow"
                  label={t(`coupons.add.form.date_start-input-label`)}
                  placeholder={t(`coupons.add.form.date_start-input-placeholder`)}
                  {...field}
                  error={showErrorMessage(errors, "date_start")}
                />
              )
            }}
          />
          <Controller
            control={control}
            name={"date_end"}
            render={({ field }) => {
              return (
                <DateInput
                  size="md"
                  minDate={form.watch("date_start")}
                  className="grow"
                  label={t(`coupons.add.form.date_end-input-label`)}
                  placeholder={t(`coupons.add.form.date_end-input-placeholder`)}
                  {...field}
                  error={showErrorMessage(errors, "date_end")}
                />
              )
            }}
          />
        </Group>
        <Group w={"100%"}>
          <Input min={1} type="number" name="max_uses" />
          <Input min={1} type="number" name="max_customer_uses" />
        </Group>
        <DevTool control={control} placement="bottom-left" />
        <Space />
        <Stack gap={"sm"} align="end">
          <Group justify="end">
            {isUpdate && (
              <Button
                onClick={handleGoBack}
                type="button"
                color="gray"
                variant="outline"
                loading={isSubmitting}
                size="md"
                px={60}>
                {t("coupons.add.form.cancel-button")}
              </Button>
            )}
            <Button type="submit" loading={isSubmitting} size="md" px={60}>
              {t("coupons.add.form.save-button")}
            </Button>
          </Group>
          {errors.root ? (
            <Text size="sm" c="red">
              {errors.root.message}
            </Text>
          ) : null}
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default AddEditCouponForm
