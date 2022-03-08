/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EventResult = "FAILURE" | "PARTIAL" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type EventState = "DONE" | "SCHEDULED" | "STARTED" | "UNDEFINED" | "%future added value";
export type FileRole = "READ" | "READ_WRITE" | "UNDEFINED" | "WRITE" | "%future added value";
export type ModelType = "CRUSTAL" | "SUBDUCTION" | "%future added value";
export type TaskSubType = "HAZARD" | "INVERSION" | "REPORT" | "RUPTURE_SET" | "%future added value";
export type AutomationTaskQueryVariables = {
    id: string;
};
export type AutomationTaskQueryResponse = {
    readonly node: {
        readonly id: string;
        readonly duration?: number | null | undefined;
        readonly created?: unknown | null | undefined;
        readonly result?: EventResult | null | undefined;
        readonly state?: EventState | null | undefined;
        readonly task_type?: TaskSubType | null | undefined;
        readonly model_type?: ModelType | null | undefined;
        readonly files?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
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
                    } | null;
                } | null;
            } | null>;
        } | null | undefined;
    } | null;
};
export type AutomationTaskQuery = {
    readonly response: AutomationTaskQueryResponse;
    readonly variables: AutomationTaskQueryVariables;
};



/*
query AutomationTaskQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    id
    ... on AutomationTask {
      id
      duration
      created
      result
      state
      task_type
      model_type
      files {
        edges {
          node {
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
v4 = [
  (v2/*: any*/)
],
v5 = [
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
v6 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "duration",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "created",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "result",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "task_type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "model_type",
      "storageKey": null
    },
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
                    (v3/*: any*/),
                    {
                      "kind": "InlineFragment",
                      "selections": (v4/*: any*/),
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
    {
      "alias": null,
      "args": null,
      "concreteType": "KeyValuePair",
      "kind": "LinkedField",
      "name": "arguments",
      "plural": true,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "KeyValuePair",
      "kind": "LinkedField",
      "name": "environment",
      "plural": true,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "KeyValuePair",
      "kind": "LinkedField",
      "name": "metrics",
      "plural": true,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
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
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "GeneralTask",
                  "kind": "LinkedField",
                  "name": "parent",
                  "plural": false,
                  "selections": (v4/*: any*/),
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
    }
  ],
  "type": "AutomationTask",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AutomationTaskQuery",
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
          (v6/*: any*/)
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
    "name": "AutomationTaskQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "371bb04d7f12caec7585e7f1ab9eafed",
    "id": null,
    "metadata": {},
    "name": "AutomationTaskQuery",
    "operationKind": "query",
    "text": "query AutomationTaskQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on AutomationTask {\n      id\n      duration\n      created\n      result\n      state\n      task_type\n      model_type\n      files {\n        edges {\n          node {\n            role\n            file {\n              __typename\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n              ... on FileInterface {\n                __isFileInterface: __typename\n                file_name\n                file_url\n              }\n            }\n          }\n        }\n      }\n      arguments {\n        k\n        v\n      }\n      environment {\n        k\n        v\n      }\n      metrics {\n        k\n        v\n      }\n      parents {\n        edges {\n          node {\n            parent {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2c5609e7eebd35bca611599d91fe3870';
export default node;
