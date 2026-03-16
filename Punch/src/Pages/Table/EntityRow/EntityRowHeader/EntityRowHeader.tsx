import { NavLink } from 'react-router'
import configuration from '../../../../configuration.json'
import { EntityWithRelations } from '../../../../DTOs/entity/EntityWithRelations'
import { EntityTypeSchema } from '../../../../DTOs/entity/entityType/EntityTypeSchema'
import './EntityRowHeader.css'

interface EntityRowHeaderProps {
  Entity: EntityWithRelations;
  isChecked: boolean;
  isOpen: boolean;
  isDraft: boolean;
  subTypesSchemas: EntityTypeSchema[];
  onToggleCheck: () => void;
  onToggleOpen: () => void;
  isTenantRelated: boolean;
  isSearching: boolean;
}

const EntityRowHeader: React.FC<EntityRowHeaderProps> = ({
  isSearching, Entity, isChecked, isOpen, isDraft, subTypesSchemas, onToggleCheck, onToggleOpen, isTenantRelated
}) => {
  return (
    <div className='entity-row__header'>
      {!isDraft && (
        <>
          <input type='checkbox' checked={isChecked} onChange={onToggleCheck} />
          <p>{(!isTenantRelated && !isSearching) ? "*" : ""}</p>
        </>
      )}

      <div className={`subtype-icons-row ${isOpen ? 'open' : 'closed'}`}>
        {!isDraft && <button
          className={`open-button ${subTypesSchemas.length > 0 ? 'open' : 'add'}`}
          onClick={onToggleOpen}
          >
          {subTypesSchemas.length > 0 ? '^' : '+'}
        </button>}
        {subTypesSchemas.map((subtype) => (
          <p key={subtype.label}>{subtype.icon}</p>
        ))}
      </div>

      {!isSearching && !isDraft && (
        <NavLink to={`${configuration.urls.entitiesUrl}/${Entity.entityId}`}>
          {Entity.relations?.length > 0 ? '<🔗>' : '<⭕>'}
        </NavLink>
      )}
    </div>
  )
}

export default EntityRowHeader