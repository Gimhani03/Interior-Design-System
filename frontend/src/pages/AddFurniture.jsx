import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AdminSidebar from '../components/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const AddFurniture = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    type: 'chair',
    category: 'Living Room',
    price: '',
    description: '',
    material: '',
    modelPath: '/assets/models/',
    imagePath: '/assets/images/',
    dimensions: { width: '', depth: '', height: '' },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('dim_')) {
      const dimKey = name.split('_')[1]
      setFormData((prev) => ({ ...prev, dimensions: { ...prev.dimensions, [dimKey]: value } }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSelect = (value) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const finalData = {
        ...formData,
        price: Number(formData.price),
        dimensions: {
          width: Number(formData.dimensions.width),
          depth: Number(formData.dimensions.depth),
          height: Number(formData.dimensions.height),
        },
      }
      await axios.post('http://localhost:5001/api/furniture', finalData)
      alert('Furniture added successfully!')
      navigate('/admin/furniture-management')
    } catch (_) {
      alert('Error: Check if all fields are filled correctly.')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AdminSidebar />

      <div className="ml-56 pt-[68px]">
        <div className="p-6 max-w-4xl mx-auto space-y-6">

          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Furniture</h1>
            <p className="text-muted-foreground text-sm mt-1">Fill in the details to publish a new product.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Basic Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Product Information</CardTitle>
                <CardDescription>Basic details about the furniture item</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Classic Armchair"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="Living Room" onValueChange={handleSelect}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Living Room">Living Room</SelectItem>
                      <SelectItem value="Bedroom">Bedroom</SelectItem>
                      <SelectItem value="Dining Room">Dining Room</SelectItem>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="Kitchen">Kitchen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (Rs.)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="45000"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material">Material / Finish</Label>
                  <Input
                    id="material"
                    name="material"
                    placeholder="Solid Teak / Velvet"
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Describe the material, comfort, and style..."
                    onChange={handleChange}
                    required
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Dimensions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Dimensions</CardTitle>
                <CardDescription>Product measurements in centimeters</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-5 grid grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="dim_width">Width (cm)</Label>
                  <Input id="dim_width" name="dim_width" type="number" placeholder="e.g. 80" onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dim_depth">Depth (cm)</Label>
                  <Input id="dim_depth" name="dim_depth" type="number" placeholder="e.g. 70" onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dim_height">Height (cm)</Label>
                  <Input id="dim_height" name="dim_height" type="number" placeholder="e.g. 90" onChange={handleChange} />
                </div>
              </CardContent>
            </Card>

            {/* Asset Paths */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Asset Configuration</CardTitle>
                <CardDescription>Paths to the 3D model and preview image</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-5 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="modelPath">3D Model Path (.glb)</Label>
                  <Input
                    id="modelPath"
                    name="modelPath"
                    defaultValue="/assets/models/"
                    onChange={handleChange}
                    required
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imagePath">Image Path (.png)</Label>
                  <Input
                    id="imagePath"
                    name="imagePath"
                    defaultValue="/assets/images/"
                    onChange={handleChange}
                    required
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3 pb-6">
              <Button type="submit" className="flex-1 h-11 text-base">
                Publish Product
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-11 text-base"
                onClick={() => navigate('/admin/furniture-management')}
              >
                Cancel
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddFurniture
