
export default function classes (obj) {
  if (!obj) return;
  return Object.keys(obj).map(k => obj[k] ? k : false).filter(Boolean).join(' ');
}
