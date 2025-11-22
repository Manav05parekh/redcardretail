// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { orderId } = await req.json();

//   if (!orderId) {
//     return NextResponse.json(
//       { success: false, error: "Order ID is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const scriptUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL_READ;

//     const res = await fetch(scriptUrl!, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ orderId }),
//     });

//     const data = await res.json();

//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: (error as any).message },
//       { status: 500 }
//     );
//   }
// }
