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
        readonly name?: string | null;
        readonly column_headers?: ReadonlyArray<string | null> | null;
        readonly column_types?: ReadonlyArray<RowItemType | null> | null;
        readonly rows?: ReadonlyArray<ReadonlyArray<string | null> | null> | null;
        readonly meta?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null;
        readonly dimensions?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: ReadonlyArray<string | null> | null;
        } | null> | null;
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
    ... on Table {
      name
      column_headers
      column_types
      rows
      meta {
        k
        v
      }
      dimensions {
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
v2 = [
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
v3 = {
  "kind": "InlineFragment",
  "selections": [
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
      "name": "column_headers",
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
      "name": "rows",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "KeyValuePair",
      "kind": "LinkedField",
      "name": "meta",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "KeyValueListPair",
      "kind": "LinkedField",
      "name": "dimensions",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Table",
  "abstractKey": null
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
          (v3/*: any*/)
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "eaecb099875ec3d629f74a61ffc195ca",
    "id": null,
    "metadata": {},
    "name": "InversionSolutionHazardTabQuery",
    "operationKind": "query",
    "text": "query InversionSolutionHazardTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Table {\n      name\n      column_headers\n      column_types\n      rows\n      meta {\n        k\n        v\n      }\n      dimensions {\n        k\n        v\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '9d140255dbaa78b4d57baf5987bd8078';
export default node;
