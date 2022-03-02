/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EventResult = "FAILURE" | "PARTIAL" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type EventState = "DONE" | "SCHEDULED" | "STARTED" | "UNDEFINED" | "%future added value";
export type ModelType = "CRUSTAL" | "SUBDUCTION" | "%future added value";
export type GeneralTaskChildrenTabQueryVariables = {
    id: string;
};
export type GeneralTaskChildrenTabQueryResponse = {
    readonly node: {
        readonly id?: string | undefined;
        readonly model_type?: ModelType | null | undefined;
        readonly children?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly child: ({
                        readonly __typename: "AutomationTask";
                        readonly id: string;
                        readonly created: unknown | null;
                        readonly duration: number | null;
                        readonly state: EventState | null;
                        readonly result: EventResult | null;
                        readonly arguments: ReadonlyArray<{
                            readonly k: string | null;
                            readonly v: string | null;
                        } | null> | null;
                    } | {
                        readonly __typename: "RuptureGenerationTask";
                        readonly id: string;
                        readonly created: unknown | null;
                        readonly duration: number | null;
                        readonly state: EventState | null;
                        readonly result: EventResult | null;
                        readonly arguments: ReadonlyArray<{
                            readonly k: string | null;
                            readonly v: string | null;
                        } | null> | null;
                    } | {
                        /*This will never be '%other', but we need some
                        value in case none of the concrete values match.*/
                        readonly __typename: "%other";
                    }) | null;
                } | null;
            } | null>;
        } | null | undefined;
    } | null;
};
export type GeneralTaskChildrenTabQuery = {
    readonly response: GeneralTaskChildrenTabQueryResponse;
    readonly variables: GeneralTaskChildrenTabQueryVariables;
};



/*
query GeneralTaskChildrenTabQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on GeneralTask {
      id
      model_type
      children {
        edges {
          node {
            child {
              __typename
              ... on AutomationTask {
                __typename
                id
                created
                duration
                state
                result
                arguments {
                  k
                  v
                }
              }
              ... on RuptureGenerationTask {
                __typename
                id
                created
                duration
                state
                result
                arguments {
                  k
                  v
                }
              }
              ... on Node {
                __isNode: __typename
                id
              }
            }
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
  "name": "model_type",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "duration",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "result",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "arguments",
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
v10 = [
  (v4/*: any*/),
  (v2/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/)
],
v11 = [
  (v2/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneralTaskChildrenTabQuery",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "TaskTaskRelationConnection",
                "kind": "LinkedField",
                "name": "children",
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
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "child",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "InlineFragment",
                                "selections": (v10/*: any*/),
                                "type": "AutomationTask",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v10/*: any*/),
                                "type": "RuptureGenerationTask",
                                "abstractKey": null
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
              }
            ],
            "type": "GeneralTask",
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
    "name": "GeneralTaskChildrenTabQuery",
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "TaskTaskRelationConnection",
                "kind": "LinkedField",
                "name": "children",
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
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "child",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v11/*: any*/),
                                "type": "AutomationTask",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v11/*: any*/),
                                "type": "RuptureGenerationTask",
                                "abstractKey": null
                              },
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
                          },
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
            "type": "GeneralTask",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "42183d436562b19443944f621f81c892",
    "id": null,
    "metadata": {},
    "name": "GeneralTaskChildrenTabQuery",
    "operationKind": "query",
    "text": "query GeneralTaskChildrenTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on GeneralTask {\n      id\n      model_type\n      children {\n        edges {\n          node {\n            child {\n              __typename\n              ... on AutomationTask {\n                __typename\n                id\n                created\n                duration\n                state\n                result\n                arguments {\n                  k\n                  v\n                }\n              }\n              ... on RuptureGenerationTask {\n                __typename\n                id\n                created\n                duration\n                state\n                result\n                arguments {\n                  k\n                  v\n                }\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd39c6d0d7add7f24d5eaed91f6d2697f';
export default node;
