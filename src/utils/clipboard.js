export const writeText = text => {
  const e = document.createElement('textarea');
  e.value = text;
  document.body.append(e);
  e.select();

  const result = document.execCommand('copy');
  e.remove();

  return result;
};
