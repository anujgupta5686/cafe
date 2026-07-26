import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Coffee } from "lucide-react"
import type { MenuItem } from "@/types"

interface MenuCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
}

const MenuCard = ({ item, onAddToCart }: MenuCardProps) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-muted">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <Coffee className="h-16 w-16 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="mb-2 text-xl">{item.name}</CardTitle>
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
          {item.description}
        </p>
        <p className="text-2xl font-bold text-primary">₹{item.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => onAddToCart(item)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MenuCard
