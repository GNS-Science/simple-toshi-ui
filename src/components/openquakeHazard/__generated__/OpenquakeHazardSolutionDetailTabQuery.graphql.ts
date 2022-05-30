/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EventResult = "FAILURE" | "PARTIAL" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type EventState = "DONE" | "SCHEDULED" | "STARTED" | "UNDEFINED" | "%future added value";
export type ModelType = "COMPOSITE" | "CRUSTAL" | "SUBDUCTION" | "%future added value";
export type OpenquakeHazardSolutionDetailTabQueryVariables = {
    id: string;
};
export type OpenquakeHazardSolutionDetailTabQueryResponse = {
    readonly node: {
        readonly id?: string | undefined;
        readonly created?: unknown | null | undefined;
        readonly produced_by?: {
            readonly id: string;
            readonly model_type: ModelType | null;
            readonly duration: number | null;
            readonly state: EventState | null;
            readonly result: EventResult | null;
        } | null | undefined;
        readonly task_args?: {
            readonly file_name: string | null;
            readonly file_url: string | null;
            readonly id: string;
        } | null | undefined;
        readonly config?: {
            readonly id: string;
            readonly created: unknown | null;
            readonly source_models: ReadonlyArray<{
                readonly id?: string | undefined;
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
    } | null;
};
export type OpenquakeHazardSolutionDetailTabQuery = {
    readonly response: OpenquakeHazardSolutionDetailTabQueryResponse;
    readonly variables: OpenquakeHazardSolutionDetailTabQueryVariables;
};



/*
query OpenquakeHazardSolutionDetailTabQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on OpenquakeHazardSolution {
      id
      created
      produced_by {
        id
        model_type
        duration
        state
        result
      }
      task_args {
        file_name
        file_url
        id
      }
      config {
        id
        created
        source_models {
          __typename
          ... on Node {
            __isNode: __typename
            id
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
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "OpenquakeHazardTask",
  "kind": "LinkedField",
  "name": "produced_by",
  "plural": false,
  "selections": [
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
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_url",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "File",
  "kind": "LinkedField",
  "name": "task_args",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v6/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v9 = {
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
v10 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/),
    (v6/*: any*/),
    (v9/*: any*/)
  ],
  "type": "FileInterface",
  "abstractKey": "__isFileInterface"
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_size",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "md5_digest",
  "storageKey": null
},
v13 = [
  (v2/*: any*/),
  (v5/*: any*/),
  (v11/*: any*/),
  (v6/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "File",
  "kind": "LinkedField",
  "name": "csv_archive",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "File",
  "kind": "LinkedField",
  "name": "hdf5_archive",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v16 = {
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
    "name": "OpenquakeHazardSolutionDetailTabQuery",
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
              (v7/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "source_models",
                    "plural": true,
                    "selections": [
                      (v8/*: any*/),
                      (v10/*: any*/)
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
                      (v9/*: any*/),
                      (v5/*: any*/),
                      (v11/*: any*/),
                      (v6/*: any*/),
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v14/*: any*/),
              (v15/*: any*/)
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
    "name": "OpenquakeHazardSolutionDetailTabQuery",
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
              (v7/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "source_models",
                    "plural": true,
                    "selections": [
                      (v16/*: any*/),
                      (v8/*: any*/),
                      (v10/*: any*/)
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
                      (v9/*: any*/),
                      (v5/*: any*/),
                      (v11/*: any*/),
                      (v6/*: any*/),
                      (v12/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v14/*: any*/),
              (v15/*: any*/)
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
    "cacheID": "9a1a32f5c9e1136c8c327637715344a5",
    "id": null,
    "metadata": {},
    "name": "OpenquakeHazardSolutionDetailTabQuery",
    "operationKind": "query",
    "text": "query OpenquakeHazardSolutionDetailTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on OpenquakeHazardSolution {\n      id\n      created\n      produced_by {\n        id\n        model_type\n        duration\n        state\n        result\n      }\n      task_args {\n        file_name\n        file_url\n        id\n      }\n      config {\n        id\n        created\n        source_models {\n          __typename\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n          ... on FileInterface {\n            __isFileInterface: __typename\n            file_name\n            file_url\n            meta {\n              k\n              v\n            }\n          }\n        }\n        template_archive {\n          meta {\n            k\n            v\n          }\n          file_name\n          file_size\n          file_url\n          md5_digest\n          id\n        }\n      }\n      csv_archive {\n        id\n        file_name\n        file_size\n        file_url\n      }\n      hdf5_archive {\n        id\n        file_name\n        file_size\n        file_url\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '0afd4ea0a460a4b306fe782b3d6e019f';
export default node;
