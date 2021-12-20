/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type InversionSolutionDetailTabQueryVariables = {
    id: string;
};
export type InversionSolutionDetailTabQueryResponse = {
    readonly node: {
        readonly id?: string | undefined;
        readonly produced_by_id?: string | null | undefined;
        readonly file_name?: string | null | undefined;
        readonly file_size?: number | null | undefined;
        readonly file_url?: string | null | undefined;
        readonly md5_digest?: string | null | undefined;
        readonly meta?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
        readonly metrics?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null | undefined;
    } | null;
};
export type InversionSolutionDetailTabQuery = {
    readonly response: InversionSolutionDetailTabQueryResponse;
    readonly variables: InversionSolutionDetailTabQueryVariables;
};



/*
query InversionSolutionDetailTabQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on InversionSolution {
      id
      produced_by_id
      file_name
      file_size
      file_url
      md5_digest
      meta {
        k
        v
      }
      metrics {
        k
        v
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
  "name": "produced_by_id",
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
  "name": "file_url",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "md5_digest",
  "storageKey": null
},
v8 = [
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
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "meta",
  "plural": true,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValuePair",
  "kind": "LinkedField",
  "name": "metrics",
  "plural": true,
  "selections": (v8/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InversionSolutionDetailTabQuery",
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
              (v9/*: any*/),
              (v10/*: any*/)
            ],
            "type": "InversionSolution",
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
    "name": "InversionSolutionDetailTabQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/)
            ],
            "type": "InversionSolution",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cab1f1eda6f3a8094964a8e4e7e491ad",
    "id": null,
    "metadata": {},
    "name": "InversionSolutionDetailTabQuery",
    "operationKind": "query",
    "text": "query InversionSolutionDetailTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on InversionSolution {\n      id\n      produced_by_id\n      file_name\n      file_size\n      file_url\n      md5_digest\n      meta {\n        k\n        v\n      }\n      metrics {\n        k\n        v\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '05b41605a76b3cc0ac4d214415897f83';
export default node;
