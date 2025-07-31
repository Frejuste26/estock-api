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
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { IStockMovement, MovementType } from '../types';
import Product from './Product';
import User from './User';

@Table({
  tableName: 'stock_movements',
  timestamps: true,
  updatedAt: false,
})
export default class StockMovement extends Model<IStockMovement> implements IStockMovement {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column(DataType.UUID)
  movementId!: string;

  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  productId!: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(MovementType)))
  movementType!: MovementType;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity!: number;

  @Column(DataType.DECIMAL(10, 2))
  unitPrice?: number;

  @Column(DataType.DECIMAL(10, 2))
  totalPrice?: number;

  @Column(DataType.TEXT)
  reason?: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @Column(DataType.DATE)
  createdAt!: Date;

  // Associations
  @BelongsTo(() => Product)
  product!: Product;

  @BelongsTo(() => User)
  user!: User;

  // Static methods
  public static async findByProduct(productId: string): Promise<StockMovement[]> {
    return StockMovement.findAll({
      where: { productId },
      include: [Product, User],
      order: [['createdAt', 'DESC']],
    });
  }

  public static async findByUser(userId: string): Promise<StockMovement[]> {
    return StockMovement.findAll({
      where: { userId },
      include: [Product, User],
      order: [['createdAt', 'DESC']],
    });
  }

  public static async findByDateRange(startDate: Date, endDate: Date): Promise<StockMovement[]> {
    return StockMovement.findAll({
      where: {
        createdAt: {
          $between: [startDate, endDate],
        },
      },
      include: [Product, User],
      order: [['createdAt', 'DESC']],
    });
  }
}