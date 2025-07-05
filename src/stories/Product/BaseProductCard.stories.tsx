import type {Meta, StoryObj} from '@storybook/nextjs-vite';
import {fn} from 'storybook/test';

import {ProductCardDemo} from '@/modules/product/card/ProductCardDemo';
import type {ProductData} from '@/modules/product/card/ProductCardDemo';

// Mock product data
const mockProduct: ProductData = {
  id: '1',
  name: 'Áo Thun Nam Cao Cấp - Chất Liệu Cotton 100%',
  description:
    'Áo thun nam chất liệu cotton 100% cao cấp, form regular fit, thích hợp cho mọi hoạt động hàng ngày',
  image:
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=400&h=400&fit=crop',
  ],
  originalPrice: 299000,
  salePrice: 199000,
  discount: 33,
  rating: 4.5,
  reviewCount: 2847,
  sold: 15234,
  stock: 50,
  category: 'Thời trang nam',
  brand: 'Fashion Brand',
  isNew: false,
  isHot: true,
  isSale: true,
  freeShipping: true,
  location: 'Hà Nội',
  seller: {
    name: 'Shop Thời Trang ABC',
    rating: 4.8,
    verified: true,
  },
};

const meta = {
  title: 'Product/BaseProductCard',
  component: ProductCardDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'BaseProductCard là component hiển thị thông tin sản phẩm dành cho trang thương mại điện tử. Hỗ trợ nhiều layout, size và tính năng như thêm vào giỏ hàng, yêu thích, xem nhanh.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Kích thước của card',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout hiển thị của card',
    },
    showAddToCart: {
      control: 'boolean',
      description: 'Hiển thị nút thêm vào giỏ hàng',
    },
    showWishlist: {
      control: 'boolean',
      description: 'Hiển thị nút yêu thích',
    },
    showQuickView: {
      control: 'boolean',
      description: 'Hiển thị nút xem nhanh',
    },
    showDetails: {
      control: 'boolean',
      description: 'Hiển thị thông tin chi tiết',
    },
    initialWishlisted: {
      control: 'boolean',
      description: 'Trạng thái yêu thích ban đầu',
    },
  },
  args: {
    onProductClick: fn(),
    onAddToCart: fn(),
    onWishlistToggle: fn(),
    onQuickView: fn(),
  },
} satisfies Meta<typeof ProductCardDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    product: mockProduct,
    size: 'medium',
    layout: 'vertical',
    showAddToCart: true,
    showWishlist: true,
    showQuickView: false,
    showDetails: true,
  },
};

// Grid showcase
export const GridShowcase: Story = {
  render: args => (
    <div>
      <ProductCardDemo {...args} product={mockProduct} />
    </div>
  ),
  args: {
    product: mockProduct,
    size: 'medium',
    layout: 'vertical',
    showAddToCart: true,
    showWishlist: true,
    showQuickView: false,
    showDetails: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};
