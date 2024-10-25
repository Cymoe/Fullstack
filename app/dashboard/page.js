import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Products"
          description="Manage your product catalog"
          link="/dashboard/products"
        />
        <DashboardCard
          title="Orders"
          description="View and manage customer orders"
          link="/dashboard/orders"
        />
        <DashboardCard
          title="Customers"
          description="Manage your customer base"
          link="/dashboard/customers"
        />
      </div>
    </div>
  )
}

function DashboardCard({ title, description, link }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href={link}>
        <Button>View {title}</Button>
      </Link>
    </div>
  )
}

