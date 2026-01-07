"use client"

import { Container } from "@class-cat/ui"
import { Icons } from "~/components/icons"
import Link from "next/link"
import { ROUTES } from "~/lib/const"

export default function DashboardPage() {
  return (
    <Container className="h-full flex-1 py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-foregroundMuted mt-2">
            Witaj w panelu zarządzania Twoją firmą
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="cardSmall">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">
                Aktywne zajęcia
              </h3>
              <Icons.calendar className="h-4 w-4 text-foregroundMuted" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-foregroundMuted">
                Brak aktywnych zajęć
              </p>
            </div>
          </div>

          <div className="cardSmall">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Pracownicy</h3>
              <Icons.users className="h-4 w-4 text-foregroundMuted" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-foregroundMuted">
                Brak pracowników
              </p>
            </div>
          </div>

          <div className="cardSmall">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Rezerwacje</h3>
              <Icons.calendar className="h-4 w-4 text-foregroundMuted" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-foregroundMuted">
                Brak rezerwacji
              </p>
            </div>
          </div>

          <div className="cardSmall">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Przychód</h3>
              <Icons.barChart className="h-4 w-4 text-foregroundMuted" />
            </div>
            <div className="pt-2">
              <div className="text-2xl font-bold">0 zł</div>
              <p className="text-xs text-foregroundMuted">
                Brak przychodu
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="cardSmall">
            <div className="pb-4">
              <h3 className="text-xl font-semibold">Ostatnie aktywności</h3>
            </div>
            <div>
              <p className="text-sm text-foregroundMuted">
                Brak ostatnich aktywności
              </p>
            </div>
          </div>

          <div className="cardSmall">
            <div className="pb-4">
              <h3 className="text-xl font-semibold">Szybkie akcje</h3>
            </div>
            <div className="space-y-2">
              <Link
                href={ROUTES.CALENDAR}
                className="flex w-full items-center text-left text-sm p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Icons.add className="mr-2 h-4 w-4" />
                Dodaj nowe zajęcia
              </Link>
              <Link
                href={ROUTES.EMPLOYEES}
                className="flex w-full items-center text-left text-sm p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Icons.users className="mr-2 h-4 w-4" />
                Zarządzaj pracownikami
              </Link>
              <Link
                href={ROUTES.CALENDAR}
                className="flex w-full items-center text-left text-sm p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Icons.calendar className="mr-2 h-4 w-4" />
                Zobacz kalendarz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

