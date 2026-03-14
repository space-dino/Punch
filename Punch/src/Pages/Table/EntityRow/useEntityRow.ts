import { useRef } from 'react'
import { useEntities } from '../../../context/EntitiesContext'
import { useTypes } from '../../../context/TypesContext'
import { EntityWithRelations } from '../../../DTOs/entity/EntityWithRelations'
import { EntityTypeInstance } from '../../../DTOs/entity/entityType/EntityTypeInstance'
import { EntityTypeSchema } from '../../../DTOs/entity/entityType/EntityTypeSchema'
import { UpdatedEntity } from '../../../DTOs/entity/UpdatedEntity'
import { postJSON } from '../../../api'
import configuration from '../../../configuration.json'

export const useEntityRow = (Entity: EntityWithRelations, onDraftChange?: (updated: EntityWithRelations) => void) => {
  const { types, baseTypes } = useTypes();
  const { setEntities } = useEntities();

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

  const sendPropertyChange = (key: string, newValue: string) => {
    const baseEntity = new UpdatedEntity({ key, newValue });
    postJSON(configuration.baseUrls.data, configuration.urls.entitiesUrl + '/' + Entity.entityId, baseEntity, 'PUT')
      .catch(console.error);
  }

  const schedulePropertyChangeSend = (key: string, newValue: string, delay = 500) => {
    latestPendingValues.current[key] = newValue
    if (debounceTimer.current[key]) window.clearTimeout(debounceTimer.current[key])
    debounceTimer.current[key] = window.setTimeout(() => {
      const pendingValue = latestPendingValues.current[key]
      delete debounceTimer.current[key]
      delete latestPendingValues.current[key]
      sendPropertyChange(key, pendingValue)
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
  }

  const addSubtype = (typeLabel: string, setIsOpen: (open: boolean) => void) => {
    setEntities(prev => prev.map(e =>
      e.entityId === Entity.entityId
        ? new EntityWithRelations(e.entityId, e.baseType, [...e.subTypes, new EntityTypeInstance(typeLabel, {})], e.relations)
        : e
    ));
    setIsOpen(true);
  }

  return {
    baseTypeSchema,
    subTypesSchemas,
    handlePropertyChange,
    schedulePropertyChangeSend,
    handleSubTypePropertyChange,
    addSubtype,
  }
}