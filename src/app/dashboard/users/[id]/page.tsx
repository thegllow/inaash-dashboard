import { useParams } from "@/lib/i18n/navigation"
import { ActionIcon, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Pen } from "lucide-react"
import { useTranslation } from "react-i18next"
import { GetUser } from "./get-user"
import { User } from "../types"

const DataCell = ({ keyToRender, user }: { keyToRender: keyof User; user: User }) => {
  const { t } = useTranslation()
  return (
    <div>
      <Text c="gray.8">{t(`users.view.${keyToRender as "full_name"}`)}</Text>
      <Text size="lg" fw={500}>
        {user[keyToRender]}
      </Text>
    </div>
  )
}
const ViewUser = () => {
  const { id } = useParams() as { id: string }
  const { data: user } = useSuspenseQuery({
    queryKey: ["user", id],
    queryFn: () => GetUser(id),
  })

  const { t } = useTranslation()
  const keysToRender = ["id", "full_name", "mobile", "lang", "email"] as const
  return (
    <Stack>
      <div className="rounded-lg bg-white ~p-3/5">
        <Group justify="space-between" mb={"lg"}>
          <Group gap="xs">
            <Title order={3}>{t("users.view.title")}</Title>
          </Group>
          <ActionIcon variant="subtle" size={"lg"} color="gray">
            <Pen size={18} />
          </ActionIcon>
        </Group>
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          {keysToRender.map((e) => {
            return <DataCell user={user} key={e} keyToRender={e} />
          })}
        </SimpleGrid>
      </div>
      <SimpleGrid cols={{ base: 1, md: 2 }}></SimpleGrid>
    </Stack>
  )
}

export default ViewUser
