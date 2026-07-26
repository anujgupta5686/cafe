import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Coffee, ChefHat, Clock, ArrowRight, Star } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchMenu } from "@/store/slices/menuSlice"
import { useCart } from "@/hooks/useCart"
import MenuCard from "@/components/shared/MenuCard"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector((state) => state.menu)
  const { addItem } = useCart()

  useEffect(() => {
    dispatch(fetchMenu())
  }, [dispatch])

  const featuredItems = items.slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Star className="h-4 w-4 fill-primary" />
                <span>Premium Quality Coffee</span>
              </div>
              <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                Welcome to <span className="text-primary">Beaudesert</span>
                <br />
                Cafe & Restaurant
              </h1>
              <p className="max-w-lg text-lg text-muted-foreground">
                Where every cup tells a story. Experience the finest coffee and
                delicious food in a warm, welcoming atmosphere.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate("/menu")}>
                  View Menu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/menu")}
                >
                  Order Now
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=400&fit=crop"
                  alt="Coffee"
                  className="h-64 w-full rounded-lg object-cover shadow-xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=400&fit=crop"
                  alt="Coffee"
                  className="mt-8 h-64 w-full rounded-lg object-cover shadow-xl"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg border bg-background p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-primary/20"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    500+ happy customers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Coffee className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Premium Coffee</h3>
                <p className="text-sm text-muted-foreground">
                  Sourced from the finest beans around the world
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ChefHat className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Expert Chefs</h3>
                <p className="text-sm text-muted-foreground">
                  Our chefs create culinary masterpieces daily
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Quick Service</h3>
                <p className="text-sm text-muted-foreground">
                  Freshly prepared and served with love
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Featured Menu
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Discover our most popular items, crafted with passion and the
              finest ingredients
            </p>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <div className="text-muted-foreground">Loading menu...</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {featuredItems.map((item) => (
                  <MenuCard key={item._id} item={item} onAddToCart={addItem} />
                ))}
              </div>
              {featuredItems.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No items available yet.
                  </p>
                </div>
              )}
              {items.length > 4 && (
                <div className="mt-8 text-center">
                  <Button variant="outline" onClick={() => navigate("/menu")}>
                    View Full Menu
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
