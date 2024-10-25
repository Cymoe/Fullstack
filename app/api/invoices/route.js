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
    console.log('Received invoice data:', JSON.stringify(data, null, 2));
    
    // Basic validation
    if (!data.customer || !Array.isArray(data.items) || data.items.length === 0) {
      console.error('Invalid invoice data:', JSON.stringify(data, null, 2));
      return NextResponse.json({ error: 'Invalid invoice data' }, { status: 400 });
    }

    // Generate a unique invoice number
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
    let newInvoiceNumber;
    if (lastInvoice && lastInvoice.invoiceNumber) {
      const lastNumberStr = lastInvoice.invoiceNumber.replace(/^\D+/g, '');
      const lastNumber = parseInt(lastNumberStr, 10) || 0;
      newInvoiceNumber = `INV${(lastNumber + 1).toString().padStart(4, '0')}`;
    } else {
      newInvoiceNumber = 'INV0001';
    }
    data.invoiceNumber = newInvoiceNumber;
    console.log('Generated invoice number:', data.invoiceNumber);

    // Ensure all items have string product names and valid numbers
    data.items = data.items.map(item => ({
      product: String(item.product),
      quantity: Number(item.quantity),
      price: Number(item.price)
    }));

    // Calculate total if not provided
    if (!data.total) {
      data.total = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    }

    // Ensure status is valid
    if (!data.status) {
      data.status = 'draft';
    }

    // Ensure dueDate is a valid Date
    if (!data.dueDate) {
      data.dueDate = new Date();
    } else {
      data.dueDate = new Date(data.dueDate);
    }

    console.log('Processed invoice data:', JSON.stringify(data, null, 2));

    const newInvoice = await Invoice.create(data);
    console.log('Created invoice:', JSON.stringify(newInvoice, null, 2));
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
