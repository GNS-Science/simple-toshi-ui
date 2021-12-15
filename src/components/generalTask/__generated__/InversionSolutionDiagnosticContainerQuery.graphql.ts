/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type TableType = "GENERAL" | "HAZARD_GRIDDED" | "HAZARD_SITES" | "MFD_CURVES" | "%future added value";
export type TaskSubType = "HAZARD" | "INVERSION" | "REPORT" | "RUPTURE_SET" | "%future added value";
export type InversionSolutionDiagnosticContainerQueryVariables = {
    id?: Array<string> | null | undefined;
};
export type InversionSolutionDiagnosticContainerQueryResponse = {
    readonly nodes: {
        readonly result: {
            readonly edges: ReadonlyArray<{
                readonly node: ({
                    readonly __typename: "AutomationTask";
                    readonly created: unknown | null;
                    readonly task_type: TaskSubType | null;
                    readonly id: string;
                    readonly inversion_solution: {
                        readonly id: string;
                        readonly file_name: string | null;
                        readonly meta: ReadonlyArray<{
                            readonly k: string | null;
                            readonly v: string | null;
                        } | null> | null;
                        readonly tables: ReadonlyArray<{
                            readonly table_id: string | null;
                            readonly table_type: TableType | null;
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
export type InversionSolutionDiagnosticContainerQuery = {
    readonly response: InversionSolutionDiagnosticContainerQueryResponse;
    readonly variables: InversionSolutionDiagnosticContainerQueryVariables;
};



/*
query InversionSolutionDiagnosticContainerQuery(
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
            id
            inversion_solution {
              id
              file_name
              meta {
                k
                v
              }
              tables {
                table_id
                table_type
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
    (v3/*: any*/),
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "LabelledTableRelation",
          "kind": "LinkedField",
          "name": "tables",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "table_id",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "table_type",
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
    "name": "InversionSolutionDiagnosticContainerQuery",
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
    "name": "InversionSolutionDiagnosticContainerQuery",
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
    "cacheID": "de9bcb6219aec80fc9a622eb08c23589",
    "id": null,
    "metadata": {},
    "name": "InversionSolutionDiagnosticContainerQuery",
    "operationKind": "query",
    "text": "query InversionSolutionDiagnosticContainerQuery(\n  $id: [ID!]\n) {\n  nodes(id_in: $id) {\n    result {\n      edges {\n        node {\n          __typename\n          ... on AutomationTask {\n            created\n            task_type\n            id\n            inversion_solution {\n              id\n              file_name\n              meta {\n                k\n                v\n              }\n              tables {\n                table_id\n                table_type\n              }\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c1f737f84a5d766592e85b94fab9b2aa';
export default node;
