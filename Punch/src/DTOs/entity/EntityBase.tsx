import { EntityTypeInstance } from './entityType/EntityTypeInstance';

export class EntityBase {
    strongId: string;
    baseType: EntityTypeInstance;
    subTypes: EntityTypeInstance[];

    constructor(strongId: string, baseType: EntityTypeInstance, subTypes: EntityTypeInstance[]) {
        this.strongId = strongId;
        this.baseType = baseType;
        this.subTypes = subTypes;
    }
}