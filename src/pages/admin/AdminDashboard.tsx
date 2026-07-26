import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchMenu } from "@/store/slices/menuSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingBag, Users } from "lucide-react"
import axios from "@/api/axios"

const AdminDashboard = () => {
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector((state) => state.menu)
  const [orderCount, setOrderCount] = useState(0)
  const [customerCount, setCustomerCount] = useState(0)
  const [ordersLoading, setOrdersLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchMenu())
    fetchOrdersAndCustomers()
  }, [dispatch])

  const fetchOrdersAndCustomers = async () => {
    try {
      setOrdersLoading(true)

      // Fetch orders
      const ordersResponse = await axios.get("/orders")
      setOrderCount(ordersResponse.data.data.length)

      // Fetch customer count
      const customerResponse = await axios.get("/orders/customers/count")
      setCustomerCount(customerResponse.data.data.totalCustomers)

      setOrdersLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setOrdersLoading(false)
    }
  }

  const stats = [
    {
      title: "Total Products",
      value: items.length,
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Orders",
      value: ordersLoading ? "..." : orderCount,
      icon: ShoppingBag,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Customers",
      value: ordersLoading ? "..." : customerCount,
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full ${stat.bgColor} p-2`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading || ordersLoading ? "..." : stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {orderCount === 0
                ? "No orders placed yet."
                : `${orderCount} orders placed by ${customerCount} customers.`}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
