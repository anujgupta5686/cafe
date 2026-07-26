import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { createMenuItem, updateMenuItem } from "@/store/slices/menuSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload } from "lucide-react"
import { toast } from "sonner"

const AddProduct = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector((state) => state.menu)
  const isEdit = !!id

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null as File | null,
  })
  const [preview, setPreview] = useState("")

  useEffect(() => {
    if (isEdit) {
      const item = items.find((item) => item._id === id)
      if (item) {
        setFormData({
          name: item.name,
          description: item.description,
          price: item.price.toString(),
          image: null,
        })
        setPreview(item.image)
      }
    }
  }, [isEdit, id, items])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    formDataToSend.append("description", formData.description)
    formDataToSend.append("price", formData.price)
    if (formData.image) {
      formDataToSend.append("image", formData.image)
    }

    try {
      if (isEdit) {
        await dispatch(updateMenuItem({ id: id!, data: formDataToSend }))
        toast.success("Product updated successfully")
      } else {
        await dispatch(createMenuItem(formDataToSend))
        toast.success("Product created successfully")
      }
      navigate("/admin/products")
    } catch (error) {
      toast.error("Failed to save product")
    }
  }

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => navigate("/admin/products")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>{isEdit ? "Edit Product" : "Add New Product"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Product Image</Label>
              <div className="mt-2 flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="relative"
                  onClick={() => document.getElementById("image")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Image
                </Button>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-16 w-16 rounded-md object-cover"
                  />
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading
                  ? "Saving..."
                  : isEdit
                    ? "Update Product"
                    : "Create Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/admin/products")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProduct
