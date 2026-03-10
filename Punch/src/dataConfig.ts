import { EntityWithRelations } from "./DTOs/entity/EntityWithRelations";
import { EntityTypeInstance } from "./DTOs/entity/entityType/EntityTypeInstance";
import { EntityTypeSchema } from "./DTOs/entity/entityType/EntityTypeSchema";
import { Field } from "./DTOs/entity/entityType/field/Field";

export const DEFAULT_TYPES: EntityTypeSchema[] = [
    new EntityTypeSchema('Student', '🙈', [
        new Field('School', 'string'),
        new Field('Year', 'number'),
        new Field('Grade', 'number'),
    ]),
    new EntityTypeSchema('Teacher', '🦆', [
        new Field('School', 'string'),
        new Field('Subject', 'number'),
    ]),
    new EntityTypeSchema('Course', '🍇', [
        new Field('Subject', 'string'),
        new Field('Year', 'number'),
    ]),
]

export const BASE_TYPES: EntityTypeSchema[] = [
    new EntityTypeSchema('Person', '🙈', [
        new Field('name', 'string'),
        new Field('id', 'number'),
        new Field('birthdate', 'date'),
    ]),
    new EntityTypeSchema('Organization', '🙈', [
        new Field('name', 'string'),
        new Field('id', 'number'),
        new Field('description', 'string'),
    ]),
    new EntityTypeSchema('Location', '🙈', [
        new Field('x', 'number'),
        new Field('y', 'number'),
        new Field('id', 'number'),
    ]),
    new EntityTypeSchema('Education', '🙈', [
        new Field('name', 'string'),
        new Field('id', 'number'),
    ]),
]

export const DEFAULT_ENTITIES: EntityWithRelations[] = [
    new EntityWithRelations('Student1', new EntityTypeInstance('Student', { School: 'High School', Year: 2020, Grade: 90 }), [new EntityTypeInstance('aehtjry', { School: 'High School', Year: 2020, Grade: 90 })], []),
    new EntityWithRelations('Teacher1', new EntityTypeInstance('Teacher', { School: 'High School', Subject: 'Math' }), [], []),
    new EntityWithRelations('Course1', new EntityTypeInstance('Course', { Subject: 'Math', Year: 2020 }), [], []),
]