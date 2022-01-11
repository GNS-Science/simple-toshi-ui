/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type RowItemType = "boolean" | "double" | "integer" | "string" | "%future added value";
export type GeneralViewMfdQueryVariables = {
    id: string;
};
export type GeneralViewMfdQueryResponse = {
    readonly node: {
        readonly id?: string | undefined;
        readonly name?: string | null | undefined;
        readonly column_types?: ReadonlyArray<RowItemType | null> | null | undefined;
        readonly column_headers?: ReadonlyArray<string | null> | null | undefined;
        readonly rows?: ReadonlyArray<ReadonlyArray<string | null> | null> | null | undefined;
    } | null;
};
export type GeneralViewMfdQuery = {
    readonly response: GeneralViewMfdQueryResponse;
    readonly variables: GeneralViewMfdQueryVariables;
};



/*
query GeneralViewMfdQuery(
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
    "name": "GeneralViewMfdQuery",
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
    "name": "GeneralViewMfdQuery",
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
    "cacheID": "5f02b9f730a18b67508a1cd65ffc1256",
    "id": null,
    "metadata": {},
    "name": "GeneralViewMfdQuery",
    "operationKind": "query",
    "text": "query GeneralViewMfdQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Table {\n      id\n      name\n      column_types\n      column_headers\n      rows\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '510ce0fbc861057435f68183542a50e4';
export default node;
