import { BaseService } from './BaseService';
import StockMovement from '../models/StockMovement';
import { IStockMovement } from '../types';

export class StockMovementService extends BaseService<StockMovement> {
  constructor() {
    super(StockMovement);
  }

  protected getPrimaryKey(): string {
    return 'movementId';
  }

  public async createMovement(movementData: Partial<IStockMovement>): Promise<StockMovement> {
    return this.create(movementData);
  }

  public async findByProduct(productId: string): Promise<StockMovement[]> {
    return StockMovement.findByProduct(productId);
  }

  public async findByUser(userId: string): Promise<StockMovement[]> {
    return StockMovement.findByUser(userId);
  }

  public async findByDateRange(startDate: Date, endDate: Date): Promise<StockMovement[]> {
    return StockMovement.findByDateRange(startDate, endDate);
  }

  public async getMovementsSummary(startDate?: Date, endDate?: Date): Promise<any> {
    const whereClause: any = {};
    
    if (startDate && endDate) {
      whereClause.createdAt = {
        $between: [startDate, endDate],
      };
    }

    const movements = await StockMovement.findAll({
      where: whereClause,
      include: ['product'],
    });

    const summary = {
      totalMovements: movements.length,
      inMovements: movements.filter(m => m.movementType === 'IN').length,
      outMovements: movements.filter(m => m.movementType === 'OUT').length,
      adjustmentMovements: movements.filter(m => m.movementType === 'ADJUSTMENT').length,
      totalValue: movements.reduce((sum, m) => sum + (m.totalPrice || 0), 0),
    };

    return summary;
  }
}