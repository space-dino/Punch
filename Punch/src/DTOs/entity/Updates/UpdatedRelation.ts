export class UpdatedRelation {
    type: string;
    fieldValues: Record<string, any>;
    targetId: string;
    sourceId: string;
    clearanceLevel: number;

    constructor(type: string, fieldValues: Record<string, any>, targetId: string, sourceId: string, clearanceLevel: number) {
        this.type = type;
        this.fieldValues = fieldValues;
        this.targetId = targetId;
        this.sourceId = sourceId;
        this.clearanceLevel = clearanceLevel;
    }
}
