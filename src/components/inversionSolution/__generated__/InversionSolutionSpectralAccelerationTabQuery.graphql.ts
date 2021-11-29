/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RowItemType = "boolean" | "double" | "integer" | "string" | "%future added value";
export type TableType = "GENERAL" | "HAZARD_GRIDDED" | "HAZARD_SITES" | "MFD_CURVES" | "%future added value";
export type InversionSolutionSpectralAccelerationTabQueryVariables = {
    id: string;
};
export type InversionSolutionSpectralAccelerationTabQueryResponse = {
    readonly node: {
        readonly id?: string;
        readonly name?: string | null;
        readonly created?: unknown | null;
        readonly table_type?: TableType | null;
        readonly object_id?: string | null;
        readonly column_headers?: ReadonlyArray<string | null> | null;
        readonly column_types?: ReadonlyArray<RowItemType | null> | null;
        readonly rows?: ReadonlyArray<ReadonlyArray<string | null> | null> | null;
        readonly dimensions?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: ReadonlyArray<string | null> | null;
        } | null> | null;
    } | null;
};
export type InversionSolutionSpectralAccelerationTabQuery = {
    readonly response: InversionSolutionSpectralAccelerationTabQueryResponse;
    readonly variables: InversionSolutionSpectralAccelerationTabQueryVariables;
};



/*
query InversionSolutionSpectralAccelerationTabQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on Table {
      id
      name
      created
      table_type
      object_id
      column_headers
      column_types
      rows
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
  "name": "created",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "table_type",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "object_id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "column_headers",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "column_types",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rows",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValueListPair",
  "kind": "LinkedField",
  "name": "dimensions",
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InversionSolutionSpectralAccelerationTabQuery",
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
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/)
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
    "name": "InversionSolutionSpectralAccelerationTabQuery",
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
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/)
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
    "cacheID": "ad015d0b2d1b859b5afdc0ce2d587fa4",
    "id": null,
    "metadata": {},
    "name": "InversionSolutionSpectralAccelerationTabQuery",
    "operationKind": "query",
    "text": "query InversionSolutionSpectralAccelerationTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Table {\n      id\n      name\n      created\n      table_type\n      object_id\n      column_headers\n      column_types\n      rows\n      dimensions {\n        k\n        v\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '2b468cee28697e13bb5e45a242b068b2';
export default node;
