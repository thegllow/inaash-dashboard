/* eslint-disable @typescript-eslint/no-unused-vars */
import { getVideos } from "@/services/utils/get-videos"
import { CouponSchema } from "@/validation/coupon"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Group, Radio, Space, Stack, Text, TextInput, TextInputProps } from "@mantine/core"
import { DateInput } from "@mantine/dates"

import { useQuery } from "@tanstack/react-query"
import { Percent } from "lucide-react"
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { DevTool } from "@hookform/devtools"
import { WEBSITE_LANGS } from "@/config"
import { cn } from "@/utils/cn"
import { z } from "zod"
import { handleFormError } from "@/utils/handle-form-errors"
import { PostAddCoupon } from "../post-add-coupon"

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
      render={({ field }) => {
        return (
          <TextInput
            className="grow"
            // @ts-expect-error name is a valid
            label={t(`coupons.add.form.${name}-input-label`)}
            // @ts-expect-error name is a valid
            placeholder={t(`coupons.add.form.${name}-input-placeholder`)}
            {...field}
            error={
              errors[name] &&
              (errors[name].type === "custom"
                ? (errors[name].message as string)
                : t(`coupons.add.form.errors.${errors[name].message as "required"}`))
            }
            {...props}
          />
        )
      }}
    />
  )
}

const AddCouponForm = () => {
  const { t } = useTranslation()
  const form = useForm<z.infer<typeof CouponSchema>>({
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      name: "", // Must be between 1 and 50 characters
      code: "", // Unique coupon code (between 1-50 characters)
      amount: 0, // Must be between 0 and 100000
      video_ids: [], // Array of video IDs; ensure these IDs exist in your videos table
      date_start: undefined, // Must be a valid date and after yesterday
      date_end: undefined, // Must be after date_start and in the correct format
      max_uses: 1, // Must be a number and max 100000
      max_customer_uses: 1, // Number of uses per customer, must be less than 1000
      type: "Percentage", // Must be one of the defined CouponType values
      langs: [], // Must be one or more of the defined Lang values
    },
  })

  const {
    control,
    formState: { errors, isSubmitting },
  } = form
  console.log("🚀 ~ AddCouponForm ~ errors:", errors)

  const { data: videos } = useQuery({
    queryKey: ["list", "videos"],
    queryFn: getVideos,
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await PostAddCoupon(data)
      console.log("🚀 ~ onSubmit ~ response:", response)
    } catch (error) {
      handleFormError(error, form)
    }
  })
  return (
    <FormProvider {...form}>
      <Stack component={"form"} onSubmit={onSubmit} w={"100%"}>
        <Group w={"100%"}>
          <Input name="code" />
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
                error={
                  errors.type &&
                  (errors.type?.type === "custom"
                    ? errors.type.message
                    : t(`coupons.add.form.errors.${errors.type.message as "required"}`))
                }>
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
                error={
                  errors.video_ids &&
                  (errors.video_ids?.type === "custom"
                    ? errors.video_ids.message
                    : t(`coupons.add.form.errors.${errors.video_ids.message as "required"}`))
                }>
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
                error={
                  errors.langs &&
                  (errors.type?.type === "custom"
                    ? errors.type.message
                    : t(`coupons.add.form.errors.${errors.langs.message as "required"}`))
                }
                {...field}>
                <Group gap={"xs"} mt="xs">
                  {WEBSITE_LANGS?.map((lang) => {
                    return (
                      <Checkbox.Card
                        key={lang}
                        radius="md"
                        value={lang}
                        className={cn(
                          "data-checked:!bg-[#E8FAFA] data-checked:!border-secondary group !w-fit !border-gray-200 !bg-white !px-4 !py-2",
                        )}>
                        <Group wrap="nowrap" align="flex-start">
                          <Checkbox.Indicator
                            color="secondary"
                            className="group-data-checked:!flex !hidden"
                          />
                          <Text className="group-data-checked:!text-secondary !text-gray-400" fw={500}>
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
                  error={
                    errors.date_start &&
                    t(`coupons.add.form.errors.${errors.date_start.message as "required"}`)
                  }
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
                  error={
                    errors.date_end && t(`coupons.add.form.errors.${errors.date_end.message as "required"}`)
                  }
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
          <Button type="submit" loading={isSubmitting} size="md" px={60}>
            {t("coupons.add.form.save-button")}
          </Button>
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

export default AddCouponForm