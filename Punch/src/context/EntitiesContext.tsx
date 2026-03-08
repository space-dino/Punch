import { createContext, useContext, useState } from 'react'
import type { EntityWithRelations } from '../DTOs/entity/EntityWithRelations'

interface EntitiesContextType {
  entities: EntityWithRelations[]
  setEntities: React.Dispatch<React.SetStateAction<EntityWithRelations[]>>
}

const EntitiesContext = createContext<EntitiesContextType | null>(null)

interface EntitiesProviderProps {
  children: React.ReactNode
  defaultEntities: EntityWithRelations[]
}

export function EntitiesProvider({ children, defaultEntities }: EntitiesProviderProps) {
  const [entities, setEntities] = useState<EntityWithRelations[]>(defaultEntities)

  return (
    <EntitiesContext.Provider value={{ entities, setEntities }}>
      {children}
    </EntitiesContext.Provider>
  )
}

export function useEntities() {
  const context = useContext(EntitiesContext)
  if (!context) throw new Error('useEntities must be used within an EntitiesProvider')
  return context
}