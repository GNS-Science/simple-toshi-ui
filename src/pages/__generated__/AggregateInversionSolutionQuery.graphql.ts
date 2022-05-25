/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type AggregateInversionSolutionQueryVariables = {
    id: string;
};
export type AggregateInversionSolutionQueryResponse = {
    readonly node: {
        readonly id: string;
        readonly __typename: string;
    } | null;
};
export type AggregateInversionSolutionQuery = {
    readonly response: AggregateInversionSolutionQueryResponse;
    readonly variables: AggregateInversionSolutionQueryVariables;
};



/*
query AggregateInversionSolutionQuery(
  $id: ID!
) {
  node(id: $id) {
    id
    __typename
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": null,
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AggregateInversionSolutionQuery",
    "selections": (v1/*: any*/),
    "type": "QueryRoot",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AggregateInversionSolutionQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "18a4d133c91ffed28fde465cf5e5f799",
    "id": null,
    "metadata": {},
    "name": "AggregateInversionSolutionQuery",
    "operationKind": "query",
    "text": "query AggregateInversionSolutionQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    id\n    __typename\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bd03a65f08e5f2ca92f0453f538cd9d5';
export default node;
