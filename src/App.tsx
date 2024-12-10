import { DirectionProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { NuqsAdapter } from "nuqs/adapters/react-router"
import { useTranslation } from "react-i18next"
import Router from "./router"

const queryClient = new QueryClient()
function App() {
  const { i18n } = useTranslation()
  const dir = i18n.dir()
  document.documentElement.dir = dir

  return (
    <DirectionProvider initialDirection={dir} detectDirection>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <Router />
        </NuqsAdapter>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </DirectionProvider>
  )
}

export default App
