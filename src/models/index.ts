import User from './User';
import Category from './Category';
import Supplier from './Supplier';
import Product from './Product';
import StockMovement from './StockMovement';

// Export all models
export {
  User,
  Category,
  Supplier,
  Product,
  StockMovement,
};

// Export model array for easy registration
export const models = [
  User,
  Category,
  Supplier,
  Product,
  StockMovement,
];