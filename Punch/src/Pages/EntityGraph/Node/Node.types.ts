import type { EntityTypeInstance } from "../../../DTOs/entity/entityType/EntityTypeInstance";

export interface Node {
  id: string;
  label: string;
  data: EntityTypeInstance;
  x: number;
  y: number;
}