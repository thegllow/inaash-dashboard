import Loader from "@/components/common/loader"
import { useSmallScreen } from "@/hooks/use-small-screen"
import { getNotifications } from "@/services/utils/get-notifications"
import {
  ActionIcon,
  Avatar,
  Badge,
  CloseButton,
  Group,
  Indicator,
  Popover,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { Bell } from "lucide-react"
import { useTranslation } from "react-i18next"
import Error from "./error"
import InfiniteScrollContainer from "./infinte-scroll-container"

const UserNotifications = () => {
  const sm = useSmallScreen()
  const { t } = useTranslation()
  const [opened, { open, close, toggle }] = useDisclosure()

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, error } =
    useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: ({ pageParam }) => getNotifications({ page: pageParam }),
      initialPageParam: "1",
      getNextPageParam: (lastPage) => {
        return lastPage.meta.last_page == lastPage.meta.current_page
          ? null
          : Number(lastPage.meta.current_page) + 1 + ""
      },
    })

  // const queryClient = useQueryClient()

  const notifications = data?.pages.flatMap((page) => page.data) || []
  return (
    <>
      <Popover
        opened={opened}
        onChange={toggle}
        shadow="lg"
        width={sm ? "70%" : 490}
        position="bottom"
        withArrow>
        <Popover.Target>
          <Indicator color="red">
            <ActionIcon onClick={open} variant="white">
              <Bell size={20} />
            </ActionIcon>
          </Indicator>
        </Popover.Target>
        <Popover.Dropdown className="!border-none" p="0">
          <Group p="md" justify="space-between">
            <Group gap={"xs"}>
              <Title order={4}>{t("notifications.title")}</Title>
              <Badge dir="ltr" size="lg" circle color="primary" variant="light">
                <span>100</span>
              </Badge>
            </Group>
            <CloseButton onClick={close} />
          </Group>

          <ScrollArea h={400} w={"100%"}>
            {status === "pending" ? <Loader size={"sm"} /> : null}
            {status === "error" ? <Error error={error} /> : null}
            <InfiniteScrollContainer
              className="divide-y"
              onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
              {notifications.map((notification, index) => (
                <Group
                  className="p-3 duration-200 hover:bg-gray-100"
                  align="start"
                  key={notification.id + index}>
                  <Avatar />
                  <Stack gap={"xs"} className="grow">
                    <Text>{notification.name}</Text>
                    <Text c={"gary.5"} size="sm">
                      {dayjs(new Date(notification.date)).format("DD/MM/YYYY")}
                    </Text>
                    <Badge size="sm" variant="outline" color="gray">
                      {notification.name}
                    </Badge>
                  </Stack>
                  <Stack className="self-end" justify="end">
                    <Text c={"gray"} size="xs">
                      {dayjs(new Date(notification.date)).format("DD/MM/YYYY")}
                    </Text>
                  </Stack>
                </Group>
              ))}
              {isFetchingNextPage && <Loader size="sm" />}
            </InfiniteScrollContainer>
          </ScrollArea>
        </Popover.Dropdown>
      </Popover>
    </>
  )
}

export default UserNotifications
