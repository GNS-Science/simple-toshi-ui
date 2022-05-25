/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type AggregateInversionSolutionSourcesTabQueryVariables = {
    id: string;
};
export type AggregateInversionSolutionSourcesTabQueryResponse = {
    readonly node: {
        readonly id: string;
        readonly __typename: string;
        readonly source_solutions?: ReadonlyArray<{
            readonly id?: string | undefined;
            readonly __typename?: string | undefined;
            readonly file_name?: string | null | undefined;
            readonly file_url?: string | null | undefined;
        } | null> | null | undefined;
    } | null;
};
export type AggregateInversionSolutionSourcesTabQuery = {
    readonly response: AggregateInversionSolutionSourcesTabQueryResponse;
    readonly variables: AggregateInversionSolutionSourcesTabQueryVariables;
};



/*
query AggregateInversionSolutionSourcesTabQuery(
  $id: ID!
) {
  node(id: $id) {
    id
    __typename
    ... on AggregateInversionSolution {
      source_solutions {
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
    }
  ],
  "type": "FileInterface",
  "abstractKey": "__isFileInterface"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AggregateInversionSolutionSourcesTabQuery",
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
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "source_solutions",
                "plural": true,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  },
                  (v4/*: any*/)
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
    "name": "AggregateInversionSolutionSourcesTabQuery",
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
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "source_solutions",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  },
                  (v4/*: any*/)
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
    "cacheID": "27ec98ca730c134366ea6a3614a27315",
    "id": null,
    "metadata": {},
    "name": "AggregateInversionSolutionSourcesTabQuery",
    "operationKind": "query",
    "text": "query AggregateInversionSolutionSourcesTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    id\n    __typename\n    ... on AggregateInversionSolution {\n      source_solutions {\n        __typename\n        ... on Node {\n          __isNode: __typename\n          id\n          __typename\n        }\n        ... on FileInterface {\n          __isFileInterface: __typename\n          file_name\n          file_url\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4c98fde3ab5bae4033bedf35e613e356';
export default node;
