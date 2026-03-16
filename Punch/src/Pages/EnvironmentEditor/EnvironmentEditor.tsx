import React, { useState } from 'react'
import TextBox from '../../Components/TextBox/TextBox'
import { useEnvironments } from '../../context/EnvironmentsContext'
import './EnvironmentEditor.css'
import { useNavigate } from 'react-router'

interface EnvironmentEditorProps {

}

const EnvironmentEditor : React.FC<EnvironmentEditorProps> = (props : EnvironmentEditorProps) => {
  const { environments, setEnvironments, setSelectedEnvironment } = useEnvironments();
  const [newEnvironment, setNewEnvironment] = useState<string>('');
  const navigate = useNavigate();

  const addNewEnvironment = () => {
    setEnvironments(prev => [...prev, ('tenant_' + newEnvironment)]);
    setNewEnvironment('');
    setSelectedEnvironment(newEnvironment);
    navigate('/');
  }

  return (
    <div>
        <h2>New Environment</h2>

        <div className='new-environment-input-container'>
          <p className='label'>" tenant _</p>
          <TextBox
            label='Environment Name'
            value={newEnvironment}
            alphanumericOnly
            onChange={(e) => setNewEnvironment(e)}/>
          <p>"</p>
        </div>
        <button
          disabled={environments.includes(newEnvironment)}
          onClick={addNewEnvironment}>
            Create
        </button>
    </div>
  )
}

export default EnvironmentEditor