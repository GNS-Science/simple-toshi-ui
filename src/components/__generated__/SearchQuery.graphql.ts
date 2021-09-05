/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type EventResult = "FAILURE" | "PARTIAL" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type EventState = "DONE" | "SCHEDULED" | "STARTED" | "UNDEFINED" | "%future added value";
export type ModelType = "CRUSTAL" | "SUBDUCTION" | "%future added value";
export type TaskSubType = "HAZARD" | "INVERSIONS" | "RUPTURE_SETS" | "%future added value";
export type SearchQueryVariables = {
    search: string;
};
export type SearchQueryResponse = {
    readonly search: {
        readonly search_result: {
            readonly total_count: number | null;
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly __typename: string;
                    readonly id?: string;
                    readonly file_name?: string | null;
                    readonly file_size?: number | null;
                    readonly created?: unknown | null;
                    readonly duration?: number | null;
                    readonly state?: EventState | null;
                    readonly result?: EventResult | null;
                    readonly description?: string | null;
                    readonly notes?: string | null;
                    readonly title?: string | null;
                    readonly model_type?: ModelType | null;
                    readonly subtask_type?: TaskSubType | null;
                    readonly subtask_count?: number | null;
                    readonly subtask_result?: EventResult | null;
                    readonly children?: {
                        readonly total_count: number | null;
                    } | null;
                } | null;
            } | null>;
        } | null;
    } | null;
};
export type SearchQuery = {
    readonly response: SearchQueryResponse;
    readonly variables: SearchQueryVariables;
};



/*
query SearchQuery(
  $search: String!
) {
  search(search_term: $search) {
    search_result {
      total_count
      edges {
        node {
          __typename
          ... on Node {
            __isNode: __typename
            id
          }
          ... on RuptureGenerationTask {
            created
            duration
            state
            result
          }
          ... on GeneralTask {
            description
            notes
            title
            created
            model_type
            subtask_type
            subtask_count
            subtask_result
            children {
              total_count
            }
          }
          ... on FileInterface {
            __isFileInterface: __typename
            file_name
            file_size
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
    "name": "search"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "total_count",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "search_term",
        "variableName": "search"
      }
    ],
    "concreteType": "Search",
    "kind": "LinkedField",
    "name": "search",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SearchResultConnection",
        "kind": "LinkedField",
        "name": "search_result",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      }
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
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
                        "name": "state",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "result",
                        "storageKey": null
                      }
                    ],
                    "type": "RuptureGenerationTask",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
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
                        "name": "notes",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v2/*: any*/),
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
                        "name": "subtask_type",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "subtask_count",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "subtask_result",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "TaskTaskRelationConnection",
                        "kind": "LinkedField",
                        "name": "children",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "GeneralTask",
                    "abstractKey": null
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
                        "name": "file_size",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchQuery",
    "selections": (v3/*: any*/),
    "type": "QueryRoot",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "c1b3537b7dddf1e9dc83003bfc5112fe",
    "id": null,
    "metadata": {},
    "name": "SearchQuery",
    "operationKind": "query",
    "text": "query SearchQuery(\n  $search: String!\n) {\n  search(search_term: $search) {\n    search_result {\n      total_count\n      edges {\n        node {\n          __typename\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n          ... on RuptureGenerationTask {\n            created\n            duration\n            state\n            result\n          }\n          ... on GeneralTask {\n            description\n            notes\n            title\n            created\n            model_type\n            subtask_type\n            subtask_count\n            subtask_result\n            children {\n              total_count\n            }\n          }\n          ... on FileInterface {\n            __isFileInterface: __typename\n            file_name\n            file_size\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd85db787686c9d78e641106419014811';
export default node;
