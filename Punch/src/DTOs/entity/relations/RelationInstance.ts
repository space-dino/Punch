import { EntityBase } from '../EntityBase';

export class RelationInstance {
    relationType: string;
    targetEntity: EntityBase;

    constructor(relationType: string, targetEntity: EntityBase) {
        this.relationType = relationType;
        this.targetEntity = targetEntity;
    }
}
