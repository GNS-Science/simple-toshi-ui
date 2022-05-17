/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type PrecessorsViewQueryVariables = {
    id: string;
};
export type PrecessorsViewQueryResponse = {
    readonly node: {
        readonly id: string;
        readonly predecessors?: ReadonlyArray<{
            readonly id: string | null;
            readonly typename: string | null;
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
export type PrecessorsViewQuery = {
    readonly response: PrecessorsViewQueryResponse;
    readonly variables: PrecessorsViewQueryVariables;
};



/*
query PrecessorsViewQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    id
    ... on OpenquakeHazardSolution {
      id
      predecessors {
        id
        typename
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
  "name": "depth",
  "storageKey": null
},
v5 = {
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
v6 = {
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
    "name": "PrecessorsViewQuery",
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "OpenquakeHazardSolution",
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
    "name": "PrecessorsViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v6/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v5/*: any*/),
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
            "type": "OpenquakeHazardSolution",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "64f6bf022addd6be3efae8764a67e166",
    "id": null,
    "metadata": {},
    "name": "PrecessorsViewQuery",
    "operationKind": "query",
    "text": "query PrecessorsViewQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on OpenquakeHazardSolution {\n      id\n      predecessors {\n        id\n        typename\n        depth\n        node {\n          __typename\n          ... on FileInterface {\n            __isFileInterface: __typename\n            file_name\n            meta {\n              k\n              v\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '18b6ac2c3aa8d7bf10b5f0ad538df5e5';
export default node;
