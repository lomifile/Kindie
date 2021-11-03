import { ShowSelectedKindergardenQuery } from "../generated/graphql";
import { partOfType } from "./types";

export const extractRole = (
  partOf: partOfType,
  selectedKindergarden?: ShowSelectedKindergardenQuery,
  kindergardenId?: number
): string => {
  if (!selectedKindergarden) {
    for (let i = 0; i < partOf.length; i++) {
      if (partOf[i].kindergarden.Id === kindergardenId) return partOf[i].role;
    }
  } else {
    for (let i = 0; i < partOf.length; i++) {
      if (
        partOf[i].kindergarden.Id ===
        selectedKindergarden.selectedKindergarden.Id
      )
        return partOf[i].role;
    }
  }
  return "Headmaster";
};
