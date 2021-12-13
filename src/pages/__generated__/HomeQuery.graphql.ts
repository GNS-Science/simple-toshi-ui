/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SmsSiteClass = "A" | "B" | "C" | "D" | "E" | "%future added value";
export type HomeQueryVariables = {};
export type HomeQueryResponse = {
    readonly strong_motion_station: {
        readonly soft_clay_or_peat: boolean | null;
        readonly id: string;
        readonly created: unknown | null;
        readonly Vs30_mean: ReadonlyArray<number | null> | null;
        readonly site_code: string | null;
        readonly site_class: SmsSiteClass | null;
    } | null;
};
export type HomeQuery = {
    readonly response: HomeQueryResponse;
    readonly variables: HomeQueryVariables;
};



/*
query HomeQuery {
  strong_motion_station(id: "U3Ryb25nTW90aW9uU3RhdGlvbjow") {
    soft_clay_or_peat
    id
    created
    Vs30_mean
    site_code
    site_class
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": "U3Ryb25nTW90aW9uU3RhdGlvbjow"
      }
    ],
    "concreteType": "StrongMotionStation",
    "kind": "LinkedField",
    "name": "strong_motion_station",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "soft_clay_or_peat",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "created",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "Vs30_mean",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "site_code",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "site_class",
        "storageKey": null
      }
    ],
    "storageKey": "strong_motion_station(id:\"U3Ryb25nTW90aW9uU3RhdGlvbjow\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQuery",
    "selections": (v0/*: any*/),
    "type": "QueryRoot",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2ce6c7d8006f4e2b9b9b88c6b05b5a4b",
    "id": null,
    "metadata": {},
    "name": "HomeQuery",
    "operationKind": "query",
    "text": "query HomeQuery {\n  strong_motion_station(id: \"U3Ryb25nTW90aW9uU3RhdGlvbjow\") {\n    soft_clay_or_peat\n    id\n    created\n    Vs30_mean\n    site_code\n    site_class\n  }\n}\n"
  }
};
})();
(node as any).hash = '778548db8f5136b9080cc80b2b53f26f';
export default node;
