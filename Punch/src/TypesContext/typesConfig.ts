import { EntityType } from "../Objects/EntityType";

export const DEFAULT_TYPES: EntityType[] = [
    new EntityType('student', '1', 'base1', {'baseProperty1' : 'value1a', 'baseProperty2' : 'value2a'}, {'property1' : 'value1', 'property2' : 'value2'}),
    new EntityType('teacher', '2', 'base1', {'baseProperty1' : 'value1b'}, {'property1' : 'value1'}),
    new EntityType('course', '3', 'base1', {'baseProperty1' : 'value1c'}, {'property1' : 'value1'}),
]