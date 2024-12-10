import { TextInput, TextInputProps } from "@mantine/core"
import { useDebouncedCallback } from "@mantine/hooks"
import { Search } from "lucide-react"
import { parseAsString, useQueryState } from "nuqs"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  key?: string
} & Omit<TextInputProps, "onChange" | "value">

const SearchInput = ({ key, ...props }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setQuery] = useQueryState(key || "q", parseAsString.withDefault(""))
  const [state, setState] = useState("")
  const handleSearch = useDebouncedCallback((value: string) => {
    setQuery(value)
  }, 500)
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setState(value)
    handleSearch(value)
  }
  const { t } = useTranslation()
  return (
    <TextInput
      maw={240}
      size="sm"
      placeholder={t("global.search")}
      leftSection={<Search className="size-5" />}
      value={state}
      onChange={handleChange}
      {...props}
    />
  )
}

export default SearchInput
