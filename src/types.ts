export type InsightRow = {
    id: number;
    name: string;
    action: string;
}

export type Insight = {
    title: string;
    rows: InsightRow[];
}

export const enum Operation {
    NoOp = 0,
    Reset = 1,
    AddRows = 2,
    DelRows = 3,
    SortRows = 4,
    AddInsights = 5,
    DelInsights = 6,
    SortInsights = 7
}

export const Operations: Operation[] = [
    Operation.NoOp,
    Operation.Reset,
    Operation.AddRows,
    Operation.DelRows,
    Operation.SortRows,
    Operation.AddInsights,
    Operation.DelInsights,
    Operation.SortInsights
];

export type NoOp = {
    readonly type: Operation.NoOp;
}

export type Reset = {
    readonly type: Operation.Reset;
    readonly payload: readonly Insight[];
};

export type AddRows = {
    readonly type: Operation.AddRows;
    readonly payload: {
        readonly index: number,
        readonly value: readonly InsightRow[]
    }
};

export type DelRows = {
    readonly type: Operation.DelRows;
    readonly payload: {
        readonly index: number;
        readonly count: number;
    }
};

/**
 * TODO Implement these types
 */
export type SortRows = {
    readonly type: Operation.SortRows;
    readonly payload: unknown;
};

export type AddInsights = {
    readonly type: Operation.AddInsights;
    readonly payload: unknown;
}

export type DelInsights = {
    readonly type: Operation.DelInsights;
    readonly payload: unknown;
}

export type SortInsights = {
    readonly type: Operation.SortInsights;
    readonly payload: unknown;
}

export type Mutation = NoOp 
    | Reset 
    | AddRows 
    | DelRows 
    | SortRows
    | AddInsights
    | DelInsights
    | SortInsights;