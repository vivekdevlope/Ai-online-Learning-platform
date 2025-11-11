import { usersTable } from "../../../config/schema.js";
import { NextResponse } from "next/server";
import {db} from '../../../config/db.js'
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
      const { email, name } = await req.json();
      const users = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));
  
      if (users.length === 0) {
        const result = await db
          .insert(usersTable)
          .values({ name, email })
          .returning();
        return NextResponse.json(result[0]);
      }
  
      return NextResponse.json(users[0]);
    } catch (error) {
      console.error("User creation error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }