// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       orderId,
//       shippingInfo,
//       paymentMethod,
//       subtotal,
//       shipping,
//       total,
//       items, // array with name, size, quantity, price
//     } = body;

//     // Convert items array → string for Google Sheets
//     const itemsString = (items || [])
//       .map(
//         (item: any) =>
//           `${item.name} (Size: ${item.size}) x${item.quantity} - ₹${item.price}`
//       )
//       .join(", ");

//     const payload = {
//       orderId,
//       shippingInfo,
//       paymentMethod,
//       subtotal,
//       shipping,
//       total,
//       items: itemsString, // final string
//     };

//     // Send to Google Sheet Webhook
//     const res = await fetch(process.env.GSHEET_WEBHOOK_URL!, {
//       method: "POST",
//       body: JSON.stringify(payload),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await res.json();

//     if (!data.success) {
//       return NextResponse.json(
//         { success: false, error: data.error },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, error: err.toString() },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      orderId,
      shippingInfo,
      paymentMethod,
      subtotal,
      shipping,
      total,
      items, // array with size + qty
    } = body;

    // Build Items Table (NO IMAGES)
    const itemsHTML = items
      .map(
        (item: any) => `
          <tr style="border-bottom:1px solid #eee;">
            <td style="padding:8px 6px;">${item.name}</td>
            <td style="padding:8px 6px;">${item.size}</td>
            <td style="padding:8px 6px;">${item.quantity}</td>
            <td style="padding:8px 6px;">₹${item.price}</td>
          </tr>
        `
      )
      .join("");

    // -----------------------------
    // ADMIN EMAIL (No Images)
    // -----------------------------
    const adminHTML = `
      <h2 style="color:#d10000;">🔥 New Order Received at RedCardRetail</h2>

      <p><strong>Order ID:</strong> ${orderId}</p>

      <h3>Customer:</h3>
      <p>
        ${shippingInfo.firstName} ${shippingInfo.lastName}<br>
        ${shippingInfo.email}<br>
        ${shippingInfo.phone}
      </p>

      <h3>Shipping Address</h3>
      <p>
        ${shippingInfo.address}<br>
        ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}
      </p>

      <h3>Items Ordered</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="font-weight:bold;border-bottom:2px solid #ddd;">
          <td>Item</td>
          <td>Size</td>
          <td>Qty</td>
          <td>Price</td>
        </tr>
        ${itemsHTML}
      </table>

      <h3>Payment</h3>
      <p>
        Method: <strong>${paymentMethod}</strong><br>
        Subtotal: ₹${subtotal}<br>
        Shipping: ₹${shipping}<br>
        <strong>Total: ₹${total}</strong>
      </p>
    `;

    // -----------------------------
    // CUSTOMER EMAIL (No Images)
    // -----------------------------
    const customerHTML = `
      <div style="font-family:Arial;padding:20px;">
        <h2 style="color:#d10000;">❤️ Thank You for Your Order!</h2>
        <p>Hi ${shippingInfo.firstName}, your order has been successfully received.</p>

        <h3>Your Items</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr style="font-weight:bold;border-bottom:2px solid #ddd;">
            <td>Item</td>
            <td>Size</td>
            <td>Qty</td>
            <td>Price</td>
          </tr>
          ${itemsHTML}
        </table>

        <h3>Total Paid</h3>
        <p><strong>₹${total}</strong></p>

        <p style="margin-top:20px;">You will be notified once your order is shipped.</p>
        <p>— Team RedCardRetail</p>
      </div>
    `;

    // -----------------------------
    // SEND ADMIN EMAIL
    // -----------------------------
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Order - ${orderId}`,
      html: adminHTML,
    });

    // -----------------------------
    // SEND CUSTOMER EMAIL
    // -----------------------------
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: shippingInfo.email,
      subject: `Your Order - ${orderId}`,
      html: customerHTML,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.toString() },
      { status: 500 }
    );
  }
}
