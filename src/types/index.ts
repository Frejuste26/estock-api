export interface IUser {
  userId: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  productId: string;
  productName: string;
  description?: string;
  price: number;
  currentStock: number;
  minStock: number;
  maxStock: number;
  categoryId?: string;
  supplierId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISupplier {
  supplierId: string;
  supplierName: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  categoryId: string;
  categoryName: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStockMovement {
  movementId: string;
  productId: string;
  movementType: MovementType;
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
  reason?: string;
  userId: string;
  createdAt: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export enum MovementType {
  IN = 'IN',
  OUT = 'OUT',
  ADJUSTMENT = 'ADJUSTMENT',
}

export interface IJwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface IPaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}