"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { businessProfiles, type BusinessProfile, type BusinessType } from "../data/business-profiles"

interface BusinessContextValue {
  businessType: BusinessType
  setBusinessType: (type: BusinessType) => void
  profile: BusinessProfile
}

const BusinessContext = createContext<BusinessContextValue | undefined>(undefined)

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [businessType, setBusinessType] = useState<BusinessType>("hairsalon")
  const profile = businessProfiles[businessType]

  return (
    <BusinessContext.Provider value={{ businessType, setBusinessType, profile }}>
      {children}
    </BusinessContext.Provider>
  )
}

export function useBusiness() {
  const context = useContext(BusinessContext)
  if (!context) {
    throw new Error("useBusiness must be used within a BusinessProvider")
  }
  return context
}
