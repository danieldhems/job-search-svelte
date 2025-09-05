import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const request = await fetch("http://localhost:5173/api/mysql/agents");
  const data = await request.json();
  console.log("Agents data", data)

  return { agents: data };
};
