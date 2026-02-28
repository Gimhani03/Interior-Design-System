import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Search, Sofa } from 'lucide-react'
import Navbar from '../components/Navbar'
import AdminSidebar from '../components/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'

const FurnitureManagement = () => {
  const [furniture, setFurniture] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchFurniture()
  }, [])

  const fetchFurniture = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/furniture')
      setFurniture(res.data)
    } catch (err) {
      console.error('Error fetching furniture:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently remove this item?')) return
    try {
      await axios.delete(`http://localhost:5001/api/furniture/${id}`)
      fetchFurniture()
    } catch (err) {
      console.error('Error deleting item:', err)
    }
  }

  const filtered = furniture.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AdminSidebar />

      <div className="ml-56 pt-[68px]">
        <div className="p-6 max-w-7xl mx-auto space-y-6">

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Furniture Management</h1>
              <p className="text-muted-foreground text-sm mt-1">Add, edit, and remove furniture products.</p>
            </div>
            <Button asChild>
              <Link to="/admin/add">
                <Plus size={16} className="mr-2" /> Add New Furniture
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sofa size={16} /> Product Catalog
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {filtered.length} product{filtered.length !== 1 ? 's' : ''} listed
                  </CardDescription>
                </div>
                <div className="relative w-64">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              {filtered.length === 0 ? (
                <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
                  No furniture items found.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="pl-6">Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg border border-border overflow-hidden bg-muted shrink-0">
                              <img
                                src={item.imagePath}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none' }}
                              />
                            </div>
                            <span className="font-medium text-sm">{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">Rs. {item.price?.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="success" className="text-xs">Active</Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/admin/edit/${item._id}`)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default FurnitureManagement
