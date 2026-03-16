import { useRef } from 'react'
import { useEntities } from '../../../context/EntitiesContext'
import { useTypes } from '../../../context/TypesContext'
import { EntityWithRelations } from '../../../DTOs/entity/EntityWithRelations'
import { EntityTypeInstance } from '../../../DTOs/entity/entityType/EntityTypeInstance'
import { EntityTypeSchema } from '../../../DTOs/entity/entityType/EntityTypeSchema'
import { UpdatedEntity } from '../../../DTOs/entity/Updates/UpdatedEntity'
import { postJSON } from '../../../api'
import configuration from '../../../configuration.json'
import { useEnvironments } from '../../../context/EnvironmentsContext'

export const useEntityRow = (Entity: EntityWithRelations, onDraftChange?: (updated: EntityWithRelations) => void) => {
  const { types, baseTypes } = useTypes();
  const { setEntities } = useEntities();
  const { selectedEnvironment } = useEnvironments();

  const baseTypeSchema: EntityTypeSchema | undefined = baseTypes.find(
    (type) => type.label === Entity.baseType.typeSchemaLabel
  );
  const subTypesSchemas: EntityTypeSchema[] = types.filter((type) =>
    Entity.subTypes.some((subType) => subType.typeSchemaLabel === type.label)
  );

  const debounceTimer = useRef<Record<string, number>>({});
  const latestPendingValues = useRef<Record<string, string>>({});

  const handlePropertyChange = (key: string, newValue: string) => {
    if (onDraftChange) {
      onDraftChange(new EntityWithRelations(
        Entity.entityId,
        new EntityTypeInstance(Entity.baseType.typeSchemaLabel, { ...Entity.baseType.fieldValues, [key]: newValue }),
        Entity.subTypes,
        Entity.relations
      ));
    } else {
      setEntities(prev => prev.map(e =>
        e.entityId === Entity.entityId
          ? new EntityWithRelations(
              e.entityId,
              new EntityTypeInstance(e.baseType.typeSchemaLabel, { ...e.baseType.fieldValues, [key]: newValue }),
              e.subTypes,
              e.relations
            )
          : e
      ));
    }
  }

  const sendPropertyChange = (key: string, newValue: string, typeLabel: string) => {
    const updatedEntity = new UpdatedEntity({ key, newValue });
    postJSON(configuration.baseUrls.data, configuration.urls.entitiesUrl + '/' + Entity.entityId + '/' + typeLabel + '/' + selectedEnvironment, updatedEntity, 'PUT')
      .catch(console.error);
  }

  const schedulePropertyChangeSend = (key: string, newValue: string, typeLabel: string, delay = 500) => {
    latestPendingValues.current[key] = newValue
    if (debounceTimer.current[key]) window.clearTimeout(debounceTimer.current[key])
    debounceTimer.current[key] = window.setTimeout(() => {
      const pendingValue = latestPendingValues.current[key]
      delete debounceTimer.current[key]
      delete latestPendingValues.current[key]
      sendPropertyChange(key, pendingValue, typeLabel)
    }, delay);
  }

  const handleSubTypePropertyChange = (typeSchemaLabel: string, key: string, newValue: string) => {
    setEntities(prev => prev.map(e =>
      e.entityId === Entity.entityId
        ? new EntityWithRelations(
            e.entityId,
            e.baseType,
            e.subTypes.map(sub =>
              sub.typeSchemaLabel === typeSchemaLabel
                ? new EntityTypeInstance(sub.typeSchemaLabel, { ...sub.fieldValues, [key]: newValue })
                : sub
            ),
            e.relations
          )
        : e
    ));

    schedulePropertyChangeSend(key, newValue, typeSchemaLabel);
  }

  const addSubtype = (typeLabel: string, setIsOpen: (open: boolean) => void) => {
    const subtype = new EntityTypeInstance(typeLabel, {});
    
    setEntities(prev => prev.map(e =>
      e.entityId === Entity.entityId
        ? new EntityWithRelations(e.entityId, e.baseType, [...e.subTypes, subtype], e.relations)
        : e
    ));
    setIsOpen(true);

    postJSON(configuration.baseUrls.data, configuration.urls.entitiesUrl + configuration.urls.subTypesUrl +  "/" + Entity.entityId + '/' + selectedEnvironment, subtype)
      .catch(console.error)
  }

  const deleteSubtype = (typeLabel: string) => {
    setEntities(prev => prev.map(e =>
      e.entityId === Entity.entityId
        ? new EntityWithRelations(e.entityId, e.baseType, e.subTypes.filter(sub => sub.typeSchemaLabel !== typeLabel), e.relations)
        : e
    ))

    postJSON(configuration.baseUrls.data, configuration.urls.entitiesUrl + configuration.urls.subTypesUrl + '/' + Entity.entityId + '/' + typeLabel + '/' + selectedEnvironment, {}, 'DELETE')
      .catch(console.error)
  }

  return {
    baseTypeSchema,
    subTypesSchemas,
    handlePropertyChange,
    schedulePropertyChangeSend,
    handleSubTypePropertyChange,
    addSubtype,
    deleteSubtype,
  }
}