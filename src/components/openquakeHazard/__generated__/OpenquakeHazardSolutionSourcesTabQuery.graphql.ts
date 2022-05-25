/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type OpenquakeHazardSolutionSourcesTabQueryVariables = {
    id: string;
};
export type OpenquakeHazardSolutionSourcesTabQueryResponse = {
    readonly node: {
        readonly config?: {
            readonly id: string;
            readonly created: unknown | null;
            readonly source_models: ReadonlyArray<{
                readonly id?: string | undefined;
                readonly __typename?: string | undefined;
                readonly file_name?: string | null | undefined;
                readonly file_url?: string | null | undefined;
                readonly meta?: ReadonlyArray<{
                    readonly k: string | null;
                    readonly v: string | null;
                } | null> | null | undefined;
            } | null> | null;
        } | null | undefined;
    } | null;
};
export type OpenquakeHazardSolutionSourcesTabQuery = {
    readonly response: OpenquakeHazardSolutionSourcesTabQueryResponse;
    readonly variables: OpenquakeHazardSolutionSourcesTabQueryVariables;
};



/*
query OpenquakeHazardSolutionSourcesTabQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on OpenquakeHazardSolution {
      config {
        id
        created
        source_models {
          __typename
          ... on Node {
            __isNode: __typename
            id
            __typename
          }
          ... on FileInterface {
            __isFileInterface: __typename
            file_name
            file_url
            meta {
              k
              v
            }
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
  "name": "created",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
      "kind": "ScalarField",
      "name": "file_url",
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OpenquakeHazardSolutionSourcesTabQuery",
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
                "concreteType": "OpenquakeHazardConfig",
                "kind": "LinkedField",
                "name": "config",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "source_models",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      },
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
    "name": "OpenquakeHazardSolutionSourcesTabQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "OpenquakeHazardConfig",
                "kind": "LinkedField",
                "name": "config",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "source_models",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      },
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
    ]
  },
  "params": {
    "cacheID": "6b8c50c529b72efb604c596bf0f6c5dc",
    "id": null,
    "metadata": {},
    "name": "OpenquakeHazardSolutionSourcesTabQuery",
    "operationKind": "query",
    "text": "query OpenquakeHazardSolutionSourcesTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on OpenquakeHazardSolution {\n      config {\n        id\n        created\n        source_models {\n          __typename\n          ... on Node {\n            __isNode: __typename\n            id\n            __typename\n          }\n          ... on FileInterface {\n            __isFileInterface: __typename\n            file_name\n            file_url\n            meta {\n              k\n              v\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '40c6c60860b14271b88a8e04018317dc';
export default node;
