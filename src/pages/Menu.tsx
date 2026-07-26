import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchMenu } from "@/store/slices/menuSlice"
import { useCart } from "@/hooks/useCart"
import MenuCard from "@/components/shared/MenuCard"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const Menu = () => {
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector((state) => state.menu)
  const { addItem } = useCart()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(fetchMenu())
  }, [dispatch])

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Menu</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Handcrafted with love, served with a smile
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mb-12 max-w-md">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="text-muted-foreground">Loading menu...</div>
          </div>
        ) : (
          <>
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  {searchTerm
                    ? "No items match your search"
                    : "No items available yet."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item) => (
                  <MenuCard key={item._id} item={item} onAddToCart={addItem} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Menu
