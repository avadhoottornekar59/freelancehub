export function isDatabaseConfigured() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return false;
  }

  return !uri.includes("<username>") && !uri.includes("<password>") && !uri.includes("<cluster>");
}
