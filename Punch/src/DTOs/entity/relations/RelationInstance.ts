import { EntityBase } from '../EntityBase';

export class RelationInstance {
    type: string;
    tenantId: string;
    fieldValues: Record<string, any>;
    target: EntityBase;

    constructor(type: string, tenantId: string, fieldValues: Record<string, any>, target: EntityBase) {
        this.type = type;
        this.tenantId = tenantId;
        this.fieldValues = fieldValues;
        this.target = target;
    }
}
