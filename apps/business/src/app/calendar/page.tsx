"use client"

import { Container } from "@class-cat/ui"
import { CalendarView } from "./_components/calendar-view"

export default function CalendarPage() {
  return (
    <Container className="h-full flex-1 py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Kalendarz</h1>
          <p className="text-foregroundMuted mt-2">
            Zarządzaj harmonogramem zajęć i rezerwacjami
          </p>
        </div>

        <CalendarView />
      </div>
    </Container>
  )
}

