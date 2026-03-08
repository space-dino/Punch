import { EntityBase } from './EntityBase';
import type { EntityTypeInstance } from './entityType/EntityTypeInstance';
import type { RelationInstance } from './relations/RelationInstance';


export class EntityWithRelations extends EntityBase {
    relations: RelationInstance[];

    constructor(strongId: string, baseType: EntityTypeInstance, subTypes: EntityTypeInstance[], relations: RelationInstance[]) {
        super(strongId, baseType, subTypes);
        this.relations = relations;
    }
}