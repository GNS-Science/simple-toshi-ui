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
        readonly mfd_table?: {
            readonly name: string | null;
            readonly column_types: ReadonlyArray<RowItemType | null> | null;
            readonly column_headers: ReadonlyArray<string | null> | null;
            readonly rows: ReadonlyArray<ReadonlyArray<string | null> | null> | null;
        } | null;
        readonly meta?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null;
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
    ... on InversionSolution {
      mfd_table {
        name
        column_types
        column_headers
        rows
        id
      }
      meta {
        k
        v
      }
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
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "column_types",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "column_headers",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rows",
  "storageKey": null
},
v6 = {
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "Table",
                "kind": "LinkedField",
                "name": "mfd_table",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "type": "InversionSolution",
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
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Table",
                "kind": "LinkedField",
                "name": "mfd_table",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "type": "InversionSolution",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "af9fd667429433338c9945ea21010c86",
    "id": null,
    "metadata": {},
    "name": "InversionSolutionMfdTabQuery",
    "operationKind": "query",
    "text": "query InversionSolutionMfdTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on InversionSolution {\n      mfd_table {\n        name\n        column_types\n        column_headers\n        rows\n        id\n      }\n      meta {\n        k\n        v\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '1640289bfb46cccd72f538f7e1232cc7';
export default node;
