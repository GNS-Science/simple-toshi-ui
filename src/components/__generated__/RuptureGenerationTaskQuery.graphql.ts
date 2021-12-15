/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EventResult = "FAILURE" | "PARTIAL" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type EventState = "DONE" | "SCHEDULED" | "STARTED" | "UNDEFINED" | "%future added value";
export type FileRole = "READ" | "READ_WRITE" | "UNDEFINED" | "WRITE" | "%future added value";
export type RuptureGenerationTaskQueryVariables = {
    id: string;
};
export type RuptureGenerationTaskQueryResponse = {
    readonly node: {
        readonly id: string;
        readonly duration?: number | null | undefined;
        readonly created?: unknown | null | undefined;
        readonly result?: EventResult | null | undefined;
        readonly state?: EventState | null | undefined;
        readonly files?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly file_id: string | null;
                    readonly thing_id: string | null;
                    readonly role: FileRole;
                    readonly file: {
                        readonly __typename: string;
                        readonly id?: string | undefined;
                        readonly file_name?: string | null | undefined;
                        readonly file_url?: string | null | undefined;
                    } | null;
                } | null;
            } | null>;
        } | null | undefined;
        readonly arguments?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly environment?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly metrics?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly parents?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly parent: {
                        readonly id: string;
                    };
                } | null;
            } | null>;
        } | null | undefined;
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
            file_id
            thing_id
            role
            file {
              __typename
              ... on Node {
                __isNode: __typename
                id
              }
              ... on FileInterface {
                __isFileInterface: __typename
                file_name
                file_url
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
      parents {
        edges {
          node {
            parent {
              id
            }
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
  "name": "__typename",
  "storageKey": null
},
v8 = [
  (v2/*: any*/)
],
v9 = {
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "file_id",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "thing_id",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "role",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "file",
              "plural": false,
              "selections": [
                (v7/*: any*/),
                {
                  "kind": "InlineFragment",
                  "selections": (v8/*: any*/),
                  "type": "Node",
                  "abstractKey": "__isNode"
                },
                {
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
                    }
                  ],
                  "type": "FileInterface",
                  "abstractKey": "__isFileInterface"
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
v10 = [
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
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "arguments",
  "plural": true,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "environment",
  "plural": true,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "metrics",
  "plural": true,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "GeneralTask",
  "kind": "LinkedField",
  "name": "parent",
  "plural": false,
  "selections": (v8/*: any*/),
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
              (v9/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "TaskTaskRelationConnection",
                "kind": "LinkedField",
                "name": "parents",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TaskTaskRelationEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "TaskTaskRelation",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v14/*: any*/)
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
          (v7/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v9/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "TaskTaskRelationConnection",
                "kind": "LinkedField",
                "name": "parents",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TaskTaskRelationEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "TaskTaskRelation",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v14/*: any*/),
                          (v2/*: any*/)
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
            "type": "RuptureGenerationTask",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4ae73271e413f7e2f153ded364117caf",
    "id": null,
    "metadata": {},
    "name": "RuptureGenerationTaskQuery",
    "operationKind": "query",
    "text": "query RuptureGenerationTaskQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on RuptureGenerationTask {\n      id\n      duration\n      created\n      result\n      state\n      files {\n        edges {\n          node {\n            file_id\n            thing_id\n            role\n            file {\n              __typename\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n              ... on FileInterface {\n                __isFileInterface: __typename\n                file_name\n                file_url\n              }\n            }\n          }\n        }\n      }\n      arguments {\n        k\n        v\n      }\n      environment {\n        k\n        v\n      }\n      metrics {\n        k\n        v\n      }\n      parents {\n        edges {\n          node {\n            parent {\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6a70101348da841dfb3add0b68997144';
export default node;
