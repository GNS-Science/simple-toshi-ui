/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ModelType = "COMPOSITE" | "CRUSTAL" | "SUBDUCTION" | "%future added value";
export type TableType = "GENERAL" | "HAZARD_GRIDDED" | "HAZARD_SITES" | "MFD_CURVES" | "MFD_CURVES_V2" | "%future added value";
export type TaskSubType = "AGGREGATE_SOLUTION" | "HAZARD" | "INVERSION" | "OPENQUAKE_HAZARD" | "REPORT" | "RUPTURE_SET" | "SCALE_SOLUTION" | "SOLUTION_TO_NRML" | "TIME_DEPENDENT_SOLUTION" | "%future added value";
export type MySolutionsQueryVariables = {
    id?: Array<string> | null | undefined;
};
export type MySolutionsQueryResponse = {
    readonly nodes: {
        readonly result: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly __typename: string;
                    readonly __isNode?: string | undefined;
                    readonly id?: string | undefined;
                    readonly task_type?: TaskSubType | null | undefined;
                    readonly parents?: {
                        readonly edges: ReadonlyArray<{
                            readonly node: {
                                readonly parent: {
                                    readonly id: string;
                                    readonly created: unknown | null;
                                    readonly title: string | null;
                                    readonly description: string | null;
                                    readonly model_type: ModelType | null;
                                    readonly swept_arguments: ReadonlyArray<string | null> | null;
                                    readonly notes: string | null;
                                    readonly argument_lists: ReadonlyArray<{
                                        readonly k: string | null;
                                        readonly v: ReadonlyArray<string | null> | null;
                                    } | null> | null;
                                } | null;
                            } | null;
                        } | null>;
                    } | null | undefined;
                    readonly files?: {
                        readonly edges: ReadonlyArray<{
                            readonly node: {
                                readonly file: {
                                    readonly __typename: string;
                                    readonly __isNode?: string | undefined;
                                    readonly node_id?: string | undefined;
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
                        readonly id?: string | undefined;
                        readonly file_name?: string | null | undefined;
                        readonly meta?: ReadonlyArray<{
                            readonly k: string | null;
                            readonly v: string | null;
                        } | null> | null | undefined;
                        readonly mfd_table_id?: string | null | undefined;
                        readonly tables?: ReadonlyArray<{
                            readonly table_id: string | null;
                            readonly table_type: TableType | null;
                        } | null> | null | undefined;
                    } | null | undefined;
                } | null;
            } | null>;
        } | null;
    } | null;
};
export type MySolutionsQuery = {
    readonly response: MySolutionsQueryResponse;
    readonly variables: MySolutionsQueryVariables;
};



/*
query MySolutionsQuery(
  $id: [ID!]
) {
  nodes(id_in: $id) {
    result {
      edges {
        node {
          __typename
          ... on AutomationTask {
            id
            task_type
            parents {
              edges {
                node {
                  parent {
                    id
                    created
                    title
                    description
                    model_type
                    swept_arguments
                    notes
                    argument_lists {
                      k
                      v
                    }
                  }
                }
              }
            }
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
                    ... on Node {
                      __isNode: __typename
                      id
                      node_id: id
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
                  }
                }
              }
            }
            inversion_solution {
              __typename
              ... on Node {
                __isNode: __typename
                id
              }
              ... on FileInterface {
                __isFileInterface: __typename
                file_name
                meta {
                  k
                  v
                }
              }
              ... on InversionSolutionInterface {
                __isInversionSolutionInterface: __typename
                mfd_table_id
                tables {
                  table_id
                  table_type
                }
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "task_type",
  "storageKey": null
},
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
              "selections": [
                (v3/*: any*/),
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
                  "name": "title",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "description",
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
                  "kind": "ScalarField",
                  "name": "swept_arguments",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "notes",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "KeyValueListPair",
                  "kind": "LinkedField",
                  "name": "argument_lists",
                  "plural": true,
                  "selections": (v5/*: any*/),
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
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "meta",
  "plural": true,
  "selections": (v5/*: any*/),
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
      "selections": (v5/*: any*/),
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
      "selections": (v5/*: any*/),
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
      "selections": (v5/*: any*/),
      "storageKey": null
    }
  ],
  "type": "TimeDependentInversionSolution",
  "abstractKey": null
},
v14 = [
  (v3/*: any*/),
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
  "alias": "__isNode",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v16 = {
  "alias": "node_id",
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v17 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v18 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "file_name",
      "storageKey": null
    },
    (v7/*: any*/)
  ],
  "type": "FileInterface",
  "abstractKey": "__isFileInterface"
},
v19 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mfd_table_id",
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
  "type": "InversionSolutionInterface",
  "abstractKey": "__isInversionSolutionInterface"
},
v20 = [
  (v3/*: any*/),
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
      (v3/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MySolutionsQuery",
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
                                          {
                                            "kind": "InlineFragment",
                                            "selections": [
                                              (v15/*: any*/),
                                              (v16/*: any*/)
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "inversion_solution",
                            "plural": false,
                            "selections": [
                              (v17/*: any*/),
                              (v18/*: any*/),
                              (v19/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "AutomationTask",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v15/*: any*/),
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
    ],
    "type": "QueryRoot",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MySolutionsQuery",
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
                                            "selections": (v20/*: any*/),
                                            "type": "ScaledInversionSolution",
                                            "abstractKey": null
                                          },
                                          {
                                            "kind": "InlineFragment",
                                            "selections": [
                                              (v3/*: any*/),
                                              (v16/*: any*/)
                                            ],
                                            "type": "Node",
                                            "abstractKey": "__isNode"
                                          },
                                          {
                                            "kind": "InlineFragment",
                                            "selections": (v20/*: any*/),
                                            "type": "TimeDependentInversionSolution",
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
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "inversion_solution",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v17/*: any*/),
                              (v18/*: any*/),
                              (v19/*: any*/)
                            ],
                            "storageKey": null
                          }
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
    "cacheID": "0562480530540f9de0bd5885029d35b4",
    "id": null,
    "metadata": {},
    "name": "MySolutionsQuery",
    "operationKind": "query",
    "text": "query MySolutionsQuery(\n  $id: [ID!]\n) {\n  nodes(id_in: $id) {\n    result {\n      edges {\n        node {\n          __typename\n          ... on AutomationTask {\n            id\n            task_type\n            parents {\n              edges {\n                node {\n                  parent {\n                    id\n                    created\n                    title\n                    description\n                    model_type\n                    swept_arguments\n                    notes\n                    argument_lists {\n                      k\n                      v\n                    }\n                  }\n                }\n              }\n            }\n            files {\n              edges {\n                node {\n                  file {\n                    __typename\n                    ... on ScaledInversionSolution {\n                      id\n                      meta {\n                        k\n                        v\n                      }\n                      predecessors {\n                        __typename\n                        pre_id: id\n                        relationship\n                        depth\n                        node {\n                          __typename\n                          ... on File {\n                            file_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on InversionSolution {\n                            is_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on TimeDependentInversionSolution {\n                            td_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on Node {\n                            __isNode: __typename\n                            id\n                          }\n                        }\n                        id\n                      }\n                    }\n                    ... on Node {\n                      __isNode: __typename\n                      id\n                      node_id: id\n                    }\n                    ... on TimeDependentInversionSolution {\n                      id\n                      meta {\n                        k\n                        v\n                      }\n                      predecessors {\n                        __typename\n                        pre_id: id\n                        relationship\n                        depth\n                        node {\n                          __typename\n                          ... on File {\n                            file_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on InversionSolution {\n                            is_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on TimeDependentInversionSolution {\n                            td_meta: meta {\n                              k\n                              v\n                            }\n                          }\n                          ... on Node {\n                            __isNode: __typename\n                            id\n                          }\n                        }\n                        id\n                      }\n                    }\n                  }\n                }\n              }\n            }\n            inversion_solution {\n              __typename\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n              ... on FileInterface {\n                __isFileInterface: __typename\n                file_name\n                meta {\n                  k\n                  v\n                }\n              }\n              ... on InversionSolutionInterface {\n                __isInversionSolutionInterface: __typename\n                mfd_table_id\n                tables {\n                  table_id\n                  table_type\n                }\n              }\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd64c86ec71007fa6e6477a41bf8b2ded';
export default node;
