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
            readonly id?: string | undefined;
        } | null | undefined;
        readonly meta?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly source_solution?: {
            readonly id?: string | undefined;
            readonly created?: unknown | null | undefined;
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
        __typename
        ... on Node {
          __isNode: __typename
          id
        }
        ... on InversionSolutionInterface {
          __isInversionSolutionInterface: __typename
          created
        }
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
  "name": "file_url",
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
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
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
  "kind": "InlineFragment",
  "selections": [
    (v6/*: any*/)
  ],
  "type": "InversionSolutionInterface",
  "abstractKey": "__isInversionSolutionInterface"
},
v10 = {
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
    "name": "ScaledInversionSolutionDetailTabQuery",
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
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "produced_by",
                "plural": false,
                "selections": [
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "source_solution",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/)
            ],
            "type": "ScaledInversionSolution",
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
    "name": "ScaledInversionSolutionDetailTabQuery",
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
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "produced_by",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "source_solution",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v7/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/)
            ],
            "type": "ScaledInversionSolution",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7d0c9c6ce707b3c3c970ea96c8347e25",
    "id": null,
    "metadata": {},
    "name": "ScaledInversionSolutionDetailTabQuery",
    "operationKind": "query",
    "text": "query ScaledInversionSolutionDetailTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on ScaledInversionSolution {\n      file_name\n      file_url\n      created\n      produced_by {\n        __typename\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      meta {\n        k\n        v\n      }\n      source_solution {\n        __typename\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        ... on InversionSolutionInterface {\n          __isInversionSolutionInterface: __typename\n          created\n        }\n      }\n      relations {\n        total_count\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '03ca4ee803d2f0a398acebfc56015ff3';
export default node;
