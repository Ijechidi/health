import React from "react"
import HopitalCard from "./HopitalCard"
import { hopitaux } from "./mockHotipal"

export default function HopitalList() {



  return (
    <div className="p-6 mx-auto">
 <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
  Liste des Hôpitaux
</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hopitaux.map((hopital) => (
          <HopitalCard key={hopital.id} {...hopital} />
        ))}
      </div>
    </div>
  )
}
