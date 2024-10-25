'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import InvoiceForm from './InvoiceForm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices');
      if (!response.ok) throw new Error('Failed to fetch invoices');
      const data = await response.json();
      setInvoices(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCreate = async (newInvoice) => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInvoice),
      });
      if (!response.ok) throw new Error('Failed to create invoice');
      fetchInvoices();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (updatedInvoice) => {
    try {
      const response = await fetch(`/api/invoices`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedInvoice),
      });
      if (!response.ok) throw new Error('Failed to update invoice');
      fetchInvoices();
      setEditingInvoice(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/invoices?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete invoice');
      fetchInvoices();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <InvoiceForm onSubmit={handleCreate} />
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(invoice => (
                <TableRow key={invoice._id}>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>
                    {invoice.total != null ? `$${invoice.total.toFixed(2)}` : 'N/A'}
                  </TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>
                    {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => setEditingInvoice(invoice)} className="mr-2">Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(invoice._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {editingInvoice && (
        <InvoiceForm 
          invoice={editingInvoice} 
          onSubmit={handleUpdate} 
          onCancel={() => setEditingInvoice(null)} 
        />
      )}
    </div>
  );
}
