/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EventResult = "FAILURE" | "PARTIAL" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type EventState = "DONE" | "SCHEDULED" | "STARTED" | "UNDEFINED" | "%future added value";
export type ModelType = "COMPOSITE" | "CRUSTAL" | "SUBDUCTION" | "%future added value";
export type OpenquakeHazardTaskQueryVariables = {
    id: string;
};
export type OpenquakeHazardTaskQueryResponse = {
    readonly node: {
        readonly id?: string | undefined;
        readonly state?: EventState | null | undefined;
        readonly result?: EventResult | null | undefined;
        readonly duration?: number | null | undefined;
        readonly created?: unknown | null | undefined;
        readonly model_type?: ModelType | null | undefined;
        readonly hazard_solution?: {
            readonly id: string;
            readonly created: unknown | null;
            readonly csv_archive: {
                readonly id: string;
                readonly file_name: string | null;
                readonly file_size: unknown | null;
                readonly file_url: string | null;
            } | null;
            readonly hdf5_archive: {
                readonly id: string;
                readonly file_name: string | null;
                readonly file_size: unknown | null;
                readonly file_url: string | null;
            } | null;
        } | null | undefined;
        readonly metrics?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly arguments?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly config?: {
            readonly id: string;
            readonly created: unknown | null;
            readonly source_models: ReadonlyArray<{
                readonly id?: string | undefined;
                readonly __typename?: string | undefined;
                readonly file_name?: string | null | undefined;
                readonly file_url?: string | null | undefined;
                readonly meta?: ReadonlyArray<{
                    readonly k: string | null;
                    readonly v: string | null;
                } | null> | null | undefined;
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
    } | null;
};
export type OpenquakeHazardTaskQuery = {
    readonly response: OpenquakeHazardTaskQueryResponse;
    readonly variables: OpenquakeHazardTaskQueryVariables;
};



/*
query OpenquakeHazardTaskQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on OpenquakeHazardTask {
      id
      state
      result
      duration
      created
      model_type
      hazard_solution {
        id
        created
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
      }
      metrics {
        k
        v
      }
      arguments {
        k
        v
      }
      config {
        id
        created
        source_models {
          __typename
          ... on Node {
            __isNode: __typename
            id
            __typename
          }
          ... on FileInterface {
            __isFileInterface: __typename
            file_name
            file_url
            meta {
              k
              v
            }
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
  "name": "state",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "result",
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
  "name": "created",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "model_type",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_size",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_url",
  "storageKey": null
},
v11 = [
  (v2/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "OpenquakeHazardSolution",
  "kind": "LinkedField",
  "name": "hazard_solution",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "csv_archive",
      "plural": false,
      "selections": (v11/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "hdf5_archive",
      "plural": false,
      "selections": (v11/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v13 = [
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
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "metrics",
  "plural": true,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "arguments",
  "plural": true,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "meta",
  "plural": true,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v18 = {
  "kind": "InlineFragment",
  "selections": [
    (v8/*: any*/),
    (v10/*: any*/),
    (v17/*: any*/)
  ],
  "type": "FileInterface",
  "abstractKey": "__isFileInterface"
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "md5_digest",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OpenquakeHazardTaskQuery",
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v12/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "OpenquakeHazardConfig",
                "kind": "LinkedField",
                "name": "config",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "source_models",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v16/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      },
                      (v18/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "File",
                    "kind": "LinkedField",
                    "name": "template_archive",
                    "plural": false,
                    "selections": [
                      (v17/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v19/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "OpenquakeHazardTask",
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
    "name": "OpenquakeHazardTaskQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v16/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v12/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "OpenquakeHazardConfig",
                "kind": "LinkedField",
                "name": "config",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "source_models",
                    "plural": true,
                    "selections": [
                      (v16/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      },
                      (v18/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "File",
                    "kind": "LinkedField",
                    "name": "template_archive",
                    "plural": false,
                    "selections": [
                      (v17/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v19/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "OpenquakeHazardTask",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ce4e4625ea89ee3bab2a2a18b6fa3b42",
    "id": null,
    "metadata": {},
    "name": "OpenquakeHazardTaskQuery",
    "operationKind": "query",
    "text": "query OpenquakeHazardTaskQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on OpenquakeHazardTask {\n      id\n      state\n      result\n      duration\n      created\n      model_type\n      hazard_solution {\n        id\n        created\n        csv_archive {\n          id\n          file_name\n          file_size\n          file_url\n        }\n        hdf5_archive {\n          id\n          file_name\n          file_size\n          file_url\n        }\n      }\n      metrics {\n        k\n        v\n      }\n      arguments {\n        k\n        v\n      }\n      config {\n        id\n        created\n        source_models {\n          __typename\n          ... on Node {\n            __isNode: __typename\n            id\n            __typename\n          }\n          ... on FileInterface {\n            __isFileInterface: __typename\n            file_name\n            file_url\n            meta {\n              k\n              v\n            }\n          }\n        }\n        template_archive {\n          meta {\n            k\n            v\n          }\n          file_name\n          file_size\n          file_url\n          md5_digest\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'de4bb18e84021e0ab7004ab5653b1a98';
export default node;
