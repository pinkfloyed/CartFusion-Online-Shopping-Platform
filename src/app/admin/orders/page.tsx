import AdminSidebar from '@/components/AdminSidebar';
import OrderRow from '@/components/OrderRow';
import ProtectedRoute from '@/components/ProtectedRoute';
import { prisma } from '@/lib/prisma';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } }, user: true },
  });

  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto py-8 flex gap-6">
        <AdminSidebar />
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          {orders.map((o) => (
            <OrderRow key={o.id} order={o} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
