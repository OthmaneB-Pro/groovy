export function convertStringToBoolean(input : boolean | string) : boolean {
  if (typeof input === "boolean") return input
  return input === "true"
}
