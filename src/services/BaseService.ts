import { Model, ModelCtor } from 'sequelize-typescript';
import { IPaginationOptions, IPaginatedResponse } from '../types';

export abstract class BaseService<T extends Model> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  public async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findByPk(id);
  }

  public async create(data: Partial<T>): Promise<T> {
    return this.model.create(data as any);
  }

  public async update(id: string, data: Partial<T>): Promise<[number, T[]]> {
    return this.model.update(data as any, {
      where: { [this.getPrimaryKey()]: id } as any,
      returning: true,
    });
  }

  public async delete(id: string): Promise<number> {
    return this.model.destroy({
      where: { [this.getPrimaryKey()]: id } as any,
    });
  }

  public async findWithPagination(
    options: IPaginationOptions,
    whereClause: any = {}
  ): Promise<IPaginatedResponse<T>> {
    const { page, limit, sortBy = 'createdAt', sortOrder = 'DESC' } = options;
    const offset = (page - 1) * limit;

    const { count, rows } = await this.model.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
    });

    return {
      data: rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit,
      },
    };
  }

  protected abstract getPrimaryKey(): string;
}

export { BaseService }