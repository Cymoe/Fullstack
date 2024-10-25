'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CustomerForm from './CustomerForm';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      setCustomers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCreate = async (newCustomer) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer),
      });
      if (!response.ok) throw new Error('Failed to create customer');
      fetchCustomers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (updatedCustomer) => {
    try {
      const response = await fetch(`/api/customers`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCustomer),
      });
      if (!response.ok) throw new Error('Failed to update customer');
      fetchCustomers();
      setEditingCustomer(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/customers?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete customer');
      fetchCustomers();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <CustomerForm onSubmit={handleCreate} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map(customer => (
          <Card key={customer._id}>
            <CardHeader>
              <CardTitle>{customer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Email: {customer.email}</p>
              <p>Phone: {customer.phone}</p>
              <p>Address: {customer.address}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setEditingCustomer(customer)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(customer._id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {editingCustomer && (
        <CustomerForm 
          customer={editingCustomer} 
          onSubmit={handleUpdate} 
          onCancel={() => setEditingCustomer(null)} 
        />
      )}
    </div>
  );
}
