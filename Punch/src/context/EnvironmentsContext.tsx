import { createContext, useContext, useState } from 'react'

interface EnvironmentsContextType {
  environments: string[];
  setEnvironments: React.Dispatch<React.SetStateAction<string[]>>;
  selectedEnvironment: string; 
  setSelectedEnvironment: React.Dispatch<React.SetStateAction<string>>;
}

const EnvironmentsContext = createContext<EnvironmentsContextType | null>(null)

interface EnvironmentsProviderProps {
  children: React.ReactNode
}

export function EnvironmentsProvider({ children }: EnvironmentsProviderProps) {
  const [environments, setEnvironments] = useState<string[]>([])
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('')

  return (
    <EnvironmentsContext.Provider value={{ environments, setEnvironments, selectedEnvironment, setSelectedEnvironment }}>
      {children}
    </EnvironmentsContext.Provider>
  )
}

export function useEnvironments() {
  const context = useContext(EnvironmentsContext)
  if (!context) throw new Error('useEnvironments must be used within an EnvironmentsProvider')
  return context
}