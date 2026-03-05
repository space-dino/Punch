export class EntityType {
    name : string;
    id : string;
    baseType : string;
    baseProperties : Record<string, string>;
    properties : Record<string, string>;

    constructor(name: string, id: string, baseType: string, baseProperties: Record<string, string>, properties: Record<string, string>) {
        this.name = name;
        this.id = id;
        this.baseType = baseType;
        this.baseProperties = baseProperties;
        this.properties = properties;
    }
}