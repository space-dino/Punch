import { EntityWithRelations } from "./DTOs/entity/EntityWithRelations";
import { EntityTypeInstance } from "./DTOs/entity/entityType/EntityTypeInstance";
import { EntityTypeSchema } from "./DTOs/entity/entityType/EntityTypeSchema";
import { Field } from "./DTOs/entity/entityType/field/Field";

export const DEFAULT_TYPES: EntityTypeSchema[] = [
    new EntityTypeSchema('student', '🙈', [
        new Field('School', 'string'),
        new Field('Year', 'number'),
        new Field('Grade', 'number'),
    ]),
    new EntityTypeSchema('teacher', '🦆', [
        new Field('School', 'string'),
        new Field('Subject', 'number'),
    ]),
    new EntityTypeSchema('course', '🍇', [
        new Field('Subject', 'string'),
        new Field('Year', 'number'),
    ]),
]

export const DEFAULT_ENTITIES: EntityWithRelations[] = [
    new EntityWithRelations('Student1', new EntityTypeInstance('student', { School: 'High School', Year: 2020, Grade: 90 }), [], []),
    new EntityWithRelations('Teacher1', new EntityTypeInstance('teacher', { School: 'High School', Subject: 'Math' }), [], []),
    new EntityWithRelations('Course1', new EntityTypeInstance('course', { Subject: 'Math', Year: 2020 }), [], []),
]