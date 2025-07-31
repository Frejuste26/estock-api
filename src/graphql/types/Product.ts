import { ObjectType, Field, ID, Float, Int } from 'type-graphql';
import { CategoryType } from './Category';
import { SupplierType } from './Supplier';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  productId!: string;

  @Field()
  productName!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price!: number;

  @Field(() => Int)
  currentStock!: number;

  @Field(() => Int)
  minStock!: number;

  @Field(() => Int)
  maxStock!: number;

  @Field(() => CategoryType, { nullable: true })
  category?: CategoryType;

  @Field(() => SupplierType, { nullable: true })
  supplier?: SupplierType;

  @Field()
  isActive!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  isLowStock!: boolean;

  @Field()
  isOverStock!: boolean;
}