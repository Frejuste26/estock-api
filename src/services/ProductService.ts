import { BaseService } from './BaseService';
import Product from '../models/Product';
import { IProduct, MovementType } from '../types';
import { StockMovementService } from './StockMovementService';

export class ProductService extends BaseService<Product> {
  private stockMovementService: StockMovementService;

  constructor() {
    super(Product);
    this.stockMovementService = new StockMovementService();
  }

  protected getPrimaryKey(): string {
    return 'productId';
  }

  public async findActiveProducts(): Promise<Product[]> {
    return Product.findActiveProducts();
  }

  public async findLowStockProducts(): Promise<Product[]> {
    return Product.findLowStockProducts();
  }

  public async findByName(productName: string): Promise<Product | null> {
    return Product.findByName(productName);
  }

  public async createProduct(productData: Partial<IProduct>): Promise<Product> {
    return this.create(productData);
  }

  public async updateProduct(productId: string, productData: Partial<IProduct>): Promise<Product | null> {
    const [affectedCount, updatedProducts] = await this.update(productId, productData);
    return affectedCount > 0 ? updatedProducts[0] : null;
  }

  public async deactivateProduct(productId: string): Promise<boolean> {
    const [affectedCount] = await this.update(productId, { isActive: false });
    return affectedCount > 0;
  }

  public async adjustStock(
    productId: string,
    quantity: number,
    movementType: MovementType,
    userId: string,
    reason?: string,
    unitPrice?: number
  ): Promise<Product | null> {
    const product = await this.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Calculate new stock based on movement type
    let newStock = product.currentStock;
    switch (movementType) {
      case MovementType.IN:
        newStock += quantity;
        break;
      case MovementType.OUT:
        newStock -= quantity;
        if (newStock < 0) {
          throw new Error('Insufficient stock');
        }
        break;
      case MovementType.ADJUSTMENT:
        newStock = quantity; // Direct adjustment to specific quantity
        break;
    }

    // Update product stock
    const updatedProduct = await this.updateProduct(productId, { currentStock: newStock });
    
    if (updatedProduct) {
      // Record stock movement
      await this.stockMovementService.createMovement({
        productId,
        movementType,
        quantity: movementType === MovementType.ADJUSTMENT ? 
          quantity - product.currentStock : quantity,
        unitPrice,
        totalPrice: unitPrice ? unitPrice * quantity : undefined,
        reason,
        userId,
      });
    }

    return updatedProduct;
  }

  public async getStockValue(): Promise<number> {
    const products = await this.findActiveProducts();
    return products.reduce((total, product) => {
      return total + (product.currentStock * product.price);
    }, 0);
  }
}