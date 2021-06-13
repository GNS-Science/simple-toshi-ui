/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type EventResult = "FAILURE" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type EventState = "DONE" | "SCHEDULED" | "STARTED" | "UNDEFINED" | "%future added value";
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
                    readonly created?: unknown | null;
                    readonly duration?: number | null;
                    readonly state?: EventState | null;
                    readonly result?: EventResult | null;
                    readonly description?: string | null;
                    readonly title?: string | null;
                    readonly children?: {
                        readonly total_count: number | null;
                    } | null;
                    readonly file_name?: string | null;
                    readonly file_size?: number | null;
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
            id
            duration
            state
            result
          }
          ... on GeneralTask {
            description
            title
            created
            children {
              total_count
            }
          }
          ... on File {
            id
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created",
  "storageKey": null
},
v4 = [
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
                      (v2/*: any*/)
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v3/*: any*/),
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
                        "name": "title",
                        "storageKey": null
                      },
                      (v3/*: any*/),
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
                      (v2/*: any*/),
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
                    "type": "File",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchQuery",
    "selections": (v4/*: any*/),
    "type": "QueryRoot",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "967b075a4605a47c1b6e813686a16375",
    "id": null,
    "metadata": {},
    "name": "SearchQuery",
    "operationKind": "query",
    "text": "query SearchQuery(\n  $search: String!\n) {\n  search(search_term: $search) {\n    search_result {\n      total_count\n      edges {\n        node {\n          __typename\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n          ... on RuptureGenerationTask {\n            created\n            id\n            duration\n            state\n            result\n          }\n          ... on GeneralTask {\n            description\n            title\n            created\n            children {\n              total_count\n            }\n          }\n          ... on File {\n            id\n            file_name\n            file_size\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0e4ddefedee8a767c0d1349d95b6c783';
export default node;
