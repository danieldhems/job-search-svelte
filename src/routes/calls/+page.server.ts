
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const request = await fetch("http://localhost:5173/api/mysql/calls");
  const data = await request.json();
  console.log("Calls data", data)

  return { calls: data };
};
