import {
    Insight,
    InsightRow,
    Operation,
    Operations,
    Mutation,
    Reset,
    AddRows,
    DelRows,
    SortRows
} from './types';
import { actions, visitors } from "./mock";

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gaussianRandom(mean: number, stdev: number) {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    return z * stdev + mean;
}

function generateInsightRow(): InsightRow {
    return {
        id: Math.floor(Math.random() * 100000000),
        name: visitors[Math.floor(Math.random() * visitors.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
    };
}

function generateInsight(): Insight {
    const numRows = Math.max(1, gaussianRandom(25, 10));
    return {
        title: `Pitchdeck ${Math.floor(Math.random() * 1000)}`,
        rows: Array.from({ length: numRows }, generateInsightRow),
    };
}

export class InsightEngine {
    private _insights: Array<Insight>;

    constructor() {
        this._insights = this.resetInsights();
    }

    private resetInsights() {
        return Array.from({ length: 3 }, generateInsight);
    }

    insights(): ReadonlyArray<Insight> {
        return this._insights;
    }

    /**
     * TODO Add implementation below
     * @returns 
     */
    mutate(): Mutation {
        const length = this._insights.length;
        const operation = this.getRandomOperation();

        switch (operation) {
            case Operation.AddRows: {

            }

            case Operation.DelRows: {

            }

            case Operation.SortRows: {

            }

            case Operation.AddInsights: {

            }

            case Operation.DelInsights: {

            }

            case Operation.SortInsights: {

            }
        }

        return { type: Operation.NoOp };
    }

    private getRandomOperation(): Operation {
        return Operations[getRandomNumber(Operation.AddRows, Operation.SortInsights)];
    }
}