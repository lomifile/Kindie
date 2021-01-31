import { KinderGarden } from "../entities/Kindergarden";
import { KinderGardenInput } from "./inputs/KindergardenInput";

export const validatekinderGarden = async (options: KinderGardenInput) => {
  const kindergarden = await KinderGarden.findOne({
    where: {
      Name: options.name,
    },
  });

  if (kindergarden) {
    if (kindergarden.Address === options.address) {
      return [
        {
          field: "address",
          message: "Kindergarden with this data already exists!",
        },
      ];
    }
  }

  return null;
};
