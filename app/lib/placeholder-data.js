module.exports = {
  users: [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'Admin',
      email: 'admin@vapestore.com',
      password: 'admin123',
    },
  ],
  products: [
    {
      id: '1a2b3c4d-4001-4271-9855-fec4b6a6442b',
      name: 'Vape Mod Kit Pro',
      description: 'Professional vaping device with temperature control and adjustable wattage',
      price: 89.99,
      stock: 50,
      image_url: '/products/mod.jpg'
    },
    {
      id: '2b3c4d5e-4001-4271-9855-fec4b6a6442c',
      name: 'Premium E-Liquid Pack',
      description: 'Set of 3 premium flavored e-liquids',
      price: 24.99,
      stock: 100,
      image_url: '/products/vape.jpeg'
    }
  ],
  members: [
    {
      id: '3c4d5e6f-4001-4271-9855-fec4b6a6442d',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Vape Street, Vapor City',
      join_date: '2024-01-01T00:00:00Z'
    }
  ],
  orders: [
    {
      id: '4d5e6f70-4001-4271-9855-fec4b6a6442e',
      member_id: '3c4d5e6f-4001-4271-9855-fec4b6a6442d',
      order_date: '2024-01-15T10:00:00Z',
      total_amount: 114.98,
      status: 'completed'
    }
  ],
  orderDetails: [
    {
      id: '5e6f7080-4001-4271-9855-fec4b6a6442f',
      order_id: '4d5e6f70-4001-4271-9855-fec4b6a6442e',
      product_id: '1a2b3c4d-4001-4271-9855-fec4b6a6442b',
      quantity: 1,
      price: 89.99
    },
    {
      id: '6f708090-4001-4271-9855-fec4b6a64420',
      order_id: '4d5e6f70-4001-4271-9855-fec4b6a6442e',
      product_id: '2b3c4d5e-4001-4271-9855-fec4b6a6442c',
      quantity: 1,
      price: 24.99
    }
  ]
};
