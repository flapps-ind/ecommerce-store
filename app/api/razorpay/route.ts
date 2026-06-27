import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// ─── FORCE NEXT.JS TO TREAT THIS ENDPOINT AS DYNAMIC RUNTIME ───
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 1. Check if keys exist in the environment
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: "SERVER_ENVIRONMENT_MISSING_API_KEYS" }, 
        { status: 500 }
      );
    }

    // 2. Initialize the Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 3. Parse and validate payload
    const body = await request.json();
    const { totalAmount } = body;

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: "INVALID_AGGREGATE_VALUE_RECEIVED" }, 
        { status: 400 }
      );
    }

    // 4. Construct configuration options matrix
    const options = {
      amount: Math.round(totalAmount * 100), // convert to paise
      currency: "INR",
      receipt: `receipt_rcpt_${Date.now()}`,
    };

    // 5. Fire request payload to Razorpay infrastructure
    const order = await razorpay.orders.create(options);
    
    // 6. Return standard valid JSON
    return NextResponse.json({ orderId: order.id, amount: order.amount });

  } catch (err: any) {
    console.error("Razorpay Server-Side Exception Intercepted:", err);
    
    // GUARANTEE: Even if the code crashes completely, always return clean JSON
    return NextResponse.json(
      { error: err.message || "CRITICAL_INTERNAL_BACKEND_EXCEPTION" }, 
      { status: 500 }
    );
  }
}