export const replaceMissingValues = (
  data: readonly (readonly (string | null)[] | null)[] | null | undefined,
): readonly (readonly (string | null)[] | null)[] | null | undefined => {
  if (data === null || data === undefined) return;
  const replacementData = [...data];
  const missingValues = [];
  const fakeValues = [];
  let increment = -1;
  if (data != null && data != undefined) {
    for (let i = 1; i < data.length; i++) {
      if (data[i] !== null && data[i - 1] !== null && data[i + 1] !== null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (Number(data[i]![2]) - Number(data[i - 1]![2]) > 0.11) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const missingPoints = Math.round((Number(data[i + 1]![2]) - Number(data[i]![2])) * 10);
          for (let j = 0; j < missingPoints; j++) {
            increment++;
            missingValues.push(i + increment);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const fakeData = data[i - 1]!.slice();
            fakeData[2] = String(Math.round((Number(fakeData[2]) + 0.1 * (j + 1)) * 100) / 100);
            fakeData[3] = '1.0E-20';
            fakeValues.push(fakeData);
          }
        }
      }
    }
    for (let i = 0; i < fakeValues.length; i++) {
      replacementData.splice(missingValues[i], 0, fakeValues[i]);
    }
    return replacementData;
  }
};
