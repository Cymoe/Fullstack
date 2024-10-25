import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const customers = await Customer.find({});
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error in GET /api/customers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const newCustomer = await Customer.create(data);
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/customers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();
    if (!data._id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }
    const updatedCustomer = await Customer.findByIdAndUpdate(data._id, data, { new: true });
    if (!updatedCustomer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('Error in PUT /api/customers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/customers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
