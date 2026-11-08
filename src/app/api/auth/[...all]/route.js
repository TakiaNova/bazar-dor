
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    await client.db("admin").command({ ping: 1 });

    return Response.json({
      success: true,
      message: "MongoDB Connected Successfully!",
    });
  } catch (error) {
    console.error("MongoDB Error:", error);

    return Response.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}
