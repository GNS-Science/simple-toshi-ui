import { SweepArguments } from '../interfaces/generaltask';
import { MetaArguments } from '../interfaces/mySolutions';
import { pluralCompare } from './generalTask.service';

export const filterMetaArguments = (
  metaArguments: ReadonlyMeta | null | undefined,
  sweepArguments: readonly (string | null)[] | null | undefined,
): MetaArguments => {
  const filteredMeta: MetaArguments = [];
  if (metaArguments && sweepArguments) {
    metaArguments.map((kv) => {
      if (
        kv &&
        sweepArguments.some((argument) => {
          if (argument) {
            (argument !== null && argument.includes(kv.k as string)) || pluralCompare(argument, kv.k as string);
          }
        })
      ) {
        filteredMeta.push({
          k: kv.k,
          v: kv.v,
        });
      }
    });
  }
  return filteredMeta;
};

export const filteredMetaGT = (
  metaArguments: ReadonlyMeta | null | undefined,
  sweepArguments: SweepArguments,
): MetaArguments => {
  const metaList: MetaArguments = [];
  if (metaArguments) {
    metaArguments.map((kv) => {
      kv &&
        sweepArguments?.some((argument) => {
          return argument?.k?.includes(kv.k as string) || pluralCompare(argument?.k as string, kv.k as string);
        }) &&
        metaList.push(kv);
    });
  }
  return metaList;
};

export type ReadonlyMeta = (
  | {
      readonly k: string | null | undefined;
      readonly v: string | null | undefined;
    }
  | null
  | undefined
)[];
