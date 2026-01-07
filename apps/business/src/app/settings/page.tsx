"use client"

import { Container, Button } from "@class-cat/ui"

export default function SettingsPage() {
  return (
    <Container className="h-full flex-1 py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Ustawienia</h1>
          <p className="text-foregroundMuted mt-2">
            Zarządzaj ustawieniami swojej firmy
          </p>
        </div>

        <div className="space-y-6">
          <div className="cardSmall">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Ustawienia konta</h2>
              <p className="text-sm text-foregroundMuted">
                Zarządzaj podstawowymi informacjami o firmie
              </p>
              <Button variant="outline" className="w-full">
                Edytuj profil firmy
              </Button>
            </div>
          </div>

          <div className="cardSmall">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Powiadomienia</h2>
              <p className="text-sm text-foregroundMuted">
                Ustawienia powiadomień będą dostępne wkrótce.
              </p>
            </div>
          </div>

          <div className="cardSmall">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Bezpieczeństwo</h2>
              <p className="text-sm text-foregroundMuted">
                Zarządzaj bezpieczeństwem konta
              </p>
              <Button variant="outline" className="w-full">
                Zmień hasło
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

