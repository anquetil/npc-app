import { ApolloQueryResult, OperationVariables } from '@apollo/client/core/types'

export type refetchFn = (
   variables?: Partial<OperationVariables> | undefined
) => Promise<ApolloQueryResult<any>>
