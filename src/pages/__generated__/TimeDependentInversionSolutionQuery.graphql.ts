/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type TimeDependentInversionSolutionQueryVariables = {
    id: string;
};
export type TimeDependentInversionSolutionQueryResponse = {
    readonly node: {
        readonly __typename: string;
        readonly id: string;
        readonly file_name?: string | null | undefined;
        readonly created?: unknown | null | undefined;
        readonly produced_by?: {
            readonly id?: string | undefined;
        } | null | undefined;
        readonly meta?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly source_solution?: {
            readonly id?: string | undefined;
            readonly created: unknown | null;
        } | null | undefined;
        readonly relations?: {
            readonly total_count: number | null;
        } | null | undefined;
    } | null;
};
export type TimeDependentInversionSolutionQuery = {
    readonly response: TimeDependentInversionSolutionQueryResponse;
    readonly variables: TimeDependentInversionSolutionQueryVariables;
};



/*
query TimeDependentInversionSolutionQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    id
    ... on TimeDependentInversionSolution {
      file_name
      created
      produced_by {
        __typename
        ... on Node {
          __isNode: __typename
          id
        }
      }
      meta {
        k
        v
      }
      source_solution {
        ... on Node {
          __isNode: __typename
          id
        }
        created
        id
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
  "name": "file_name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created",
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v7 = {
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
v8 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TimeDependentInversionSolutionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "produced_by",
                "plural": false,
                "selections": [
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "InversionSolution",
                "kind": "LinkedField",
                "name": "source_solution",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "type": "TimeDependentInversionSolution",
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
    "name": "TimeDependentInversionSolutionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "produced_by",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "InversionSolution",
                "kind": "LinkedField",
                "name": "source_solution",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v3/*: any*/),
                  {
                    "kind": "TypeDiscriminator",
                    "abstractKey": "__isNode"
                  }
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "type": "TimeDependentInversionSolution",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "68d5615e76d6ff4da746daffc9104c52",
    "id": null,
    "metadata": {},
    "name": "TimeDependentInversionSolutionQuery",
    "operationKind": "query",
    "text": "query TimeDependentInversionSolutionQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on TimeDependentInversionSolution {\n      file_name\n      created\n      produced_by {\n        __typename\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      meta {\n        k\n        v\n      }\n      source_solution {\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        created\n        id\n      }\n      relations {\n        total_count\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a4aa9ee4358ca2a83fb9962f1f3c39bd';
export default node;
