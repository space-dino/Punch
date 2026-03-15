import React, { useEffect, useState } from 'react'
import './SideBar.css'
import { useTypes } from '../../context/TypesContext'
import type { EntityTypeSchema } from '../../DTOs/entity/entityType/EntityTypeSchema';
import { NavLink } from 'react-router';
import configuration from '../../configuration.json';
import { getJSON } from '../../api';
import { useEnvironments } from '../../context/EnvironmentsContext';

interface SideBarProps {
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const [open, setOpen] = useState(true);
  const { types, setTypes, baseTypes, setBaseTypes } = useTypes();
  const { selectedEnvironment } = useEnvironments();

  useEffect(() => {
    getJSON<EntityTypeSchema[]>(configuration.baseUrls.data, configuration.urls.typeSchemasUrl + configuration.urls.environmentsUrl + '/' + selectedEnvironment)
      .then((data) => setTypes(data))
      .catch(console.error);
    getJSON<EntityTypeSchema[]>(configuration.baseUrls.data, configuration.urls.typeSchemasUrl + configuration.urls.baseSchemasUrl)
      .then((data) => setBaseTypes(data))
      .catch(console.error);
  }, []);

  return (
    <div className={`side-bar ${open ? 'side-bar--open' : 'side-bar--closed'}`}>
      <button className='open-button' onClick={() => setOpen(prev => !prev)}>
        {open ? '←' : '→'}
      </button>

      <div className='side-bar-container'>
        <div className='side-bar__content'>
          {baseTypes.map((type : EntityTypeSchema) => (
            <NavLink to={`${configuration.urls.typeSchemasUrl}/${type.label}`}>{type.label}</NavLink>
          ))}

          <div className='separator'></div>

          {types.map((type : EntityTypeSchema) => (
            <NavLink to={`${configuration.urls.typeSchemasUrl}/${type.label}`}>{type.label}</NavLink>
          ))}

          <NavLink to={configuration.urls.typeSchemasUrl}>+</NavLink>
        </div>

        <div className='side-bar-icons' onClick={() => setOpen(prev => !prev)}>
          {baseTypes.map((type : EntityTypeSchema) => (
            <p>{type.icon}</p>
          ))}

          <div className='separator'></div>
          
          {types.map((type : EntityTypeSchema) => (
            <p>{type.icon}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar