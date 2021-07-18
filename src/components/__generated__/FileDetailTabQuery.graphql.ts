/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FileRole = "READ" | "READ_WRITE" | "UNDEFINED" | "WRITE" | "%future added value";
export type FileDetailTabQueryVariables = {
    id: string;
};
export type FileDetailTabQueryResponse = {
    readonly node: {
        readonly id?: string;
        readonly file_name?: string | null;
        readonly file_size?: number | null;
        readonly file_url?: string | null;
        readonly md5_digest?: string | null;
        readonly relations?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly role: FileRole;
                    readonly thing: {
                        readonly id?: string;
                    };
                } | null;
            } | null>;
        } | null;
    } | null;
};
export type FileDetailTabQuery = {
    readonly response: FileDetailTabQueryResponse;
    readonly variables: FileDetailTabQueryVariables;
};



/*
query FileDetailTabQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on File {
      id
      file_name
      file_size
      file_url
      md5_digest
      relations {
        edges {
          node {
            role
            thing {
              __typename
              ... on Node {
                __isNode: __typename
                id
              }
            }
            id
          }
        }
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
  "name": "file_name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file_size",
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
  "name": "md5_digest",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FileDetailTabQuery",
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
                    "concreteType": "FileRelationEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FileRelation",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "thing",
                            "plural": false,
                            "selections": [
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "File",
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
    "name": "FileDetailTabQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
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
                    "concreteType": "FileRelationEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FileRelation",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "thing",
                            "plural": false,
                            "selections": [
                              (v9/*: any*/),
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "File",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "61adb6db64adb9505fba7e5ed70185cf",
    "id": null,
    "metadata": {},
    "name": "FileDetailTabQuery",
    "operationKind": "query",
    "text": "query FileDetailTabQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on File {\n      id\n      file_name\n      file_size\n      file_url\n      md5_digest\n      relations {\n        edges {\n          node {\n            role\n            thing {\n              __typename\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '44135d54585be7df18052088cc05c7e5';
export default node;
