import React, { useState } from 'react'
import TextBox from '../../Components/TextBox/TextBox'
import { useEnvironments } from '../../context/EnvironmentsContext'

interface EnvironmentEditorProps {

}

const EnvironmentEditor : React.FC<EnvironmentEditorProps> = (props : EnvironmentEditorProps) => {
  const { environments, setEnvironments } = useEnvironments();
  const [newEnvironment, setNewEnvironment] = useState<string>('');

  const addNewEnvironment = () => {
    setEnvironments(prev => [...prev, newEnvironment]);
    setNewEnvironment('');
  }

  return (
    <div>
        <h2>New Environment</h2>
        <TextBox
          label='Environment Name'
          value={newEnvironment}
          alphanumericOnly
          onChange={(e) => setNewEnvironment(e)}/>
        <button
          disabled={environments.includes(newEnvironment)}
          onClick={addNewEnvironment}>
            Create
        </button>
    </div>
  )
}

export default EnvironmentEditor