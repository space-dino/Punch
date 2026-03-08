import { createContext, useContext, useState } from 'react'
import type { EntityTypeSchema } from '../DTOs/entity/entityType/EntityTypeSchema'

interface TypesContextType {
  types: EntityTypeSchema[]
  setTypes: React.Dispatch<React.SetStateAction<EntityTypeSchema[]>>
}

const TypesContext = createContext<TypesContextType | null>(null)

interface TypesProviderProps {
    defaultTypes: EntityTypeSchema[];
  children: React.ReactNode;
}

export function TypesProvider({ children, defaultTypes }: TypesProviderProps) {
  const [types, setTypes] = useState<EntityTypeSchema[]>(defaultTypes)

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