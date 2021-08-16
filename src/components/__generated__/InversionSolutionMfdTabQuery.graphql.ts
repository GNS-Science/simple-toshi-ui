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
        readonly meta?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null;
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
      meta {
        k
        v
      }
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
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "meta",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "k",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "v",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "column_types",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "column_headers",
  "storageKey": null
},
v7 = {
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
              (v6/*: any*/),
              (v7/*: any*/)
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
              (v6/*: any*/),
              (v7/*: any*/)
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
    "cacheID": "a793c29bc3f8b92896371cdfcf65291b",
    "id": null,
    "metadata": {},
    "name": "InversionSolutionMfdTabQuery",
    "operationKind": "query",
    "text": "query InversionSolutionMfdTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Table {\n      id\n      meta {\n        k\n        v\n      }\n      name\n      column_types\n      column_headers\n      rows\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e90a4b3b6e86e4351c6c329acd51a65e';
export default node;
