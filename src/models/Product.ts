import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { IProduct } from '../types';
import Category from './Category';
import Supplier from './Supplier';
import StockMovement from './StockMovement';

@Table({
  tableName: 'products',
  timestamps: true,
})
export default class Product extends Model<IProduct> implements IProduct {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column(DataType.UUID)
  productId!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  productName!: string;

  @Column(DataType.TEXT)
  description?: string;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.DECIMAL(10, 2))
  price!: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  currentStock!: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  minStock!: number;

  @AllowNull(false)
  @Default(1000)
  @Column(DataType.INTEGER)
  maxStock!: number;

  @ForeignKey(() => Category)
  @Column(DataType.UUID)
  categoryId?: string;

  @ForeignKey(() => Supplier)
  @Column(DataType.UUID)
  supplierId?: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @Column(DataType.DATE)
  createdAt!: Date;

  @Column(DataType.DATE)
  updatedAt!: Date;

  // Associations
  @BelongsTo(() => Category)
  category!: Category;

  @BelongsTo(() => Supplier)
  supplier!: Supplier;

  @HasMany(() => StockMovement)
  stockMovements!: StockMovement[];

  // Instance methods
  public isLowStock(): boolean {
    return this.currentStock <= this.minStock;
  }

  public isOverStock(): boolean {
    return this.currentStock >= this.maxStock;
  }

  public updateStock(quantity: number): void {
    this.currentStock += quantity;
  }

  // Static methods
  public static async findActiveProducts(): Promise<Product[]> {
    return Product.findAll({
      where: { isActive: true },
      include: [Category, Supplier],
    });
  }

  public static async findLowStockProducts(): Promise<Product[]> {
    return Product.findAll({
      where: { isActive: true },
      include: [Category, Supplier],
    }).then(products => products.filter(product => product.isLowStock()));
  }

  public static async findByName(productName: string): Promise<Product | null> {
    return Product.findOne({
      where: { productName, isActive: true },
      include: [Category, Supplier],
    });
  }
}