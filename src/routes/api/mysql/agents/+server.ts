import { json } from "@sveltejs/kit";
import { type ResultSetHeader } from "mysql2/promise";
import { getConnection } from "$lib/server/mysql";

export async function GET() {
  try {
    const connection = await getConnection();

    const [results] = await connection.query("SELECT * FROM agents");

    return json(results);
  } catch (error) {
    console.log("agents query error", error)

    return json(error);
  }
};

export async function POST(request: Request) {
  try {
    const connection = await getConnection();

    console.log("POST api/agents request");

    const {
      firstName,
      lastName,
      mobileNumber,
      phoneNumber,
      company,
      email,
    } = await request.json();

    const query = `
      INSERT INTO agents (
        first_name, 
        last_name, 
        mobile_number, 
        phone_number, 
        company,
        email
      ) VALUES (
        '${firstName}', 
        '${lastName}', 
        '${mobileNumber}', 
        '${phoneNumber}', 
        '${company}', 
        '${email}'
      );`;

    const [results] = await connection.execute<ResultSetHeader>(query);

    const response = {
      success: true,
      insertId: results.insertId,
    };

    connection.end();

    return json(response);
  } catch (error) {
    console.log("agents query error", error)

    return json(error);
  }
};