import { Icons } from "~/components/icons"
import { TopNav } from "~/components/topnav/topnav"
import { Card, CardContent } from "~/components/ui/card"

interface RootLayoutProps {
  children: React.ReactNode
}

const arrayOfInformations = [
  {
    label: "Łatwy system zarządzania",
    description:
      "Zarządzaj swoimi zajęciami szybko i sprawnie. Dodawaj, edytuj oraz usuwaj zajęcia w intuicyjnym panelu.",
    icon: <Icons.settings className="mr-6 size-12 text-primary" />,
  },
  {
    label: "Profil firmy",
    description:
      "Stwórz profesjonalny profil swojej firmy, prezentuj swoją ofertę i wyróżniaj się wśród konkurencji.",
    icon: <Icons.briefcase className="mr-6 size-12 text-primary" />,
  },
  {
    label: "Lepsza widoczność",
    description:
      "Zwiększ zasięg swoich zajęć poprzez nasze narzędzia reklamowe i dotrzyj do nowych klientów.",
    icon: <Icons.megaphone className="mr-6 size-12 text-primary" />,
  },
  {
    label: "Analiza wyników",
    description:
      "Monitoruj statystyki swoich zajęć i oceniaj ich popularność dzięki rozbudowanym narzędziom analitycznym.",
    icon: <Icons.globe className="mr-6 size-12 text-primary" />,
  },
]

export default function Layout({ children }: RootLayoutProps) {
  return (
    <div className="paddingX flex min-h-screen flex-col bg-white">
      <TopNav />
      <div className="flex grow items-center justify-center px-4 py-8">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-full max-w-xl">
                <div className="mb-8 text-left">
                  <h1 className="text-3xl font-semibold">
                    Stwóz konto swojej firmy
                    <br />i zacznij dodawać zajęcia!
                  </h1>
                </div>
                <div className="space-y-4">
                  {arrayOfInformations.map((card) => {
                    return (
                      <Card
                        key={card.label}
                        className="w-full border-secondary bg-[#fff] shadow-sm"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            {card.icon}
                            <div>
                              <p className="inline font-semibold text-primary">
                                {card.label}
                              </p>
                              <p className="text-sm text-foregroundMuted">
                                {card.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="flex justify-center">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
