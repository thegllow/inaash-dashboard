import { LineChart } from "@mantine/charts"
import { Divider, Group, Paper, SegmentedControl, SimpleGrid, Stack, Text } from "@mantine/core"
import { useSuspenseQueries } from "@tanstack/react-query"
import { CircleDollarSign, GraduationCap, Users } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { GetGeneralStatistics } from "./get-general-statistics"
import { GetUserGraph } from "./get-user-graph"
import { GeneralStatisticsResponse, UserGraphResponse } from "./types"

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
  const { t } = useTranslation()
  const queries = useSuspenseQueries({
    queries: [
      { queryKey: ["home", "generalStatistics"], queryFn: GetGeneralStatistics },
      {
        queryKey: ["home", "userGraph"],
        queryFn: GetUserGraph,
      },
    ],
  })

  const generalStatisticsQuery = queries[0]
  const userGraphQuery = queries[1]

  // group type
  const [type, setType] = useState<keyof UserGraphResponse["data"]["graph"]>("weekly")
  return (
    <Stack>
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        {generalStatistics.map((e) => {
          return <DataCell key={e.key} keyToRender={e} statistics={generalStatisticsQuery.data} />
        })}
      </SimpleGrid>
      <Paper component={Stack} gap={"lg"} p="lg" radius="md">
        <Group justify="space-between">
          <Text size="lg" fw={500}>
            {t("home.user-graph.title")}
          </Text>
          <SegmentedControl
            value={type}
            onChange={(value) => setType(value as keyof UserGraphResponse["data"]["graph"])}
            data={[
              {
                label: t("home.user-graph.weekly"),
                value: "weekly",
              },
              {
                label: t("home.user-graph.monthly"),
                value: "monthly",
              },
              {
                label: t("home.user-graph.yearly"),
                value: "yearly",
              },
            ]}
          />
        </Group>
        <Divider color="gray.1" />
        <div>
          <LineChart
            h={300}
            data={userGraphQuery["data"][type]}
            dataKey={"x"}
            withLegend
            yAxisLabel={t("home.user-graph.y-axis-label")}
            series={[
              { name: "y_ar", label: t("langs.ar"), color: "#18BDBE" },
              { name: "y_en", label: t("langs.en"), color: "#F16238" },
              { name: "y_ur", label: t("langs.ur"), color: "#9156E6" },
              { name: "y_fr", label: t("langs.fr"), color: "#3E4142" },
              { name: "y_fil", label: t("langs.fil"), color: "#4642E7" },
              { name: "y_id", label: t("langs.id"), color: "yellow.5" },
            ]}
            curveType="monotone"
          />
        </div>
      </Paper>
    </Stack>
  )
}

export default Home
