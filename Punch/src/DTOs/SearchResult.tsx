import type { EntityWithRelations } from "./entity/EntityWithRelations";

export class SearchResult {
    score: number;
    entity: EntityWithRelations;

    constructor(score: number, entity: EntityWithRelations) {
        this.score = score;
        this.entity = entity;
    }
}