/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type TableType = "GENERAL" | "HAZARD_GRIDDED" | "HAZARD_SITES" | "MFD_CURVES" | "MFD_CURVES_V2" | "%future added value";
export type InversionSolutionQueryVariables = {
    id: string;
};
export type InversionSolutionQueryResponse = {
    readonly node: {
        readonly id?: string | undefined;
        readonly mfd_table_id?: string | null | undefined;
        readonly hazard_table_id?: string | null | undefined;
        readonly created?: unknown | null | undefined;
        readonly produced_by?: {
            readonly id?: string | undefined;
        } | null | undefined;
        readonly meta?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly tables?: ReadonlyArray<{
            readonly table_id: string | null;
            readonly table_type: TableType | null;
            readonly created: unknown | null;
        } | null> | null | undefined;
    } | null;
};
export type InversionSolutionQuery = {
    readonly response: InversionSolutionQueryResponse;
    readonly variables: InversionSolutionQueryVariables;
};



/*
query InversionSolutionQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on InversionSolution {
      id
      mfd_table_id
      hazard_table_id
      created
      produced_by {
        __typename
        ... on Node {
          __isNode: __typename
          id
        }
      }
      meta {
        k
        v
      }
      tables {
        table_id
        table_type
        created
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
  "name": "mfd_table_id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hazard_table_id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created",
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v7 = {
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
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "LabelledTableRelation",
  "kind": "LinkedField",
  "name": "tables",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "table_id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "table_type",
      "storageKey": null
    },
    (v5/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InversionSolutionQuery",
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
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "produced_by",
                "plural": false,
                "selections": [
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v7/*: any*/),
              (v8/*: any*/)
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
    "name": "InversionSolutionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "produced_by",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v7/*: any*/),
              (v8/*: any*/)
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
    "cacheID": "c5b3870e11ee9bfb3ac3aecd1be9d9d8",
    "id": null,
    "metadata": {},
    "name": "InversionSolutionQuery",
    "operationKind": "query",
    "text": "query InversionSolutionQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on InversionSolution {\n      id\n      mfd_table_id\n      hazard_table_id\n      created\n      produced_by {\n        __typename\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      meta {\n        k\n        v\n      }\n      tables {\n        table_id\n        table_type\n        created\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b0dda5042ddaaaa6a80d2ebcafa0cbe1';
export default node;
