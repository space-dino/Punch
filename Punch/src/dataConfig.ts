import { EntityWithRelations } from "./DTOs/entity/EntityWithRelations";
import { EntityTypeInstance } from "./DTOs/entity/entityType/EntityTypeInstance";
import { EntityTypeSchema } from "./DTOs/entity/entityType/EntityTypeSchema";
import { Field } from "./DTOs/entity/entityType/field/Field";

export const DEFAULT_TYPES: EntityTypeSchema[] = [
    new EntityTypeSchema('Student', 'Person', '🙈',[
        new Field('School', 'String'),
        new Field('Year', 'Number'),
        new Field('Grade', 'Number'),
    ]),
    new EntityTypeSchema('Teacher', 'Person', '🦆',[
        new Field('School', 'String'),
        new Field('Subject', 'Number'),
    ]),
    new EntityTypeSchema('Course', 'Education', '🍇', [
        new Field('Subject', 'String'),
        new Field('Year', 'Number'),
    ]),
]

export const BASE_TYPES: EntityTypeSchema[] = [
    new EntityTypeSchema('Person', '🙈', '', [
        new Field('name', 'String'),
        new Field('id', 'Number'),
        new Field('birthdate', 'Date'),
    ]),
    new EntityTypeSchema('Organization', '🙈', '', [
        new Field('name', 'String'),
        new Field('id', 'Number'),
        new Field('description', 'String'),
    ]),
    new EntityTypeSchema('Location', '🙈', '', [
        new Field('x', 'Number'),
        new Field('y', 'Number'),
        new Field('id', 'Number'),
    ]),
    new EntityTypeSchema('Education', '🙈', '', [
        new Field('name', 'String'),
        new Field('id', 'Number'),
    ]),
]

export const DEFAULT_ENTITIES: EntityWithRelations[] = [
    new EntityWithRelations('Student1', new EntityTypeInstance('Person', { School: 'High School', Year: 2020, Grade: 90 }), [new EntityTypeInstance('Student', { School: 'High School', Year: 2020, Grade: 90 })], []),
    new EntityWithRelations('Teacher1', new EntityTypeInstance('Teacher', { School: 'High School', Subject: 'Math' }), [], []),
    new EntityWithRelations('Course1', new EntityTypeInstance('Course', { Subject: 'Math', Year: 2020 }), [], []),
]