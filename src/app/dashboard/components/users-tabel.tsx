import Error from "@/components/common/error"
import Loader from "@/components/common/loader"
import PaginationCom from "@/components/common/pagination"
import { Badge, Box, Table, TableTh, TableThead } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router"

import { GetUsersInfo } from "../get-users"
import { couponStatus } from "../coupons/components/table"
import { VIDEO_COLORS } from "@/config"
const tableHead = ["id", "name", "program", "transaction"] as const

const UsersTable = () => {
  // const {data,isloading,isError} = useQuery
  const { t } = useTranslation()

  const [searchParams] = useSearchParams()

  const { data, status, error } = useQuery({
    queryKey: ["home", "users", searchParams.toString()],
    queryFn: async () => await GetUsersInfo(searchParams),
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
                return <TableTh key={element}>{t(`home.users.table.${element}`)}</TableTh>
              })}
            </Table.Tr>
          </TableThead>
          <Table.Tbody>
            {status === "error" ? <Error error={error} /> : null}
            {status === "success"
              ? data.items.data.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>{user.id}</Table.Td>
                    <Table.Td>{user.name}</Table.Td>
                    <Table.Td>
                      <Badge
                        color={VIDEO_COLORS[Number(user.video_id)]}
                        // rightSection={
                        //   <Box
                        //     bg={VIDEO_COLORS[Number(user.video_id)]}
                        //     className="size-1.5 rounded-full"></Box>
                        // }
                      >
                        {user.program}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={user.transaction.payment_status === "Completed" ? "red" : "green"}
                        rightSection={
                          <Box
                            bg={user.transaction.payment_status === "Completed" ? "red" : "green"}
                            className="size-1.5 rounded-full"></Box>
                        }>
                        {user.transaction.payment_status}
                      </Badge>
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

export default UsersTable
