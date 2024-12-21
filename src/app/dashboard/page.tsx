import { BarChart, DonutChart, LineChart } from "@mantine/charts"
import { Box, Divider, Group, Paper, SegmentedControl, Select, SimpleGrid, Stack, Text } from "@mantine/core"
import { useSuspenseQueries } from "@tanstack/react-query"
import { CircleDollarSign, GraduationCap, Users } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import UsersInfo from "./components/users-info"
import { GetGeneralStatistics } from "./get-general-statistics"
import { GetRevenueGraph } from "./get-revenue-graph"
import { GetUserGraph } from "./get-user-graph"
import { GeneralStatisticsResponse, UserGraphResponse } from "./types"
import { VIDEO_COLORS } from "@/config"

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

const GraphType = ["hourly", "daily", "weekly", "monthly", "yearly"] as const

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
      {
        queryKey: ["home", "revenueGraph"],
        queryFn: GetRevenueGraph,
      },
    ],
  })

  const generalStatisticsQuery = queries[0]
  const userGraphQuery = queries[1]
  const revenueGraphQuery = queries[2]

  // group type
  const [type, setType] = useState<(typeof GraphType)[number]>("weekly")
  const [revenueGraphType, setRevenueGraphType] = useState<(typeof GraphType)[number]>("monthly")
  return (
    <Stack gap={"lg"}>
      <SimpleGrid spacing="lg" cols={{ base: 1, md: 3 }}>
        {generalStatistics.map((e) => {
          return <DataCell key={e.key} keyToRender={e} statistics={generalStatisticsQuery.data} />
        })}
      </SimpleGrid>
      <Paper component={Stack} gap={"lg"} p="lg" radius="md">
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            {t("home.user-graph.title")}
          </Text>
          <SegmentedControl
            value={type}
            onChange={(value) => setType(value as keyof UserGraphResponse["data"]["graph"])}
            data={[
              {
                label: t("home.graph-type.weekly"),
                value: "weekly",
              },
              {
                label: t("home.graph-type.monthly"),
                value: "monthly",
              },
              {
                label: t("home.graph-type.yearly"),
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
      <Group align="stretch" wrap="nowrap" className="max-sm:!flex-col-reverse" gap={"lg"}>
        <Paper component={Stack} gap={"lg"} className="max-sm:w-full" p="lg" shadow="sm" radius="md">
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              {t("home.certificates-statistics.title")}
            </Text>
          </Group>
          <Divider color="gray.1" />
          <Group justify="center" px={"xl"} align="center" h={"100%"}>
            <DonutChart
              size={142}
              thickness={18}
              strokeWidth={0}
              withTooltip={false}
              chartLabel={`${t(`home.statistics.total_certificates`)} ${generalStatisticsQuery.data.total_certificates}`}
              data={generalStatisticsQuery.data.total_certificates_statistics.map((value) => ({
                name: value.x,
                value: value.y,
                color: VIDEO_COLORS[Number(value.video_id)],
              }))}
            />
          </Group>
          <Group justify="center">
            {generalStatisticsQuery.data.total_certificates_statistics.map((value) => {
              return (
                <Stack key={value.video_id} gap={0} justify="center">
                  <Group justify="center">
                    <Box bg={VIDEO_COLORS[Number(value.video_id)]} className="size-1.5 rounded-full"></Box>
                    <Text size="sm" fw={600}>
                      {value.y}
                    </Text>
                  </Group>
                  <Text size="xs" c={"gray"}>
                    {value.y}
                  </Text>
                </Stack>
              )
            })}
          </Group>
        </Paper>
        <Paper component={Stack} gap={"lg"} p="lg" className="grow" radius="md">
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              {t("home.revenue-graph.title")}
            </Text>
            <Select
              size="sm"
              value={revenueGraphType}
              onChange={(value) => setRevenueGraphType(value as (typeof GraphType)[number])}
              className="max-w-32"
              variant="filled"
              data={GraphType.map((value) => {
                return {
                  label: t(`home.graph-type.${value}`),
                  value: value,
                }
              })}
            />
          </Group>
          <Divider color="gray.1" />
          <BarChart
            h={210}
            data={revenueGraphQuery["data"][revenueGraphType]}
            dataKey={"x"}
            series={[{ name: "y", label: t("home.revenue-graph.y-axis-label"), color: "#18BDBE" }]}
            barProps={{ radius: [10, 10, 0, 0] }}
            tickLine="y"
            yAxisLabel={t("home.revenue-graph.y-axis-label")}
          />
        </Paper>
      </Group>

      <UsersInfo />
    </Stack>
  )
}

export default Home
