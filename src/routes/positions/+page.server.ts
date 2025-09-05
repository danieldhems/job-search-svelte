
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const data = await fetch("http://localhost:5173/api/mysql/positions");
  const positions = await data.json();
  console.log("positions", positions)

  return {
    positions,
  }
};
