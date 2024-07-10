"use client"

import { Container } from "~/components/ui/container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

type TabsTriggers = "lessons" | "reviews" | "school" | "settings"
const tabsTriggers = [
  {
    id: 1,
    title: "Zajęcia",
    value: "lessons",
  },
  {
    id: 2,
    title: "Opinie",
    value: "reviews",
  },
  {
    id: 3,
    title: "Szkoła",
    value: "school",
  },
  {
    id: 4,
    title: "Ustawienia",
    value: "settings",
  },
]

const ProfileTabsContent = () => {
  return (
    <>
      <TabsContent value="lessons" className="card">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">test</div>
      </TabsContent>
      <TabsContent value="reviews" className="card">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">test</div>
      </TabsContent>
      <TabsContent value="school" className="card">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">test</div>
      </TabsContent>
      <TabsContent value="settings" className="card">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">test</div>
      </TabsContent>
    </>
  )
}
export default function ProfilePage() {
  return (
    <Container className="min-h-screen">
      <div className="flex flex-col gap-8 pt-6 md:flex-row md:justify-center">
        <section className="gap-0 sm:gap-4 md:w-2/3">
          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="flex justify-between">
              {tabsTriggers.map((tab, index) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.value}
                  className={`${
                    index === 1
                      ? "border-x-2"
                      : index !== tabsTriggers.length - 1
                        ? "border-r-2"
                        : "hidden border-0 sm:block"
                  }`}
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="h-6" />
            <ProfileTabsContent />
          </Tabs>
        </section>
        <section className="card md:w-1/3"></section>
      </div>
      <div className="h-16" />
    </Container>
  )
}
