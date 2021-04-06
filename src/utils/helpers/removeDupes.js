// removes duplicate objects from an array
export default (arr, checkId) => {
  const seen = new Set();

  const filteredArr = arr.filter(el => {
    const duplicate = seen.has(el[checkId]);
    seen.add(el[checkId]);
    return !duplicate;
  });

  return filteredArr;
};