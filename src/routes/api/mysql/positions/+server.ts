import { json } from "@sveltejs/kit";
import { type ResultSetHeader } from "mysql2/promise";
import { getConnection } from "$lib/server/mysql";

export async function GET() {
  try {
    const connection = await getConnection();

    const [results] = await connection.query("SELECT * FROM positions");

    return json(results);
  } catch (error) {
    console.log("positions query error", error)

    return json(error);
  }
};

export async function POST(request: Request) {
  try {
    const connection = await getConnection();

    console.log("POST api/positions request");

    const {
      jobTitle,
      jobDescription,
      salary,
      location,
      client,
      jobType,
      agentId,
      jobSpecFilePath,
    } = await request.json();

    const query = `
      INSERT INTO positions
      (
        job_title, 
        job_description,
        salary,
        client,
        location,
        job_type,
        agent_id,
        job_spec_file_path
      )
      VALUES
      (
        '${jobTitle}', 
        '${jobDescription}', 
        '${salary}', 
        '${location}', 
        '${client}', 
        '${jobType}', 
        '${agentId}',
        '${jobSpecFilePath}'
      );
    `;

    const [results] = await connection.execute<ResultSetHeader>(query);

    const response = {
      insertId: results.insertId,
    };

    return json(response);
  } catch (error) {
    console.log("positions query error", error)
    return json(error);
  }
};