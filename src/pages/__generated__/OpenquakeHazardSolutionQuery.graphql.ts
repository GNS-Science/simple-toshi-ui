/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type OpenquakeHazardSolutionQueryVariables = {
    id: string;
};
export type OpenquakeHazardSolutionQueryResponse = {
    readonly node: {
        readonly id?: string | undefined;
        readonly created?: unknown | null | undefined;
        readonly produced_by?: {
            readonly id: string;
        } | null | undefined;
        readonly config?: {
            readonly id: string;
            readonly created: unknown | null;
            readonly source_models: ReadonlyArray<{
                readonly id: string;
                readonly file_name: string | null;
                readonly file_url: string | null;
                readonly meta: ReadonlyArray<{
                    readonly k: string | null;
                    readonly v: string | null;
                } | null> | null;
                readonly source_solution: {
                    readonly id: string;
                } | null;
            } | null> | null;
            readonly template_archive: {
                readonly meta: ReadonlyArray<{
                    readonly k: string | null;
                    readonly v: string | null;
                } | null> | null;
                readonly file_name: string | null;
                readonly file_size: unknown | null;
                readonly file_url: string | null;
                readonly md5_digest: string | null;
            } | null;
        } | null | undefined;
        readonly csv_archive?: {
            readonly id: string;
            readonly file_name: string | null;
            readonly file_size: unknown | null;
            readonly file_url: string | null;
        } | null | undefined;
        readonly hdf5_archive?: {
            readonly id: string;
            readonly file_name: string | null;
            readonly file_size: unknown | null;
            readonly file_url: string | null;
        } | null | undefined;
        readonly predecessors?: ReadonlyArray<{
            readonly id: string | null;
            readonly typename: string | null;
            readonly depth: number | null;
            readonly node: {
                readonly file_name?: string | null | undefined;
                readonly meta?: ReadonlyArray<{
                    readonly k: string | null;
                    readonly v: string | null;
                } | null> | null | undefined;
            } | null;
        } | null> | null | undefined;
    } | null;
};
export type OpenquakeHazardSolutionQuery = {
    readonly response: OpenquakeHazardSolutionQueryResponse;
    readonly variables: OpenquakeHazardSolutionQueryVariables;
};



/*
query OpenquakeHazardSolutionQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on OpenquakeHazardSolution {
      id
      created
      produced_by {
        id
      }
      config {
        id
        created
        source_models {
          id
          file_name
          file_url
          meta {
            k
            v
          }
          source_solution {
            id
          }
        }
        template_archive {
          meta {
            k
            v
          }
          file_name
          file_size
          file_url
          md5_digest
          id
        }
      }
      csv_archive {
        id
        file_name
        file_size
        file_url
      }
      hdf5_archive {
        id
        file_name
        file_size
        file_url
      }
      predecessors {
        id
        typename
        depth
        node {
          __typename
          ... on FileInterface {
            __isFileInterface: __typename
            file_name
            meta {
              k
              v
            }
          }
          ... on Node {
            __isNode: __typename
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
  "name": "created",
  "storageKey": null
},
v4 = [
  (v2/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "OpenquakeHazardTask",
  "kind": "LinkedField",
  "name": "produced_by",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_url",
  "storageKey": null
},
v8 = {
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
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "InversionSolutionNrml",
  "kind": "LinkedField",
  "name": "source_models",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v6/*: any*/),
    (v7/*: any*/),
    (v8/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "InversionSolution",
      "kind": "LinkedField",
      "name": "source_solution",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_size",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "md5_digest",
  "storageKey": null
},
v12 = [
  (v2/*: any*/),
  (v6/*: any*/),
  (v10/*: any*/),
  (v7/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "File",
  "kind": "LinkedField",
  "name": "csv_archive",
  "plural": false,
  "selections": (v12/*: any*/),
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "File",
  "kind": "LinkedField",
  "name": "hdf5_archive",
  "plural": false,
  "selections": (v12/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "typename",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "depth",
  "storageKey": null
},
v17 = {
  "kind": "InlineFragment",
  "selections": [
    (v6/*: any*/),
    (v8/*: any*/)
  ],
  "type": "FileInterface",
  "abstractKey": "__isFileInterface"
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OpenquakeHazardSolutionQuery",
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
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "OpenquakeHazardConfig",
                "kind": "LinkedField",
                "name": "config",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "File",
                    "kind": "LinkedField",
                    "name": "template_archive",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v6/*: any*/),
                      (v10/*: any*/),
                      (v7/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v13/*: any*/),
              (v14/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Predecessor",
                "kind": "LinkedField",
                "name": "predecessors",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v17/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "OpenquakeHazardSolution",
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
    "name": "OpenquakeHazardSolutionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v18/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "OpenquakeHazardConfig",
                "kind": "LinkedField",
                "name": "config",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "File",
                    "kind": "LinkedField",
                    "name": "template_archive",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v6/*: any*/),
                      (v10/*: any*/),
                      (v7/*: any*/),
                      (v11/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v13/*: any*/),
              (v14/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Predecessor",
                "kind": "LinkedField",
                "name": "predecessors",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v18/*: any*/),
                      (v17/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v4/*: any*/),
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
            "type": "OpenquakeHazardSolution",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8b68ee65b468319fd8d46248198429b1",
    "id": null,
    "metadata": {},
    "name": "OpenquakeHazardSolutionQuery",
    "operationKind": "query",
    "text": "query OpenquakeHazardSolutionQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on OpenquakeHazardSolution {\n      id\n      created\n      produced_by {\n        id\n      }\n      config {\n        id\n        created\n        source_models {\n          id\n          file_name\n          file_url\n          meta {\n            k\n            v\n          }\n          source_solution {\n            id\n          }\n        }\n        template_archive {\n          meta {\n            k\n            v\n          }\n          file_name\n          file_size\n          file_url\n          md5_digest\n          id\n        }\n      }\n      csv_archive {\n        id\n        file_name\n        file_size\n        file_url\n      }\n      hdf5_archive {\n        id\n        file_name\n        file_size\n        file_url\n      }\n      predecessors {\n        id\n        typename\n        depth\n        node {\n          __typename\n          ... on FileInterface {\n            __isFileInterface: __typename\n            file_name\n            meta {\n              k\n              v\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e897b55c1db92dbc5a1c80ecc2045421';
export default node;
