/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type EventResult = "FAILURE" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type EventState = "DONE" | "SCHEDULED" | "STARTED" | "UNDEFINED" | "%future added value";
export type FileRole = "READ" | "READ_WRITE" | "UNDEFINED" | "WRITE" | "%future added value";
export type RuptureGenerationTaskQueryVariables = {
    id: string;
};
export type RuptureGenerationTaskQueryResponse = {
    readonly node: {
        readonly id: string;
        readonly duration?: number | null;
        readonly created?: unknown | null;
        readonly result?: EventResult | null;
        readonly state?: EventState | null;
        readonly files?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly role: FileRole;
                    readonly file: {
                        readonly id?: string;
                        readonly file_name?: string | null;
                        readonly file_url?: string | null;
                    };
                } | null;
            } | null>;
        } | null;
        readonly arguments?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null;
        readonly environment?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null;
        readonly metrics?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null;
    } | null;
};
export type RuptureGenerationTaskQuery = {
    readonly response: RuptureGenerationTaskQueryResponse;
    readonly variables: RuptureGenerationTaskQueryVariables;
};



/*
query RuptureGenerationTaskQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    id
    ... on RuptureGenerationTask {
      id
      duration
      created
      result
      state
      files {
        edges {
          node {
            id
            role
            file {
              __typename
              ... on File {
                id
                file_name
                file_url
              }
              ... on Node {
                __isNode: __typename
                id
              }
            }
          }
        }
      }
      arguments {
        k
        v
      }
      environment {
        k
        v
      }
      metrics {
        k
        v
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
  "name": "duration",
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
  "name": "result",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/),
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
    }
  ],
  "type": "File",
  "abstractKey": null
},
v9 = [
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
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "arguments",
  "plural": true,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "environment",
  "plural": true,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "metrics",
  "plural": true,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v13 = {
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
    "name": "RuptureGenerationTaskQuery",
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
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "FileRelationConnection",
                "kind": "LinkedField",
                "name": "files",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FileRelationEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FileRelation",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "file",
                            "plural": false,
                            "selections": [
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "type": "RuptureGenerationTask",
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
    "name": "RuptureGenerationTaskQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v13/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "FileRelationConnection",
                "kind": "LinkedField",
                "name": "files",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FileRelationEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FileRelation",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "file",
                            "plural": false,
                            "selections": [
                              (v13/*: any*/),
                              (v8/*: any*/),
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
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "type": "RuptureGenerationTask",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4ee2cd807d8524b227b9129ad3013809",
    "id": null,
    "metadata": {},
    "name": "RuptureGenerationTaskQuery",
    "operationKind": "query",
    "text": "query RuptureGenerationTaskQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on RuptureGenerationTask {\n      id\n      duration\n      created\n      result\n      state\n      files {\n        edges {\n          node {\n            id\n            role\n            file {\n              __typename\n              ... on File {\n                id\n                file_name\n                file_url\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n          }\n        }\n      }\n      arguments {\n        k\n        v\n      }\n      environment {\n        k\n        v\n      }\n      metrics {\n        k\n        v\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a013e5314584f39d1df548d873b0f40e';
export default node;
