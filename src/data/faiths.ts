export const faiths = [
  "Chalcedonian",
  "Arian",
  "Pagan",
  "Manichean",
  "Pelagian",
  "Miaphysite",
  "Dyophysite",
  "Nestorian",
  "Donatist",
];

export function getFaithColor(faith: string): string {
  switch (faith) {
    case "Chalcedonian":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Arian":
      return "bg-red-100 text-red-800 border-red-200";
    case "Miaphysite":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Dyophysite":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Pagan":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Manichean":
      return "bg-green-100 text-green-800 border-green-200";
    case "Pelagian":
      return "bg-pink-100 text-pink-800 border-pink-200";
    case "Nestorian":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}
