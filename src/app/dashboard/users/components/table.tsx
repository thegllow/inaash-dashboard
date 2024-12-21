import Error from "@/components/common/error"
import Loader from "@/components/common/loader"
import PaginationCom from "@/components/common/pagination"
import { ActionIcon, Badge, Box, Button, Popover, Stack, Table, TableTh, TableThead } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { Edit2, MoreVertical, Trash2, User } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router"
import { GetUsers } from "../get-users"
import { Link } from "@/lib/i18n/navigation"
const tableHead = ["id", "name", "mobile", "program", "lang", "more"] as const
export const langs = {
  ar: {
    color: "green",
  },
  en: {
    color: "blue",
  },
  fr: {
    color: "red",
  },
  fil: {
    color: "gray",
  },
  id: {
    color: "pink",
  },
  ur: {
    color: "yellow",
  },
}

const TableCom = () => {
  // const {data,isloading,isError} = useQuery
  const { t } = useTranslation()

  const [searchParams] = useSearchParams()

  const { data, status, error } = useQuery({
    queryKey: ["users", searchParams.toString()],
    queryFn: async () => await GetUsers(searchParams),
    // placeholderData: keepPreviousData,
  })
  if (status === "pending") return <Loader />

  return (
    <>
      <Table.ScrollContainer minWidth={800}>
        <Table
          highlightOnHover
          highlightOnHoverColor="#f6f6f6"
          className="overflow-hidden rounded-md bg-white">
          <TableThead>
            <Table.Tr>
              {tableHead.map((element) => {
                return <TableTh key={element}>{t(`users.table.${element}`)}</TableTh>
              })}
            </Table.Tr>
          </TableThead>
          <Table.Tbody>
            {status === "error" ? <Error error={error} /> : null}
            {status === "success"
              ? data.items.data.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>{user.id}</Table.Td>
                    <Table.Td>{user.full_name}</Table.Td>
                    <Table.Td>{user.mobile}</Table.Td>
                    <Table.Td>program</Table.Td>
                    <Table.Td>
                      <Badge
                        color={langs[user.lang].color}
                        rightSection={
                          <Box bg={langs[user.lang].color} className="size-1.5 rounded-full"></Box>
                        }>
                        {t(`langs.${user.lang}`)}
                      </Badge>
                    </Table.Td>

                    <Table.Td>
                      <Popover width={170} shadow="lg" position="left-start">
                        <Popover.Target>
                          <ActionIcon variant="subtle" color="gray" aria-label="Settings">
                            <MoreVertical />
                          </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown className="!border-none" p="xs">
                          <Stack gap={"xs"}>
                            <Button
                              variant="subtle"
                              size="sm"
                              component={Link}
                              to={`/dashboard/users/${user.id}`}
                              color="black"
                              justify="start"
                              leftSection={<User size={20} />}>
                              {t("global.details")}
                            </Button>
                            <Button
                              variant="subtle"
                              size="sm"
                              color="black"
                              justify="start"
                              leftSection={<Edit2 size={20} />}>
                              {t("global.edit")}
                            </Button>
                            <Button
                              color="red"
                              variant="subtle"
                              size="sm"
                              justify="start"
                              leftSection={<Trash2 size={20} />}>
                              {t("global.delete")}
                            </Button>
                          </Stack>
                        </Popover.Dropdown>
                      </Popover>
                    </Table.Td>
                  </Table.Tr>
                ))
              : null}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <PaginationCom last_page={data?.items.meta.last_page} />
    </>
  )
}

export default TableCom
