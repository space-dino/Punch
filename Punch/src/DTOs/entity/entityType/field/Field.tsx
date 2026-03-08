export type DataType = 'string' | 'number' | 'boolean' | 'date';

export class Field {
    name: string;
    type: DataType;

    constructor(name: string, type: DataType) {   
        this.name = name;
        this.type = type;
    }
}
