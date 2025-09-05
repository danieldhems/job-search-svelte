import { json } from "@sveltejs/kit";
import { getConnection } from '$lib/server/mysql';
import type { ResultSetHeader } from "mysql2/promise";

export async function GET() {
  try {
    const connection = await getConnection();

    const [results] = await connection.query(`
      SELECT 
        calls.id as call_id, 
        calls.received_at, 
        agents.id as agent_id, 
        agents.first_name as agent_first_name, 
        agents.last_name as agent_last_name, 
        agents.phone_number, 
        agencies.name as agent_company_name, 
        agencies.location as agent_company_location
      FROM calls
      LEFT JOIN agents ON calls.agent_id=agents.id
      LEFt JOIN agencies ON agents.company_id-agencies.id
    `);

    console.log("calls query result", results);

    return json(results);
  } catch (error) {
    console.log("calls query error", error)

    return error;
  }
}

export async function POST(request: Request) {
  console.log("POST api/calls request");

  try {
    const connection = await getConnection();

    let companyId, agentId;

    const {
      phoneNumber,
      agentFirstName,
      agentLastName,
      agentCompany,
      position,
      notes
    } = await request.json();

    if (agentCompany) {
      const query = `
        INSERT INTO agencies (
          name
        ) VALUES (
          '${agentCompany}'
        );
      `;

      const [result] = await connection.execute<ResultSetHeader>(query);
      companyId = result.insertId;
    }

    if (agentFirstName) {
      const query = `
        INSERT INTO agents (
          first_name,
          last_name,
          phone_number,
          company_id
        ) VALUES (
          '${agentFirstName}',
          '${agentLastName}',
          '${phoneNumber}',
          '${companyId}'
        );
      `;

      const [result] = await connection.execute<ResultSetHeader>(query);
      agentId = result.insertId;
    }

    const callQuery = `
      INSERT INTO calls (
        agent_id,
        position,
        notes
      ) VALUES (
        '${agentId}',
        '${position}',
        '${notes}'
      );
    `;

    const [result] = await connection.execute<ResultSetHeader>(callQuery);

    const response = {
      success: true,
      insertId: result.insertId,
    };

    connection.end();

    return json(response);

  } catch (error) {
    console.log("calls query error", error);

    const response = {
      error,
      returnedStatus: 200,
    };

    return json(response);
  }
};