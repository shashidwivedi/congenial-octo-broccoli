import { QueryFunction } from "@tanstack/react-query";
import { Animal, PetAPIResponse } from "./APIResponsesTypes";

const fetchSearch: QueryFunction<
  PetAPIResponse,
  [
    "search",
    {
      location: string;
      animal: Animal;
      breed: string;
    }
  ]
> = async ({ queryKey }) => {
  const { animal, location, breed } = queryKey[1];

  const response = await fetch(
    `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!response.ok) {
    throw new Error(
      `pet search fetch not ok for ${animal} ${location} ${breed}`
    );
  }

  return response.json();
};

export default fetchSearch;
