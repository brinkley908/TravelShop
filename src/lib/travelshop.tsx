export function RemoveEnd(value: string, ch: string) {
  while (value[value.length - 1] === ch && value.length > 0) {
    value = value.slice(0, -1);
  }
  return value;
}


export function DateDiffDays(date1: any, date2: any) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24);
}


export function StringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}


export function IsInRole(roles: string[], role: string): boolean {
  return roles.filter(function (r) { return r.trim().toLowerCase() === role.trim().toLowerCase() }).length > 0;
}

