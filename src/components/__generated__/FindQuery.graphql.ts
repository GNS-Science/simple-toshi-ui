/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FindQueryVariables = {
    id: string;
};
export type FindQueryResponse = {
    readonly node: {
        readonly __typename: string;
        readonly id: string;
    } | null;
};
export type FindQuery = {
    readonly response: FindQueryResponse;
    readonly variables: FindQueryVariables;
};



/*
query FindQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
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
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
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
    "name": "FindQuery",
    "selections": (v1/*: any*/),
    "type": "QueryRoot",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FindQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f4cefc8031627460365ac477f0b96d1f",
    "id": null,
    "metadata": {},
    "name": "FindQuery",
    "operationKind": "query",
    "text": "query FindQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '5ffcd0f3fa0856eef9634b6b51b921b8';
export default node;
