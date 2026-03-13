export class UpdatedEntity {
    updatedProperties: Record<string, any>;

    constructor(updatedProperties: Record<string, any>) {
        this.updatedProperties = updatedProperties;
    }
}