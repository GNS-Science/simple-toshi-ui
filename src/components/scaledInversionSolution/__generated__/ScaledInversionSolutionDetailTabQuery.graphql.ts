/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ScaledInversionSolutionDetailTabQueryVariables = {
    id: string;
};
export type ScaledInversionSolutionDetailTabQueryResponse = {
    readonly node: {
        readonly __typename: string;
        readonly id: string;
        readonly file_name?: string | null | undefined;
        readonly file_url?: string | null | undefined;
        readonly created?: unknown | null | undefined;
        readonly produced_by?: {
            readonly id: string;
        } | null | undefined;
        readonly meta?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly source_solution?: {
            readonly id: string;
            readonly created: unknown | null;
        } | null | undefined;
        readonly relations?: {
            readonly total_count: number | null;
        } | null | undefined;
    } | null;
};
export type ScaledInversionSolutionDetailTabQuery = {
    readonly response: ScaledInversionSolutionDetailTabQueryResponse;
    readonly variables: ScaledInversionSolutionDetailTabQueryVariables;
};



/*
query ScaledInversionSolutionDetailTabQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    id
    ... on ScaledInversionSolution {
      file_name
      file_url
      created
      produced_by {
        id
      }
      meta {
        k
        v
      }
      source_solution {
        id
        created
      }
      relations {
        total_count
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
        "name": "id",
        "variableName": "id"
      }
    ],
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
      (v1/*: any*/),
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
            "name": "file_url",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AutomationTask",
            "kind": "LinkedField",
            "name": "produced_by",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
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
            "concreteType": "InversionSolution",
            "kind": "LinkedField",
            "name": "source_solution",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FileRelationConnection",
            "kind": "LinkedField",
            "name": "relations",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "total_count",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "type": "ScaledInversionSolution",
        "abstractKey": null
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
    "name": "ScaledInversionSolutionDetailTabQuery",
    "selections": (v3/*: any*/),
    "type": "QueryRoot",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ScaledInversionSolutionDetailTabQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "27ad7d403001e0f9ceee837e156e5dcc",
    "id": null,
    "metadata": {},
    "name": "ScaledInversionSolutionDetailTabQuery",
    "operationKind": "query",
    "text": "query ScaledInversionSolutionDetailTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on ScaledInversionSolution {\n      file_name\n      file_url\n      created\n      produced_by {\n        id\n      }\n      meta {\n        k\n        v\n      }\n      source_solution {\n        id\n        created\n      }\n      relations {\n        total_count\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '583a350c3e6337201cff1dd88751e3ae';
export default node;
