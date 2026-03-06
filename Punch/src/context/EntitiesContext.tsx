import { createContext, useContext, useState } from 'react'
import type { Entity } from '../Objects/Entity'

interface EntitiesContextType {
  entities: Entity[]
  setEntities: React.Dispatch<React.SetStateAction<Entity[]>>
}

const EntitiesContext = createContext<EntitiesContextType | null>(null)

interface EntitiesProviderProps {
  children: React.ReactNode
  defaultEntities: Entity[]
}

export function EntitiesProvider({ children, defaultEntities }: EntitiesProviderProps) {
  const [entities, setEntities] = useState<Entity[]>(defaultEntities)

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