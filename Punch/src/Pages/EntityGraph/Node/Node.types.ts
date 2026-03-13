import type { EntityTypeInstance } from "../../../DTOs/entity/entityType/EntityTypeInstance";
import type { RelationInstance } from "../../../DTOs/entity/relations/RelationInstance";

export interface Node {
  id: string;
  label: string;
  data: EntityTypeInstance | RelationInstance;
  x: number;
  y: number;
  width: number;
  height: number;
  relationId?: string;
}