import { EntityTypeInstance } from './entityType/EntityTypeInstance';

export class EntityBase {
    entityId: string;
    baseType: EntityTypeInstance;
    subTypes: EntityTypeInstance[];

    constructor(strongId: string, baseType: EntityTypeInstance, subTypes: EntityTypeInstance[]) {
        this.entityId = strongId;
        this.baseType = baseType;
        this.subTypes = subTypes;
    }
}