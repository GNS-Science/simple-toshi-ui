/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type AggregationFn = "MEAN" | "%future added value";
export type AggregateInversionSolutionDetailTabQueryVariables = {
    id: string;
};
export type AggregateInversionSolutionDetailTabQueryResponse = {
    readonly node: {
        readonly id: string;
        readonly __typename: string;
        readonly file_name?: string | null | undefined;
        readonly file_size?: unknown | null | undefined;
        readonly md5_digest?: string | null | undefined;
        readonly created?: unknown | null | undefined;
        readonly meta?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly aggregation_fn?: AggregationFn | null | undefined;
        readonly produced_by?: {
            readonly id?: string | undefined;
            readonly __typename?: string | undefined;
        } | null | undefined;
    } | null;
};
export type AggregateInversionSolutionDetailTabQuery = {
    readonly response: AggregateInversionSolutionDetailTabQueryResponse;
    readonly variables: AggregateInversionSolutionDetailTabQueryVariables;
};



/*
query AggregateInversionSolutionDetailTabQuery(
  $id: ID!
) {
  node(id: $id) {
    id
    __typename
    ... on AggregateInversionSolution {
      file_name
      file_size
      md5_digest
      created
      meta {
        k
        v
      }
      aggregation_fn
      produced_by {
        __typename
        ... on Node {
          __isNode: __typename
          id
          __typename
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
  "name": "__typename",
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
  "name": "file_size",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "md5_digest",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created",
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
  "kind": "ScalarField",
  "name": "aggregation_fn",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AggregateInversionSolutionDetailTabQuery",
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
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "produced_by",
                "plural": false,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "AggregateInversionSolution",
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
    "name": "AggregateInversionSolutionDetailTabQuery",
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
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "produced_by",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "AggregateInversionSolution",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a83ddb6f4d8626087e59a6062fea6135",
    "id": null,
    "metadata": {},
    "name": "AggregateInversionSolutionDetailTabQuery",
    "operationKind": "query",
    "text": "query AggregateInversionSolutionDetailTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    id\n    __typename\n    ... on AggregateInversionSolution {\n      file_name\n      file_size\n      md5_digest\n      created\n      meta {\n        k\n        v\n      }\n      aggregation_fn\n      produced_by {\n        __typename\n        ... on Node {\n          __isNode: __typename\n          id\n          __typename\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '658d8898047501b2ff9ca1f6b3f3ba74';
export default node;
