/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ScaledInversionSolutionQueryVariables = {
    id: string;
};
export type ScaledInversionSolutionQueryResponse = {
    readonly node: {
        readonly __typename: string;
        readonly id: string;
        readonly file_name?: string | null | undefined;
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
export type ScaledInversionSolutionQuery = {
    readonly response: ScaledInversionSolutionQueryResponse;
    readonly variables: ScaledInversionSolutionQueryVariables;
};



/*
query ScaledInversionSolutionQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    id
    ... on ScaledInversionSolution {
      file_name
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
    "name": "ScaledInversionSolutionQuery",
    "selections": (v3/*: any*/),
    "type": "QueryRoot",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ScaledInversionSolutionQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "35a7a13315a285fb388b8cfe0421d28a",
    "id": null,
    "metadata": {},
    "name": "ScaledInversionSolutionQuery",
    "operationKind": "query",
    "text": "query ScaledInversionSolutionQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on ScaledInversionSolution {\n      file_name\n      created\n      produced_by {\n        id\n      }\n      meta {\n        k\n        v\n      }\n      source_solution {\n        id\n        created\n      }\n      relations {\n        total_count\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '37bea5e7d9f5cc5021a4eead0d526fb7';
export default node;
