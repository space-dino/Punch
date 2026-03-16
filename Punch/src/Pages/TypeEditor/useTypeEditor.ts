import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTypes } from "../../context/TypesContext";
import { EntityTypeSchema } from "../../DTOs/entity/entityType/EntityTypeSchema";
import { Field } from "../../DTOs/entity/entityType/field/Field";
import { postJSON } from "../../api";
import configuration from "../../configuration.json"
import { useEnvironments } from "../../context/EnvironmentsContext";

export const useTypeEditor = () => {
    const { types, setTypes, baseTypes } = useTypes();
    const navigate = useNavigate();
    const { selectedEnvironment } = useEnvironments();

    const [draft, setDraft] = useState<Field>(new Field('', 'String'));
    const [typeName, setTypeName] = useState('');

    const [selectedBaseType, setSelectedBaseType] = useState<string>(baseTypes[0].label);
    const params = useParams<{ id: string }>();
    const selectedType = types.find(e => e.label === params.id) ?? baseTypes.find(e => e.label === params.id);

    const handlePropertyChange = (key: string, newField: Field) => {
        if (selectedType !== undefined) {
            setTypes(prev => prev.map(e =>
                e.label === selectedType.label
                ? new EntityTypeSchema(
                    e.label,
                    e.baseLabel,
                    e.icon,
                    e.typeFields.map(field => field.name === key ? newField : field)
                    )
                : e
            ))
        }
    }

    const handleIconChange = (newIcon: string) => {
        if (selectedType !== undefined) {
            setTypes(prev => prev.map(e =>
            e.label === selectedType.label
                ? new EntityTypeSchema(e.label, e.baseLabel, newIcon, e.typeFields)
                : e
            ))
        }
    }

    const handleBaseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (selectedType !== undefined) {
            setTypes(prev => prev.map(t =>
            t.label === selectedType.label
                ? new EntityTypeSchema(t.label, e.target.value, t.icon, t.typeFields)
                : t
            ))
        } else {
            setSelectedBaseType(e.target.value)
        }
    }

    const addNewField = () => {
        const isDuplicate = selectedType?.typeFields.find(f => f.name === draft.name) !== undefined;

        if (draft.name.trim() === '' || isDuplicate) return;

        if (selectedType !== undefined) {
            // editing existing type
            setTypes(prev => prev.map(e =>
            e.label === selectedType.label
                ? new EntityTypeSchema(e.label, e.baseLabel, e.icon, [...e.typeFields, draft])
                : e
            ));

            postJSON(configuration.baseUrls.data, configuration.urls.typeSchemasUrl + configuration.urls.subTypesUrl + '/' + selectedEnvironment, selectedType, 'PUT')
                .catch(console.error)
        } else {
            // creating new type — add it to types with the new field
            if (typeName === '') return;

            const newType = new EntityTypeSchema(typeName, selectedBaseType, '➕', [draft]);

            setTypes(prev => [...prev, newType]);
            navigate(`./${typeName}`);

            postJSON(configuration.baseUrls.data, configuration.urls.typeSchemasUrl + configuration.urls.subTypesUrl + '/' + selectedEnvironment, newType, 'POST')
                .catch(console.error)
        }

        setDraft(new Field('', 'String'));
    };

    const removeField = (key: string) => {
        if (selectedType !== undefined) {
            setTypes(prev => prev.map(e =>
                e.label === selectedType.label
                ? new EntityTypeSchema(
                    e.label,
                    e.baseLabel,
                    e.icon,
                    e.typeFields.filter(f => f.name !== key)
                    )
                : e
            ))
        }
    }

    const deleteType = () => {
        postJSON(configuration.baseUrls.data, configuration.urls.environmentsUrl + '/' + selectedType?.label + '/' + selectedEnvironment, {}, 'DELETE')
            .catch(console.error)

        navigate(configuration.urls.typeSchemasUrl);
        
        setTypes(prev => prev.filter(
            type => type.label !== selectedType?.label
        ));
    }

    return {
    // state
    draft,
    setDraft,
    typeName,
    setTypeName,
    deleteType,
    selectedType,
    selectedBaseType,
    setSelectedBaseType,
    // handlers
    handlePropertyChange,
    handleBaseTypeChange,
    handleIconChange,
    removeField,
    addNewField,
    }
}