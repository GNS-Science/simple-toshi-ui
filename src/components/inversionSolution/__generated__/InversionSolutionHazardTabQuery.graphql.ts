/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RowItemType = "boolean" | "double" | "integer" | "string" | "%future added value";
export type InversionSolutionHazardTabQueryVariables = {
    id: string;
};
export type InversionSolutionHazardTabQueryResponse = {
    readonly node: {
        readonly id?: string;
        readonly meta?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null;
        readonly hazard_table?: {
            readonly id: string;
            readonly name: string | null;
            readonly column_types: ReadonlyArray<RowItemType | null> | null;
            readonly column_headers: ReadonlyArray<string | null> | null;
            readonly rows: ReadonlyArray<ReadonlyArray<string | null> | null> | null;
        } | null;
    } | null;
};
export type InversionSolutionHazardTabQuery = {
    readonly response: InversionSolutionHazardTabQueryResponse;
    readonly variables: InversionSolutionHazardTabQueryVariables;
};



/*
query InversionSolutionHazardTabQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on InversionSolution {
      id
      meta {
        k
        v
      }
      hazard_table {
        id
        name
        column_types
        column_headers
        rows
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
  "concreteType": "Table",
  "kind": "LinkedField",
  "name": "hazard_table",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "column_types",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "column_headers",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rows",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InversionSolutionHazardTabQuery",
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
              (v4/*: any*/)
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
    "name": "InversionSolutionHazardTabQuery",
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
              (v4/*: any*/)
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
    "cacheID": "ddae050558cff2a7819b3b200ed782b4",
    "id": null,
    "metadata": {},
    "name": "InversionSolutionHazardTabQuery",
    "operationKind": "query",
    "text": "query InversionSolutionHazardTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on InversionSolution {\n      id\n      meta {\n        k\n        v\n      }\n      hazard_table {\n        id\n        name\n        column_types\n        column_headers\n        rows\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b79828305e9bc323e76c4b116ff5cca8';
export default node;
