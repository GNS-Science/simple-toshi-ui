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
                readonly node: ({
                    readonly __typename: "AutomationTask";
                    readonly id: string;
                    readonly task_type: TaskSubType | null;
                    readonly parents: {
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
                    } | null;
                    readonly files: {
                        readonly edges: ReadonlyArray<{
                            readonly node: {
                                readonly file: {
                                    readonly id?: string | undefined;
                                    readonly meta?: ReadonlyArray<{
                                        readonly k: string | null;
                                        readonly v: string | null;
                                    } | null> | null | undefined;
                                    readonly source_solution?: {
                                        readonly id: string;
                                        readonly meta: ReadonlyArray<{
                                            readonly k: string | null;
                                            readonly v: string | null;
                                        } | null> | null;
                                    } | null | undefined;
                                } | null;
                            } | null;
                        } | null>;
                    } | null;
                    readonly inversion_solution: {
                        readonly id: string;
                        readonly mfd_table_id: string | null;
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
                      source_solution {
                        id
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
            inversion_solution {
              id
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
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
    (v7/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "InversionSolution",
      "kind": "LinkedField",
      "name": "source_solution",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        (v7/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "ScaledInversionSolution",
  "abstractKey": null
},
v9 = {
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
v10 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};
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
                          (v9/*: any*/)
                        ],
                        "type": "AutomationTask",
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
                                          (v8/*: any*/),
                                          (v10/*: any*/)
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
                          (v9/*: any*/)
                        ],
                        "type": "AutomationTask",
                        "abstractKey": null
                      },
                      (v10/*: any*/)
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
    "cacheID": "242f0f440027d3cf2463e6a92cd41960",
    "id": null,
    "metadata": {},
    "name": "MySolutionsQuery",
    "operationKind": "query",
    "text": "query MySolutionsQuery(\n  $id: [ID!]\n) {\n  nodes(id_in: $id) {\n    result {\n      edges {\n        node {\n          __typename\n          ... on AutomationTask {\n            id\n            task_type\n            parents {\n              edges {\n                node {\n                  parent {\n                    id\n                    created\n                    title\n                    description\n                    model_type\n                    swept_arguments\n                    notes\n                    argument_lists {\n                      k\n                      v\n                    }\n                  }\n                }\n              }\n            }\n            files {\n              edges {\n                node {\n                  file {\n                    __typename\n                    ... on ScaledInversionSolution {\n                      id\n                      meta {\n                        k\n                        v\n                      }\n                      source_solution {\n                        id\n                        meta {\n                          k\n                          v\n                        }\n                      }\n                    }\n                    ... on Node {\n                      __isNode: __typename\n                      id\n                    }\n                  }\n                }\n              }\n            }\n            inversion_solution {\n              id\n              mfd_table_id\n              meta {\n                k\n                v\n              }\n              tables {\n                table_id\n                table_type\n              }\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '81764bfee897cfda541b69439781290d';
export default node;
