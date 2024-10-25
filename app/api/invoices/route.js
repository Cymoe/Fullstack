import dbConnect from '@/lib/mongodb';
import Invoice from '@/models/Invoice';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();
    const invoices = await Invoice.find({});
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error in GET /api/invoices:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    console.log('Received invoice data:', data);
    
    // Basic validation
    if (!data.invoiceNumber || !data.customer || !Array.isArray(data.items) || data.items.length === 0) {
      return NextResponse.json({ error: 'Invalid invoice data' }, { status: 400 });
    }

    // Ensure all items have string product names
    data.items = data.items.map(item => ({
      ...item,
      product: String(item.product)
    }));

    const newInvoice = await Invoice.create(data);
    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/invoices:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();
    if (!data._id) {
      return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
    }
    const updatedInvoice = await Invoice.findByIdAndUpdate(data._id, data, { new: true });
    if (!updatedInvoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error('Error in PUT /api/invoices:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
    }
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/invoices:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
