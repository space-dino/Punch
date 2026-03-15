export type DataType = 'String' | 'Number' | 'Boolean' | 'Date';

export class Field {
    name: string;
    type: DataType;

    constructor(name: string, type: DataType) {   
        this.name = name;
        this.type = type;
    }
}
