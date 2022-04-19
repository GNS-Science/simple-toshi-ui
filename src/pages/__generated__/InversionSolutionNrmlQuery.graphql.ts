/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type InversionSolutionNrmlQueryVariables = {
    id: string;
};
export type InversionSolutionNrmlQueryResponse = {
    readonly node: ({
        readonly __typename: "InversionSolutionNrml";
        readonly id: string;
        readonly source_solution: {
            readonly id: string;
        } | null;
        readonly meta: ReadonlyArray<{
            readonly k: string | null;
            readonly v: string | null;
        } | null> | null;
        readonly file_name: string | null;
        readonly file_url: string | null;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
};
export type InversionSolutionNrmlQuery = {
    readonly response: InversionSolutionNrmlQueryResponse;
    readonly variables: InversionSolutionNrmlQueryVariables;
};



/*
query InversionSolutionNrmlQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on InversionSolutionNrml {
      id
      source_solution {
        id
      }
      meta {
        k
        v
      }
      file_name
      file_url
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
  "concreteType": "InversionSolution",
  "kind": "LinkedField",
  "name": "source_solution",
  "plural": false,
  "selections": [
    (v3/*: any*/)
  ],
  "storageKey": null
},
v5 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InversionSolutionNrmlQuery",
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
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "type": "InversionSolutionNrml",
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
    "name": "InversionSolutionNrmlQuery",
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
              (v7/*: any*/)
            ],
            "type": "InversionSolutionNrml",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cd95f6c52ec7589c4ea1994ece9ecf83",
    "id": null,
    "metadata": {},
    "name": "InversionSolutionNrmlQuery",
    "operationKind": "query",
    "text": "query InversionSolutionNrmlQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on InversionSolutionNrml {\n      id\n      source_solution {\n        id\n      }\n      meta {\n        k\n        v\n      }\n      file_name\n      file_url\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ccea2c1909e0f33f472332cfe3a794ee';
export default node;
