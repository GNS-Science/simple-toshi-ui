/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type AggregationFn = "MEAN" | "%future added value";
export type AggregateInversionSolutionQueryVariables = {
    id: string;
};
export type AggregateInversionSolutionQueryResponse = {
    readonly node: {
        readonly id: string;
        readonly __typename: string;
        readonly predecessors?: ReadonlyArray<{
            readonly id: string | null;
            readonly typename: string | null;
            readonly depth: number | null;
            readonly relationship: string | null;
            readonly node: {
                readonly __typename: string;
                readonly meta?: ReadonlyArray<{
                    readonly k: string | null;
                    readonly v: string | null;
                } | null> | null | undefined;
                readonly file_name?: string | null | undefined;
            } | null;
        } | null> | null | undefined;
        readonly file_name?: string | null | undefined;
        readonly file_size?: unknown | null | undefined;
        readonly md5_digest?: string | null | undefined;
        readonly created?: unknown | null | undefined;
        readonly meta?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly aggregation_fn?: AggregationFn | null | undefined;
        readonly produced_by?: {
            readonly id?: string | undefined;
            readonly __typename?: string | undefined;
        } | null | undefined;
        readonly source_solutions?: ReadonlyArray<{
            readonly id?: string | undefined;
            readonly __typename?: string | undefined;
        } | null> | null | undefined;
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
    ... on AggregateInversionSolution {
      file_name
      file_size
      md5_digest
      created
      meta {
        k
        v
      }
      aggregation_fn
      produced_by {
        __typename
        ... on Node {
          __isNode: __typename
          id
          __typename
        }
      }
      source_solutions {
        __typename
        ... on Node {
          __isNode: __typename
          id
          __typename
        }
      }
    }
    ... on PredecessorsInterface {
      __isPredecessorsInterface: __typename
      predecessors {
        id
        typename
        depth
        relationship
        node {
          __typename
          ... on FileInterface {
            __isFileInterface: __typename
            meta {
              k
              v
            }
            file_name
          }
          ... on Node {
            __isNode: __typename
            id
          }
        }
      }
    }
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
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_size",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "md5_digest",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created",
  "storageKey": null
},
v8 = {
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
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "aggregation_fn",
  "storageKey": null
},
v10 = [
  {
    "kind": "InlineFragment",
    "selections": [
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "type": "Node",
    "abstractKey": "__isNode"
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "typename",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "depth",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "relationship",
  "storageKey": null
},
v14 = {
  "kind": "InlineFragment",
  "selections": [
    (v8/*: any*/),
    (v4/*: any*/)
  ],
  "type": "FileInterface",
  "abstractKey": "__isFileInterface"
},
v15 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v16 = [
  (v3/*: any*/),
  (v15/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AggregateInversionSolutionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "produced_by",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "source_solutions",
                "plural": true,
                "selections": (v10/*: any*/),
                "storageKey": null
              }
            ],
            "type": "AggregateInversionSolution",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Predecessor",
                "kind": "LinkedField",
                "name": "predecessors",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "PredecessorsInterface",
            "abstractKey": "__isPredecessorsInterface"
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
    "name": "AggregateInversionSolutionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "produced_by",
                "plural": false,
                "selections": (v16/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "source_solutions",
                "plural": true,
                "selections": (v16/*: any*/),
                "storageKey": null
              }
            ],
            "type": "AggregateInversionSolution",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Predecessor",
                "kind": "LinkedField",
                "name": "predecessors",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "PredecessorsInterface",
            "abstractKey": "__isPredecessorsInterface"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4bdaf931099aec7a2723943a2e140995",
    "id": null,
    "metadata": {},
    "name": "AggregateInversionSolutionQuery",
    "operationKind": "query",
    "text": "query AggregateInversionSolutionQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    id\n    __typename\n    ... on AggregateInversionSolution {\n      file_name\n      file_size\n      md5_digest\n      created\n      meta {\n        k\n        v\n      }\n      aggregation_fn\n      produced_by {\n        __typename\n        ... on Node {\n          __isNode: __typename\n          id\n          __typename\n        }\n      }\n      source_solutions {\n        __typename\n        ... on Node {\n          __isNode: __typename\n          id\n          __typename\n        }\n      }\n    }\n    ... on PredecessorsInterface {\n      __isPredecessorsInterface: __typename\n      predecessors {\n        id\n        typename\n        depth\n        relationship\n        node {\n          __typename\n          ... on FileInterface {\n            __isFileInterface: __typename\n            meta {\n              k\n              v\n            }\n            file_name\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '255a267b7744e234fa47a3cc49c6be27';
export default node;
