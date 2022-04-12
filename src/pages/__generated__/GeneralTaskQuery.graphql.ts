/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EventResult = "FAILURE" | "PARTIAL" | "SUCCESS" | "UNDEFINED" | "%future added value";
export type ModelType = "COMPOSITE" | "CRUSTAL" | "SUBDUCTION" | "%future added value";
export type TaskSubType = "HAZARD" | "INVERSION" | "OPENQUAKE_HAZARD" | "REPORT" | "RUPTURE_SET" | "SCALE_SOLUTION" | "SOLUTION_TO_NRML" | "%future added value";
export type GeneralTaskQueryVariables = {
    id: string;
};
export type GeneralTaskQueryResponse = {
    readonly node: {
        readonly id?: string | undefined;
        readonly title?: string | null | undefined;
        readonly description?: string | null | undefined;
        readonly notes?: string | null | undefined;
        readonly created?: unknown | null | undefined;
        readonly updated?: unknown | null | undefined;
        readonly agent_name?: string | null | undefined;
        readonly model_type?: ModelType | null | undefined;
        readonly subtask_type?: TaskSubType | null | undefined;
        readonly subtask_count?: number | null | undefined;
        readonly subtask_result?: EventResult | null | undefined;
        readonly argument_lists?: ReadonlyArray<{
            readonly k: string | null;
            readonly v: ReadonlyArray<string | null> | null;
        } | null> | null | undefined;
        readonly swept_arguments?: ReadonlyArray<string | null> | null | undefined;
        readonly children?: {
            readonly total_count: number | null;
        } | null | undefined;
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
      notes
      created
      updated
      agent_name
      model_type
      subtask_type
      subtask_count
      subtask_result
      argument_lists {
        k
        v
      }
      swept_arguments
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
  "name": "notes",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updated",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "agent_name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "model_type",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subtask_type",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subtask_count",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subtask_result",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "KeyValueListPair",
  "kind": "LinkedField",
  "name": "argument_lists",
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
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "swept_arguments",
  "storageKey": null
},
v15 = {
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
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/)
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
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/)
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
    "cacheID": "b9de43bb26d303af516c7ec290ad0851",
    "id": null,
    "metadata": {},
    "name": "GeneralTaskQuery",
    "operationKind": "query",
    "text": "query GeneralTaskQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on GeneralTask {\n      id\n      title\n      description\n      notes\n      created\n      updated\n      agent_name\n      model_type\n      subtask_type\n      subtask_count\n      subtask_result\n      argument_lists {\n        k\n        v\n      }\n      swept_arguments\n      children {\n        total_count\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '5ef65933b62aa23529ad072d2a99cb47';
export default node;
