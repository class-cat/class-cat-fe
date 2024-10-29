import React from 'react'
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { ROUTES } from "~/lib/const"

const CompanyOffer = () => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-4 border-t-2 border-secondary text-center max-md:hidden">
      <div className="md:h-32" />
      <h4>Oferta dla firm</h4>
      <Link href={ROUTES.COMPANY.ROOT}>
        <Button variant={"outline"} size={"lg"} className="w-full md:w-40">
          Sprawdź szczegóły
        </Button>
      </Link>
    </div>
  )
}

export default CompanyOffer