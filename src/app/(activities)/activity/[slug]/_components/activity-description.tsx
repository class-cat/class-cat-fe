interface ActivityDescriptionProps {
  description: string
}

export function ActivityDescription({ description }: ActivityDescriptionProps) {
  return (
    <section>
      <h4 className="mb-4 text-2xl">Opis zajęć</h4>
      <p>{description}</p>
    </section>
  )
} 