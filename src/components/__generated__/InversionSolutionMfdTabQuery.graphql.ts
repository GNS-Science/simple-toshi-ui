/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RowItemType = "boolean" | "double" | "integer" | "string" | "%future added value";
export type InversionSolutionMfdTabQueryVariables = {
    id: string;
};
export type InversionSolutionMfdTabQueryResponse = {
    readonly node: {
        readonly id?: string;
        readonly name?: string | null;
        readonly column_types?: ReadonlyArray<RowItemType | null> | null;
        readonly column_headers?: ReadonlyArray<string | null> | null;
        readonly rows?: ReadonlyArray<ReadonlyArray<string | null> | null> | null;
    } | null;
};
export type InversionSolutionMfdTabQuery = {
    readonly response: InversionSolutionMfdTabQueryResponse;
    readonly variables: InversionSolutionMfdTabQueryVariables;
};



/*
query InversionSolutionMfdTabQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on Table {
      id
      name
      column_types
      column_headers
      rows
    }
    id
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "column_types",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "column_headers",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rows",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InversionSolutionMfdTabQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "type": "Table",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "QueryRoot",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InversionSolutionMfdTabQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "type": "Table",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bf56e48ddc929d8825f8b9bcd6b73adf",
    "id": null,
    "metadata": {},
    "name": "InversionSolutionMfdTabQuery",
    "operationKind": "query",
    "text": "query InversionSolutionMfdTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Table {\n      id\n      name\n      column_types\n      column_headers\n      rows\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '31da9e62de8367bb09ec9e77b8821c4b';
export default node;
