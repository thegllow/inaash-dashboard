import { Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core"
import { useSuspenseQuery } from "@tanstack/react-query"
import { CircleDollarSign, GraduationCap, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import { GetGeneralStatistics } from "./get-general-statistics"
import { GeneralStatisticsResponse } from "./types"

const generalStatistics = [
  {
    key: "total_certificates",
    Icon: GraduationCap,
    unit: null,
  },
  {
    key: "total_revenue",
    Icon: CircleDollarSign,
    unit: "SAR",
  },
  {
    key: "total_users",
    Icon: Users,
    unit: null,
  },
] as const

const DataCell = ({
  keyToRender,
  statistics,
}: {
  keyToRender: (typeof generalStatistics)[number]
  statistics: GeneralStatisticsResponse["data"]
}) => {
  const { t } = useTranslation()
  const { Icon } = keyToRender
  return (
    <Paper component={Group} p="lg" radius={"md"} wrap="nowrap">
      <div className="flex size-16 items-center justify-center rounded-full border border-secondary bg-[var(--mantine-color-secondary-1)]">
        <Icon strokeWidth={1.2} className="text-secondary" />
      </div>
      <Stack gap={0}>
        <Text size="xs" fw={500} c="gray.8">
          {t(`home.statistics.${keyToRender.key}`)}
        </Text>
        <Text size="xl" fw={600}>
          {statistics[keyToRender.key]} {keyToRender.unit}
        </Text>
      </Stack>
    </Paper>
  )
}

const Home = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["home", "generalStatistics"],
    queryFn: GetGeneralStatistics,
  })
  return (
    <Stack>
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        {generalStatistics.map((e) => {
          return <DataCell key={e.key} keyToRender={e} statistics={data} />
        })}
      </SimpleGrid>
    </Stack>
  )
}

export default Home
