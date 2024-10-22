// Minimum TypeScript Version: 3.8

import type { RDSDataClientConfig, BatchExecuteStatementCommandInput, BeginTransactionCommandOutput, CommitTransactionCommandInput, ExecuteStatementCommandInput, RollbackTransactionCommandInput } from "@aws-sdk/client-rds-data";

declare namespace Client {
    type OmittedValues = "database" | "resourceArn" | "secretArn" | "schema";

    interface iParams {
        secretArn: string;
        resourceArn: string;
        database?: string | undefined;
        keepAlive?: boolean | undefined;
        hydrateColumnNames?: boolean | undefined;
        sslEnabled?: boolean | undefined;
        options?: RDSDataClientConfig | undefined;
        region?: string | undefined;
        engine?: "mysql" | "pg" | undefined;
        formatOptions?:
            | {
                deserializeDate?: boolean | undefined;
                treatAsLocalDate?: boolean | undefined;
            }
            | undefined;
    }

    interface Transaction {
        query(sql: string, params?: [] | unknown): Transaction; // params can be [] or {};
        query(
            obj:
                | {
                    sql: string;
                    parameters: [] | unknown;
                    database?: string | undefined;
                    hydrateColumnNames?: boolean | undefined;
                }
                | ((prevResult: { insertId?: any }) => any),
        ): Transaction;

        rollback(cb: (error: Error, status: any) => void): Transaction;
        commit: () => Promise<void>;
    }

    interface iDataAPIClient {
        /* eslint-disable @definitelytyped/no-unnecessary-generics */
        query<T = any>(sql: string, params?: [] | unknown): Promise<iDataAPIQueryResult<T>>; // params can be [] or {};
        query<T = any>(obj: {
            sql: string;
            parameters?: [] | unknown | undefined;
            transactionId?: string | undefined;
            database?: string | undefined;
            hydrateColumnNames?: boolean | undefined;
        }): Promise<iDataAPIQueryResult<T>>;
        transaction(): Transaction; // needs to return an interface with

        // promisified versions of the RDSDataService methods
        batchExecuteStatement: (params: Omit<BatchExecuteStatementCommandInput, OmittedValues>) => Promise<any>;
        beginTransaction: () => Promise<BeginTransactionCommandOutput>;
        commitTransaction: (params: Omit<CommitTransactionCommandInput, OmittedValues>) => Promise<any>;
        executeStatement: (params: Omit<ExecuteStatementCommandInput, OmittedValues>) => Promise<any>;
        rollbackTransaction: (params: Omit<RollbackTransactionCommandInput, OmittedValues>) => Promise<any>;
    }

    interface iDataAPIQueryResult<T = any> {
        records: T[];
    }
}
declare function Client(params: Client.iParams): Client.iDataAPIClient;
export = Client;