import { ViewModeProvider } from "@/hooks/use-view-mode"
import { HomeWithViewMode } from "@/components/portfolio/home-with-view-mode"

export default function Home() {
  return (
    <ViewModeProvider>
      <HomeWithViewMode />
    </ViewModeProvider>
  )
}
