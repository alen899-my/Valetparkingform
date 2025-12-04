import { verifyToken } from "../../../../lib/auth";
import connect from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token)
      return new Response(JSON.stringify({ error: "No token provided" }), {
        status: 401,
      });

    const decoded = verifyToken(token);
    if (!decoded)
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });

    await connect();
    const user = await User.findById(decoded.id).select("-password");
    if (!user)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

// -------------------------------
// ADD THIS — UPDATE USER DETAILS
// -------------------------------
export async function PUT(req) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token)
      return new Response(JSON.stringify({ error: "No token provided" }), {
        status: 401,
      });

    const decoded = verifyToken(token);
    if (!decoded)
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });

    await connect();
    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
       
      },
      { new: true }
    ).select("-password");

    return new Response(JSON.stringify({ user: updatedUser }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
    });
  }
}
