import { createContext, useContext, useState } from 'react'
import type { EntityType } from '../Objects/EntityType'

interface TypesContextType {
  types: EntityType[]
  setTypes: React.Dispatch<React.SetStateAction<EntityType[]>>
}

const TypesContext = createContext<TypesContextType | null>(null)

interface TypesProviderProps {
    defaultTypes: EntityType[];
  children: React.ReactNode;
}

export function TypesProvider({ children, defaultTypes }: TypesProviderProps) {
  const [types, setTypes] = useState<EntityType[]>(defaultTypes)

  return (
    <TypesContext.Provider value={{ types, setTypes }}>
      {children}
    </TypesContext.Provider>
  )
}

export function useTypes() {
  const context = useContext(TypesContext)
  if (!context) throw new Error('useTypes must be used within a TypesProvider')
  return context
}