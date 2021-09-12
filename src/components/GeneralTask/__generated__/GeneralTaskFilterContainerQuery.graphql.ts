/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TaskSubType = "HAZARD" | "INVERSION" | "REPORT" | "RUPTURE_SET" | "%future added value";
export type GeneralTaskFilterContainerQueryVariables = {
    id?: Array<string> | null;
};
export type GeneralTaskFilterContainerQueryResponse = {
    readonly nodes: {
        readonly result: {
            readonly edges: ReadonlyArray<{
                readonly node: ({
                    readonly __typename: "AutomationTask";
                    readonly created: unknown | null;
                    readonly task_type: TaskSubType | null;
                    readonly inversion_solution: {
                        readonly id: string;
                        readonly file_name: string | null;
                        readonly meta: ReadonlyArray<{
                            readonly k: string | null;
                            readonly v: string | null;
                        } | null> | null;
                    } | null;
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }) | null;
            } | null>;
        } | null;
    } | null;
};
export type GeneralTaskFilterContainerQuery = {
    readonly response: GeneralTaskFilterContainerQueryResponse;
    readonly variables: GeneralTaskFilterContainerQueryVariables;
};



/*
query GeneralTaskFilterContainerQuery(
  $id: [ID!]
) {
  nodes(id_in: $id) {
    result {
      edges {
        node {
          __typename
          ... on AutomationTask {
            created
            task_type
            inversion_solution {
              id
              file_name
              meta {
                k
                v
              }
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
    "name": "id_in",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
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
      "name": "task_type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "InversionSolution",
      "kind": "LinkedField",
      "name": "inversion_solution",
      "plural": false,
      "selections": [
        (v3/*: any*/),
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
    "name": "GeneralTaskFilterContainerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "NodeFilter",
        "kind": "LinkedField",
        "name": "nodes",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchResultConnection",
            "kind": "LinkedField",
            "name": "result",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SearchResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v4/*: any*/)
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
    "type": "QueryRoot",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GeneralTaskFilterContainerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "NodeFilter",
        "kind": "LinkedField",
        "name": "nodes",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchResultConnection",
            "kind": "LinkedField",
            "name": "result",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SearchResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v4/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/)
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
      }
    ]
  },
  "params": {
    "cacheID": "2f03437322615211a01ca1d3dc0bfdc4",
    "id": null,
    "metadata": {},
    "name": "GeneralTaskFilterContainerQuery",
    "operationKind": "query",
    "text": "query GeneralTaskFilterContainerQuery(\n  $id: [ID!]\n) {\n  nodes(id_in: $id) {\n    result {\n      edges {\n        node {\n          __typename\n          ... on AutomationTask {\n            created\n            task_type\n            inversion_solution {\n              id\n              file_name\n              meta {\n                k\n                v\n              }\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '136f13995a0777cefa44de571cf8575b';
export default node;
