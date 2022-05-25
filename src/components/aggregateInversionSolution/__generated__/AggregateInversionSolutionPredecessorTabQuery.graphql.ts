/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type AggregateInversionSolutionPredecessorTabQueryVariables = {
    id: string;
};
export type AggregateInversionSolutionPredecessorTabQueryResponse = {
    readonly node: {
        readonly predecessors?: ReadonlyArray<{
            readonly id: string | null;
            readonly typename: string | null;
            readonly relationship: string | null;
            readonly depth: number | null;
            readonly node: {
                readonly file_name?: string | null | undefined;
                readonly meta?: ReadonlyArray<{
                    readonly k: string | null;
                    readonly v: string | null;
                } | null> | null | undefined;
            } | null;
        } | null> | null | undefined;
    } | null;
};
export type AggregateInversionSolutionPredecessorTabQuery = {
    readonly response: AggregateInversionSolutionPredecessorTabQueryResponse;
    readonly variables: AggregateInversionSolutionPredecessorTabQueryVariables;
};



/*
query AggregateInversionSolutionPredecessorTabQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on AggregateInversionSolution {
      predecessors {
        id
        typename
        relationship
        depth
        node {
          __typename
          ... on FileInterface {
            __isFileInterface: __typename
            file_name
            meta {
              k
              v
            }
          }
          ... on Node {
            __isNode: __typename
            id
          }
        }
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
  "name": "typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "relationship",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "depth",
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "file_name",
      "storageKey": null
    },
    {
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
    }
  ],
  "type": "FileInterface",
  "abstractKey": "__isFileInterface"
},
v7 = {
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
    "name": "AggregateInversionSolutionPredecessorTabQuery",
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
                "concreteType": "Predecessor",
                "kind": "LinkedField",
                "name": "predecessors",
                "plural": true,
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
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "AggregateInversionSolution",
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
    "name": "AggregateInversionSolutionPredecessorTabQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v6/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "AggregateInversionSolution",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d59acaa022f7dd66c2e305939dc9d10e",
    "id": null,
    "metadata": {},
    "name": "AggregateInversionSolutionPredecessorTabQuery",
    "operationKind": "query",
    "text": "query AggregateInversionSolutionPredecessorTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on AggregateInversionSolution {\n      predecessors {\n        id\n        typename\n        relationship\n        depth\n        node {\n          __typename\n          ... on FileInterface {\n            __isFileInterface: __typename\n            file_name\n            meta {\n              k\n              v\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '89c53371a8eb14dbe6b84eba30a29f25';
export default node;
