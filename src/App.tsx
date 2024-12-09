import { useTranslation } from "react-i18next"
import Router from "./router"
import { DirectionProvider } from "@mantine/core"

function App() {
  const { i18n } = useTranslation()
  const dir = i18n.dir()
  document.documentElement.dir = dir

  return (
    <DirectionProvider initialDirection={dir} detectDirection>
      <Router />
    </DirectionProvider>
  )
}

export default App
