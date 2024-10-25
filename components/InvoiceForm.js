'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InvoiceForm({ invoice, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    customer: '',
    items: [],
    total: 0,
    status: 'draft',
    dueDate: ''
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (invoice) {
      setFormData({
        ...invoice,
        total: invoice.total || 0,
        dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : ''
      });
    }
  }, [invoice]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { 
      ...newItems[index], 
      [field]: field === 'product' ? String(value) : Number(value) 
    };
    setFormData(prev => ({
      ...prev,
      items: newItems,
      total: newItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { product: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      items: newItems,
      total: newItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      total: parseFloat(formData.total) || 0,
      items: formData.items.map(item => ({
        product: String(item.product),
        quantity: parseInt(item.quantity) || 0,
        price: parseFloat(item.price) || 0
      }))
    };
    console.log('Submitting invoice data:', submissionData); // Log the data being submitted
    onSubmit(submissionData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{invoice ? 'Edit Invoice' : 'Create New Invoice'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="customer">Customer</Label>
            <Select name="customer" value={formData.customer} onValueChange={(value) => setFormData(prev => ({ ...prev, customer: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map(customer => (
                  <SelectItem key={customer._id} value={customer._id}>{customer.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Items</Label>
            {formData.items.map((item, index) => (
              <div key={index} className="flex space-x-2 mt-2">
                <Input
                  placeholder="Product"
                  value={item.product}
                  onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                />
                <Button type="button" onClick={() => removeItem(index)}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={addItem} className="mt-2">Add Item</Button>
          </div>
          <div>
            <Label htmlFor="total">Total</Label>
            <Input
              id="total"
              name="total"
              value={formData.total}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select name="status" value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">{invoice ? 'Update' : 'Create'} Invoice</Button>
          {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        </CardFooter>
      </form>
    </Card>
  );
}
