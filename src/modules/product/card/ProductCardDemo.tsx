'use client';

import React, {useState} from 'react';
import {Card, Badge, Rate, Button, Tooltip, Image, Typography} from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  EyeOutlined,
  FireOutlined,
  StarFilled,
} from '@ant-design/icons';
import Link from 'next/link';

const {Text, Title} = Typography;

export interface ProductData {
  id: string;
  name: string;
  description?: string;
  image: string;
  images?: string[];
  originalPrice: number;
  salePrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  sold: number;
  stock: number;
  category: string;
  brand?: string;
  isNew?: boolean;
  isHot?: boolean;
  isSale?: boolean;
  freeShipping?: boolean;
  location?: string;
  seller?: {
    name: string;
    rating: number;
    verified: boolean;
  };
}

export interface ProductCardDemoProps {
  /** Product data */
  product: ProductData;
  /** Card size variant */
  size?: 'small' | 'medium' | 'large';
  /** Card layout */
  layout?: 'vertical' | 'horizontal';
  /** Show add to cart button */
  showAddToCart?: boolean;
  /** Show wishlist button */
  showWishlist?: boolean;
  /** Show quick view button */
  showQuickView?: boolean;
  /** Show detailed info */
  showDetails?: boolean;
  /** Custom class name */
  className?: string;
  /** On product click */
  onProductClick?: (product: ProductData) => void;
  /** On add to cart */
  onAddToCart?: (product: ProductData) => void;
  /** On wishlist toggle */
  onWishlistToggle?: (product: ProductData, isWishlisted: boolean) => void;
  /** On quick view */
  onQuickView?: (product: ProductData) => void;
  /** Initial wishlist state */
  initialWishlisted?: boolean;
}

export const ProductCardDemo: React.FC<ProductCardDemoProps> = ({
  product,
  size = 'medium',
  layout = 'vertical',
  showAddToCart = true,
  showWishlist = true,
  showQuickView = false,
  showDetails = true,
  className = '',
  onProductClick,
  onAddToCart,
  onWishlistToggle,
  onQuickView,
  initialWishlisted = false,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const [imageLoading, setImageLoading] = useState(true);

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    if (onWishlistToggle) {
      onWishlistToggle(product, newWishlistState);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getCardSize = () => {
    switch (size) {
      case 'small':
        return {width: 200, imageHeight: 160};
      case 'large':
        return {width: 300, imageHeight: 240};
      default:
        return {width: 250, imageHeight: 200};
    }
  };

  const cardSize = getCardSize();

  const renderBadges = () => {
    const badges = [];

    if (product.isSale && product.discount) {
      badges.push(
        <Badge
          key="sale"
          count={`-${product.discount}%`}
          style={{
            backgroundColor: '#f53d2d',
            color: '#fff',
            fontWeight: 'bold',
          }}
        />,
      );
    }

    if (product.isNew) {
      badges.push(
        <Badge
          key="new"
          count="NEW"
          style={{
            backgroundColor: '#52c41a',
            color: '#fff',
            fontWeight: 'bold',
          }}
        />,
      );
    }

    if (product.isHot) {
      badges.push(
        <Badge
          key="hot"
          count={
            <>
              <FireOutlined /> HOT
            </>
          }
          style={{
            backgroundColor: '#ff4d4f',
            color: '#fff',
            fontWeight: 'bold',
          }}
        />,
      );
    }

    return badges;
  };

  const renderPrice = () => {
    const currentPrice = product.salePrice || product.originalPrice;
    const hasDiscount =
      product.salePrice && product.salePrice < product.originalPrice;

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Text
            strong
            style={{
              color: '#f53d2d',
              fontSize: size === 'large' ? '18px' : '16px',
            }}>
            {formatPrice(currentPrice)}
          </Text>
          {hasDiscount && (
            <Text
              delete
              type="secondary"
              style={{fontSize: size === 'large' ? '14px' : '12px'}}>
              {formatPrice(product.originalPrice)}
            </Text>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Text style={{fontSize: '12px', color: '#666'}}>
            Đã bán {formatNumber(product.sold)}
          </Text>
        </div>
      </div>
    );
  };

  const renderRating = () => (
    <div className="flex items-center gap-2">
      <Rate
        disabled
        value={product.rating}
        allowHalf
        style={{fontSize: '12px'}}
        character={<StarFilled style={{color: '#faad14'}} />}
      />
      <Text style={{fontSize: '12px', color: '#666'}}>
        ({formatNumber(product.reviewCount)})
      </Text>
    </div>
  );

  const renderActions = () => (
    <div className="flex items-center gap-2 mt-2">
      {showAddToCart && (
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          style={{
            backgroundColor: '#f53d2d',
            borderColor: '#f53d2d',
            flex: 1,
          }}
          disabled={product.stock === 0}>
          {product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
        </Button>
      )}

      {showWishlist && (
        <Tooltip title={isWishlisted ? 'Bỏ yêu thích' : 'Yêu thích'}>
          <Button
            type="default"
            icon={
              isWishlisted ? (
                <HeartFilled style={{color: '#f53d2d'}} />
              ) : (
                <HeartOutlined />
              )
            }
            onClick={handleWishlistToggle}
          />
        </Tooltip>
      )}

      {showQuickView && (
        <Tooltip title="Xem nhanh">
          <Button
            type="default"
            icon={<EyeOutlined />}
            onClick={handleQuickView}
          />
        </Tooltip>
      )}
    </div>
  );

  const renderCardContent = () => (
    <div className="p-3">
      <div className="mb-2">
        <Tooltip title={product.name}>
          <Title
            level={5}
            ellipsis={{rows: 2}}
            style={{margin: 0, fontSize: size === 'large' ? '16px' : '14px'}}>
            {product.name}
          </Title>
        </Tooltip>
      </div>

      {showDetails && product.description && (
        <div className="mb-2">
          <Text
            type="secondary"
            style={{
              fontSize: '12px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
            {product.description}
          </Text>
        </div>
      )}

      {renderPrice()}

      <div className="mt-2">{renderRating()}</div>

      {product.freeShipping && (
        <div className="mt-2">
          <Text style={{fontSize: '11px', color: '#52c41a'}}>
            🚚 Miễn phí vận chuyển
          </Text>
        </div>
      )}

      {product.location && (
        <div className="mt-1">
          <Text style={{fontSize: '11px', color: '#666'}}>
            📍 {product.location}
          </Text>
        </div>
      )}

      {showDetails &&
        (showAddToCart || showWishlist || showQuickView) &&
        renderActions()}
    </div>
  );

  if (layout === 'horizontal') {
    return (
      <Card
        className={`product-card-horizontal ${className}`}
        hoverable
        onClick={handleProductClick}
        style={{width: '100%'}}
        bodyStyle={{padding: 0}}>
        <div className="flex">
          <div className="relative" style={{minWidth: cardSize.imageHeight}}>
            <Image
              src={product.image}
              alt={product.name}
              width={cardSize.imageHeight}
              height={cardSize.imageHeight}
              style={{objectFit: 'cover'}}
              onLoad={() => setImageLoading(false)}
              placeholder={
                <div className="flex items-center justify-center h-full bg-gray-100">
                  Loading...
                </div>
              }
            />
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {renderBadges()}
            </div>
          </div>
          <div className="flex-1">{renderCardContent()}</div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`product-card-vertical ${className}`}
      hoverable
      onClick={handleProductClick}
      style={{width: cardSize.width}}
      bodyStyle={{padding: 0}}
      cover={
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width="100%"
            height={cardSize.imageHeight}
            style={{objectFit: 'cover'}}
            onLoad={() => setImageLoading(false)}
            placeholder={
              <div className="flex items-center justify-center h-full bg-gray-100">
                Loading...
              </div>
            }
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {renderBadges()}
          </div>
        </div>
      }>
      {renderCardContent()}
    </Card>
  );
};

export default ProductCardDemo;
