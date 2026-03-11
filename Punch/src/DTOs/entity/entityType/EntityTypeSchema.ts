import { Field } from './field/Field';

export class EntityTypeSchema {
    label: string;
    baseLabel: string;
    icon: string;
    typeFields: Field[];

    constructor(label: string, baseLabel: string, icon: string, typeFields: Field[]) {
        this.label = label;
        this.baseLabel = baseLabel;
        this.icon = icon;
        this.typeFields = typeFields;
    }
}
