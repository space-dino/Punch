import { Entity } from "./Objects/Entity";
import { EntityType } from "./Objects/EntityType";

export const DEFAULT_TYPES: EntityType[] = [
    new EntityType('student', '1', 'base1', {'baseProperty1' : 'value1a', 'baseProperty2' : 'value2a'}, {'property1' : 'value1', 'property2' : 'value2'}, '🙈'),
    new EntityType('teacher', '2', 'base1', {'baseProperty1' : 'value1b'}, {'property1' : 'value1'}, '🦆'),
    new EntityType('course', '3', 'base1', {'baseProperty1' : 'value1c'}, {'property1' : 'value1'}, '🍇'),
]

export const DEFAULT_ENTITIES: Entity[] = [
    new Entity('Entity1', '1', DEFAULT_TYPES[0], { property1: 'value1', property2: 'value2', property3: 'value3' }),
    new Entity('Entity2', '2', DEFAULT_TYPES[1], { property3: 'value3', property4: 'value4' }),
    new Entity('Entity3', '3', DEFAULT_TYPES[2], { property5: 'value5', property6: 'value6', property7: 'value7', property8: 'value6', property9: 'value7' }),
    new Entity('Entity4', '3', DEFAULT_TYPES[2], { property5: 'value5', property6: 'value6', property7: 'value7', property8: 'value6', property9: 'value7' }),
    new Entity('Entity5', '3', DEFAULT_TYPES[0], { property5: 'value5', property6: 'value6', property7: 'value7' }),
]

export const FIELD_TYPES: string[] = [
    'Text',
    'Number',
    'Boolean',
    'ID',
    'Date'
]