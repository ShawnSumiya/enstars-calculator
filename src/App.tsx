import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { EventCalculator } from './components/EventCalculator'
import { GachaCalculator } from './components/GachaCalculator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-navy">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs defaultValue="event" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="event">イベント計算</TabsTrigger>
              <TabsTrigger value="gacha">ガチャ計算</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="event">
            <EventCalculator />
          </TabsContent>
          <TabsContent value="gacha">
            <GachaCalculator />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}

export default App
