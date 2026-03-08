export class EntityTypeInstance {
    typeSchemaLabel: string;
    fieldValues: Record<string, any>;

    constructor(typeSchemaLabel: string, fieldValues: Record<string, any>) {
        this.typeSchemaLabel = typeSchemaLabel;
        this.fieldValues = fieldValues;
    }
}
