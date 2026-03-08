import { Field } from './field/Field';

export class EntityTypeSchema {
    label: string;
    icon: string;
    typeFields: Field[];

    constructor(label: string, icon: string, typeFields: Field[]) {
        this.label = label;
        this.icon = icon;
        this.typeFields = typeFields;
    }
}
