/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type OpenquakeHazardSolutionQueryVariables = {
    id: string;
};
export type OpenquakeHazardSolutionQueryResponse = {
    readonly node: {
        readonly id?: string | undefined;
        readonly produced_by?: {
            readonly id: string;
        } | null | undefined;
    } | null;
};
export type OpenquakeHazardSolutionQuery = {
    readonly response: OpenquakeHazardSolutionQueryResponse;
    readonly variables: OpenquakeHazardSolutionQueryVariables;
};



/*
query OpenquakeHazardSolutionQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on OpenquakeHazardSolution {
      id
      produced_by {
        id
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
  "concreteType": "OpenquakeHazardTask",
  "kind": "LinkedField",
  "name": "produced_by",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OpenquakeHazardSolutionQuery",
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
              (v3/*: any*/)
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
    "name": "OpenquakeHazardSolutionQuery",
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
              (v3/*: any*/)
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
    "cacheID": "5dfa647d161c320d2bc33cd3e033221a",
    "id": null,
    "metadata": {},
    "name": "OpenquakeHazardSolutionQuery",
    "operationKind": "query",
    "text": "query OpenquakeHazardSolutionQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on OpenquakeHazardSolution {\n      id\n      produced_by {\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '1f0cc132010eae6ebf84a43fb0a9a870';
export default node;
