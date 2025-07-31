import { ObjectType, Field, ID, Float, Int, registerEnumType } from 'type-graphql';
import { MovementType } from '../../types';
import { ProductType } from './Product';
import { UserType } from './User';

// Register enum for GraphQL
registerEnumType(MovementType, {
  name: 'MovementType',
  description: 'Type of stock movement',
});

@ObjectType()
export class StockMovementType {
  @Field(() => ID)
  movementId!: string;

  @Field(() => ProductType)
  product!: ProductType;

  @Field(() => MovementType)
  movementType!: MovementType;

  @Field(() => Int)
  quantity!: number;

  @Field(() => Float, { nullable: true })
  unitPrice?: number;

  @Field(() => Float, { nullable: true })
  totalPrice?: number;

  @Field({ nullable: true })
  reason?: string;

  @Field(() => UserType)
  user!: UserType;

  @Field()
  createdAt!: Date;
}