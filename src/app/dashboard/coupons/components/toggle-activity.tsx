import { Switch } from "@mantine/core"
import React, { useState } from "react"

import { Coupon, CouponsResponse } from "../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { PostToggleActivity } from "../toggle-activity"
import { notifications } from "@mantine/notifications"
import { useTranslation } from "react-i18next"
type Props = {
  coupon: Coupon
}

const ToggleActivity = ({ coupon }: Props) => {
  const { t } = useTranslation()
  const [state, setState] = useState(coupon.status === "Active")
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const filter = {
    queryKey: ["coupons", searchParams.toString()],
  }
  const CouponToggledStatus = {
    Active: "Inactive",
    Inactive: "Active",
  } as const
  const { mutate } = useMutation({
    mutationFn: PostToggleActivity,
    onMutate(variables) {
      queryClient.cancelQueries(filter)
      queryClient.setQueryData<CouponsResponse["data"]["items"]>(filter.queryKey, (oldData) => {
        if (!oldData) return
        return {
          ...oldData,
          data: oldData.data.map((coupon) => {
            if (coupon.id == variables.id)
              return { ...coupon, status: CouponToggledStatus[coupon.status as "Active" | "Inactive"] }
            return coupon
          }),
        }
      })
    },
    onError(error) {
      queryClient.invalidateQueries(filter)
      setState((pre) => !pre)
      notifications.show({
        radius: "xs",
        color: "white",
        title: t(`coupons.toggle-error`),
        message: error.message,
        classNames: {
          title: "!text-white",
          description: "!text-white",
          root: "!bg-red-500",
        },
      })
    },
  })

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const isCheck = e.currentTarget.checked

    setState(isCheck)
    mutate({
      id: coupon.id,
      status: isCheck ? "true" : "false",
    })
  }
  return (
    <div>
      <Switch checked={state} onChange={handleChange} />
    </div>
  )
}

export default ToggleActivity
