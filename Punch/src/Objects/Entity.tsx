export class Entity {
    name : string;
    _id : string;
    properties : Record<string, string>;

    constructor(name: string, id: string, properties: Record<string, string>) {
        this.name = name
        this._id = id
        this.properties = properties
    }
}