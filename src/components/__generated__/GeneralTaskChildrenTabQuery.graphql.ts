/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type EventResult = "FAILURE" | "PARTIAL" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type EventState = "DONE" | "SCHEDULED" | "STARTED" | "UNDEFINED" | "%future added value";
export type GeneralTaskChildrenTabQueryVariables = {
    id: string;
};
export type GeneralTaskChildrenTabQueryResponse = {
    readonly node: {
        readonly id?: string;
        readonly children?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly child: {
                        readonly __typename: "RuptureGenerationTask";
                        readonly id: string;
                        readonly created: unknown | null;
                        readonly duration: number | null;
                        readonly state: EventState | null;
                        readonly result: EventResult | null;
                    } | {
                        /*This will never be '%other', but we need some
                        value in case none of the concrete values match.*/
                        readonly __typename: "%other";
                    };
                } | null;
            } | null>;
        } | null;
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
      children {
        edges {
          node {
            child {
              __typename
              ... on RuptureGenerationTask {
                __typename
                id
                created
                duration
                state
                result
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
  "name": "__typename",
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
  "name": "duration",
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
  "name": "result",
  "storageKey": null
};
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
                                "selections": [
                                  (v3/*: any*/),
                                  (v2/*: any*/),
                                  (v4/*: any*/),
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  (v7/*: any*/)
                                ],
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
          (v3/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
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
                              (v3/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v2/*: any*/),
                                  (v4/*: any*/),
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  (v7/*: any*/)
                                ],
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
    "cacheID": "0e6dfe07f8ad2ee0b97b7bc455973e29",
    "id": null,
    "metadata": {},
    "name": "GeneralTaskChildrenTabQuery",
    "operationKind": "query",
    "text": "query GeneralTaskChildrenTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on GeneralTask {\n      id\n      children {\n        edges {\n          node {\n            child {\n              __typename\n              ... on RuptureGenerationTask {\n                __typename\n                id\n                created\n                duration\n                state\n                result\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b049f7a21baf38243457726661a9a8d9';
export default node;
