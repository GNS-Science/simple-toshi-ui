import { SweepArguments } from '../interfaces/generaltask';
import { MetaArguments } from '../interfaces/mySolutions';
import { pluralCompare } from './generalTask.service';

export const filterMetaArguments = (metaArguments: ReadonlyMeta, sweepArguments: string[]): MetaArguments => {
  const filteredMeta: MetaArguments = [];
  metaArguments.map((kv) => {
    if (
      kv !== null &&
      sweepArguments.some((argument) => argument.includes(kv.k as string) || pluralCompare(argument, kv.k as string))
    ) {
      filteredMeta.push({
        k: kv.k,
        v: kv.v,
      });
    }
  });
  return filteredMeta;
};

export const filteredMetaGT = (metaArguments: ReadonlyMeta, sweepArguments: SweepArguments): MetaArguments => {
  const metaList: MetaArguments = [];
  metaArguments.map((kv) => {
    kv !== null &&
      sweepArguments?.some((argument) => {
        return argument?.k?.includes(kv.k as string) || pluralCompare(argument?.k as string, kv.k as string);
      }) &&
      metaList.push(kv);
  });
  return metaList;
};

export type ReadonlyMeta = ({
  readonly k: string | null;
  readonly v: string | null;
} | null)[];
