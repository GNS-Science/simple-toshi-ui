/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type EventResult = "FAILURE" | "PARTIAL" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type ModelType = "CRUSTAL" | "SUBDUCTION" | "%future added value";
export type TaskSubType = "HAZARD" | "INVERSIONS" | "RUPTURE_SETS" | "%future added value";
export type GeneralTaskQueryVariables = {
    id: string;
};
export type GeneralTaskQueryResponse = {
    readonly node: {
        readonly id?: string;
        readonly title?: string | null;
        readonly description?: string | null;
        readonly created?: unknown | null;
        readonly updated?: unknown | null;
        readonly agent_name?: string | null;
        readonly model_type?: ModelType | null;
        readonly subtask_type?: TaskSubType | null;
        readonly subtask_count?: number | null;
        readonly subtask_result?: EventResult | null;
        readonly children?: {
            readonly total_count: number | null;
        } | null;
    } | null;
};
export type GeneralTaskQuery = {
    readonly response: GeneralTaskQueryResponse;
    readonly variables: GeneralTaskQueryVariables;
};



/*
query GeneralTaskQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on GeneralTask {
      id
      title
      description
      created
      updated
      agent_name
      model_type
      subtask_type
      subtask_count
      subtask_result
      children {
        total_count
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
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updated",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "agent_name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "model_type",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subtask_type",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subtask_count",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subtask_result",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "TaskTaskRelationConnection",
  "kind": "LinkedField",
  "name": "children",
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
    "name": "GeneralTaskQuery",
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
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "type": "GeneralTask",
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
    "name": "GeneralTaskQuery",
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
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "type": "GeneralTask",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6cb9325e35746f54e3cd28d26772f115",
    "id": null,
    "metadata": {},
    "name": "GeneralTaskQuery",
    "operationKind": "query",
    "text": "query GeneralTaskQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on GeneralTask {\n      id\n      title\n      description\n      created\n      updated\n      agent_name\n      model_type\n      subtask_type\n      subtask_count\n      subtask_result\n      children {\n        total_count\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '581179a7a2f1fd14821d445342e5703e';
export default node;
