export class EntityType {
    name : string;
    _id : string;
    baseType : string;
    baseProperties : Record<string, string>;
    properties : Record<string, string>;
    icon : string;

    constructor(name: string, _id: string, baseType: string, baseProperties: Record<string, string>, properties: Record<string, string>, icon: string) {
        this.name = name;
        this._id = _id;
        this.baseType = baseType;
        this.baseProperties = baseProperties;
        this.properties = properties;
        this.icon = icon;
    }
}