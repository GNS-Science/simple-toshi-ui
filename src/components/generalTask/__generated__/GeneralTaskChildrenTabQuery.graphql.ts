/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EventResult = "FAILURE" | "PARTIAL" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type EventState = "DONE" | "SCHEDULED" | "STARTED" | "UNDEFINED" | "%future added value";
export type ModelType = "COMPOSITE" | "CRUSTAL" | "SUBDUCTION" | "%future added value";
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
                    readonly child: {
                        readonly __typename: string;
                        readonly id?: string | undefined;
                        readonly state?: EventState | null | undefined;
                        readonly result?: EventResult | null | undefined;
                        readonly created?: unknown | null | undefined;
                        readonly duration?: number | null | undefined;
                        readonly arguments?: ReadonlyArray<{
                            readonly k: string | null;
                            readonly v: string | null;
                        } | null> | null | undefined;
                    } | null;
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
              ... on Node {
                __isNode: __typename
                id
              }
              ... on AutomationTaskInterface {
                __isAutomationTaskInterface: __typename
                state
                result
                created
                duration
                arguments {
                  k
                  v
                }
              }
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
                  "selections": [
                    (v2/*: any*/)
                  ],
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
                      "name": "state",
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
                      "name": "created",
                      "storageKey": null
                    },
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
                    }
                  ],
                  "type": "AutomationTaskInterface",
                  "abstractKey": "__isAutomationTaskInterface"
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
              (v3/*: any*/),
              (v5/*: any*/)
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
              (v5/*: any*/)
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
    "cacheID": "b2c989d3f0fa6a3a7f3ae836937e6df7",
    "id": null,
    "metadata": {},
    "name": "GeneralTaskChildrenTabQuery",
    "operationKind": "query",
    "text": "query GeneralTaskChildrenTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on GeneralTask {\n      id\n      model_type\n      children {\n        edges {\n          node {\n            child {\n              __typename\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n              ... on AutomationTaskInterface {\n                __isAutomationTaskInterface: __typename\n                state\n                result\n                created\n                duration\n                arguments {\n                  k\n                  v\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b23d4d36a45baccbaa8680cad0fa1505';
export default node;
