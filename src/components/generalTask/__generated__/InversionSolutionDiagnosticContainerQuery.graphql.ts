/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type TableType = "GENERAL" | "HAZARD_GRIDDED" | "HAZARD_SITES" | "MFD_CURVES" | "MFD_CURVES_V2" | "%future added value";
export type TaskSubType = "AGGREGATE_SOLUTION" | "HAZARD" | "INVERSION" | "OPENQUAKE_HAZARD" | "REPORT" | "RUPTURE_SET" | "SCALE_SOLUTION" | "SOLUTION_TO_NRML" | "TIME_DEPENDENT_SOLUTION" | "%future added value";
export type InversionSolutionDiagnosticContainerQueryVariables = {
    id?: Array<string> | null | undefined;
};
export type InversionSolutionDiagnosticContainerQueryResponse = {
    readonly nodes: {
        readonly result: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly __typename: string;
                    readonly __isNode?: string | undefined;
                    readonly id?: string | undefined;
                    readonly created?: unknown | null | undefined;
                    readonly task_type?: TaskSubType | null | undefined;
                    readonly files?: {
                        readonly edges: ReadonlyArray<{
                            readonly node: {
                                readonly file: {
                                    readonly __typename: string;
                                    readonly __isNode?: string | undefined;
                                    readonly id?: string | undefined;
                                    readonly meta?: ReadonlyArray<{
                                        readonly k: string | null;
                                        readonly v: string | null;
                                    } | null> | null | undefined;
                                    readonly predecessors?: ReadonlyArray<{
                                        readonly __typename: string;
                                        readonly pre_id: string | null;
                                        readonly relationship: string | null;
                                        readonly depth: number | null;
                                        readonly node: {
                                            readonly file_meta?: ReadonlyArray<{
                                                readonly k: string | null;
                                                readonly v: string | null;
                                            } | null> | null | undefined;
                                            readonly is_meta?: ReadonlyArray<{
                                                readonly k: string | null;
                                                readonly v: string | null;
                                            } | null> | null | undefined;
                                            readonly td_meta?: ReadonlyArray<{
                                                readonly k: string | null;
                                                readonly v: string | null;
                                            } | null> | null | undefined;
                                        } | null;
                                    } | null> | null | undefined;
                                } | null;
                            } | null;
                        } | null>;
                    } | null | undefined;
                    readonly inversion_solution?: {
                        readonly id: string;
                        readonly file_name: string | null;
                        readonly mfd_table_id: string | null;
                        readonly meta: ReadonlyArray<{
                            readonly k: string | null;
                            readonly v: string | null;
                        } | null> | null;
                        readonly tables: ReadonlyArray<{
                            readonly table_id: string | null;
                            readonly table_type: TableType | null;
                        } | null> | null;
                    } | null | undefined;
                } | null;
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
            files {
              edges {
                node {
                  file {
                    __typename
                    ... on ScaledInversionSolution {
                      id
                      meta {
                        k
                        v
                      }
                      predecessors {
                        __typename
                        pre_id: id
                        relationship
                        depth
                        node {
                          __typename
                          ... on File {
                            file_meta: meta {
                              k
                              v
                            }
                          }
                          ... on InversionSolution {
                            is_meta: meta {
                              k
                              v
                            }
                          }
                          ... on TimeDependentInversionSolution {
                            td_meta: meta {
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
                    ... on TimeDependentInversionSolution {
                      id
                      meta {
                        k
                        v
                      }
                      predecessors {
                        __typename
                        pre_id: id
                        relationship
                        depth
                        node {
                          __typename
                          ... on File {
                            file_meta: meta {
                              k
                              v
                            }
                          }
                          ... on InversionSolution {
                            is_meta: meta {
                              k
                              v
                            }
                          }
                          ... on TimeDependentInversionSolution {
                            td_meta: meta {
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
                    ... on Node {
                      __isNode: __typename
                      id
                    }
                  }
                }
              }
            }
            inversion_solution {
              id
              file_name
              mfd_table_id
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
  "name": "created",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "task_type",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
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
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "meta",
  "plural": true,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": "pre_id",
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "relationship",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "depth",
  "storageKey": null
},
v11 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": "file_meta",
      "args": null,
      "concreteType": "KeyValuePair",
      "kind": "LinkedField",
      "name": "meta",
      "plural": true,
      "selections": (v6/*: any*/),
      "storageKey": null
    }
  ],
  "type": "File",
  "abstractKey": null
},
v12 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": "is_meta",
      "args": null,
      "concreteType": "KeyValuePair",
      "kind": "LinkedField",
      "name": "meta",
      "plural": true,
      "selections": (v6/*: any*/),
      "storageKey": null
    }
  ],
  "type": "InversionSolution",
  "abstractKey": null
},
v13 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": "td_meta",
      "args": null,
      "concreteType": "KeyValuePair",
      "kind": "LinkedField",
      "name": "meta",
      "plural": true,
      "selections": (v6/*: any*/),
      "storageKey": null
    }
  ],
  "type": "TimeDependentInversionSolution",
  "abstractKey": null
},
v14 = [
  (v5/*: any*/),
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Predecessor",
    "kind": "LinkedField",
    "name": "predecessors",
    "plural": true,
    "selections": [
      (v2/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/),
      (v10/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v15 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": "__isNode",
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    (v5/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "InversionSolution",
  "kind": "LinkedField",
  "name": "inversion_solution",
  "plural": false,
  "selections": [
    (v5/*: any*/),
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
      "name": "mfd_table_id",
      "storageKey": null
    },
    (v7/*: any*/),
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
},
v17 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v18 = [
  (v5/*: any*/),
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Predecessor",
    "kind": "LinkedField",
    "name": "predecessors",
    "plural": true,
    "selections": [
      (v2/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/),
      (v10/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v17/*: any*/)
        ],
        "storageKey": null
      },
      (v5/*: any*/)
    ],
    "storageKey": null
  }
];
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
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
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
                                        "concreteType": null,
                                        "kind": "LinkedField",
                                        "name": "file",
                                        "plural": false,
                                        "selections": [
                                          (v2/*: any*/),
                                          {
                                            "kind": "InlineFragment",
                                            "selections": (v14/*: any*/),
                                            "type": "ScaledInversionSolution",
                                            "abstractKey": null
                                          },
                                          {
                                            "kind": "InlineFragment",
                                            "selections": (v14/*: any*/),
                                            "type": "TimeDependentInversionSolution",
                                            "abstractKey": null
                                          },
                                          (v15/*: any*/)
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
                          (v16/*: any*/)
                        ],
                        "type": "AutomationTask",
                        "abstractKey": null
                      },
                      (v15/*: any*/)
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
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
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
                                        "concreteType": null,
                                        "kind": "LinkedField",
                                        "name": "file",
                                        "plural": false,
                                        "selections": [
                                          (v2/*: any*/),
                                          {
                                            "kind": "InlineFragment",
                                            "selections": (v18/*: any*/),
                                            "type": "ScaledInversionSolution",
                                            "abstractKey": null
                                          },
                                          {
                                            "kind": "InlineFragment",
                                            "selections": (v18/*: any*/),
                                            "type": "TimeDependentInversionSolution",
                                            "abstractKey": null
                                          },
                                          (v17/*: any*/)
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
                          (v16/*: any*/)
                        ],
                        "type": "AutomationTask",
                        "abstractKey": null
                      },
                      (v17/*: any*/)
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
    "cacheID": "dbfb72c12a713ee4f336e2b7d3471fbd",
    "id": null,
    "metadata": {},
    "name": "InversionSolutionDiagnosticContainerQuery",
    "operationKind": "query",
    "text": "query InversionSolutionDiagnosticContainerQuery(\n  $id: [ID!]\n) {\n  nodes(id_in: $id) {\n    result {\n      edges {\n        node {\n          __typename\n          ... on AutomationTask {\n            created\n            task_type\n            id\n            files {\n              edges {\n                node {\n                  file {\n                    __typename\n                    ... on ScaledInversionSolution {\n                      id\n                      meta {\n                        k\n                        v\n                      }\n                      predecessors {\n                        __typename\n                        pre_id: id\n                        relationship\n                        depth\n                        node {\n                          __typename\n                          ... on File {\n                            file_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on InversionSolution {\n                            is_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on TimeDependentInversionSolution {\n                            td_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on Node {\n                            __isNode: __typename\n                            id\n                          }\n                        }\n                        id\n                      }\n                    }\n                    ... on TimeDependentInversionSolution {\n                      id\n                      meta {\n                        k\n                        v\n                      }\n                      predecessors {\n                        __typename\n                        pre_id: id\n                        relationship\n                        depth\n                        node {\n                          __typename\n                          ... on File {\n                            file_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on InversionSolution {\n                            is_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on TimeDependentInversionSolution {\n                            td_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on Node {\n                            __isNode: __typename\n                            id\n                          }\n                        }\n                        id\n                      }\n                    }\n                    ... on Node {\n                      __isNode: __typename\n                      id\n                    }\n                  }\n                }\n              }\n            }\n            inversion_solution {\n              id\n              file_name\n              mfd_table_id\n              meta {\n                k\n                v\n              }\n              tables {\n                table_id\n                table_type\n              }\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd97c53fc4d99d4a0ab04c2d83758c1ef';
export default node;
