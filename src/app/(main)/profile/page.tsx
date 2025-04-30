import { Container } from "~/components/ui/container"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { tabsTriggers } from "./_components/constants"
import { ProfileTabsContent } from "./_components/profile-tabs-content"
import { ProfileForm } from "./_components/profile-form"

export default function ProfilePage() {
  return (
    <Container className="min-h-screen">
      <div className="flex flex-col gap-8 pt-6 lg:flex-row lg:justify-center">
        <section className="gap-0 sm:gap-4 lg:w-2/3">
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
        <ProfileForm />
      </div>
      <div className="h-16" />
    </Container>
  )
}
