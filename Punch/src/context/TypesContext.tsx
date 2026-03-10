import { createContext, useContext, useState } from 'react'
import type { EntityTypeSchema } from '../DTOs/entity/entityType/EntityTypeSchema'

interface TypesContextType {
  baseTypes: EntityTypeSchema[]
  setBaseTypes: React.Dispatch<React.SetStateAction<EntityTypeSchema[]>>
  types: EntityTypeSchema[]
  setTypes: React.Dispatch<React.SetStateAction<EntityTypeSchema[]>>
}

const TypesContext = createContext<TypesContextType | null>(null)

interface TypesProviderProps {
    defaultTypes: EntityTypeSchema[];
    defaultBaseTypes: EntityTypeSchema[];
  children: React.ReactNode;
}

export function TypesProvider({ children, defaultTypes, defaultBaseTypes }: TypesProviderProps) {
  const [baseTypes, setBaseTypes] = useState<EntityTypeSchema[]>(defaultBaseTypes)
  const [types, setTypes] = useState<EntityTypeSchema[]>(defaultTypes)

  return (
    <TypesContext.Provider value={{ baseTypes, setBaseTypes, types, setTypes }}>
      {children}
    </TypesContext.Provider>
  )
}

export function useTypes() {
  const context = useContext(TypesContext)
  if (!context) throw new Error('useTypes must be used within a TypesProvider')
  return context
}