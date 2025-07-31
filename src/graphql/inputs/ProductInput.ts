import { InputType, Field, Float, Int } from 'type-graphql';

@InputType()
export class CreateProductInput {
  @Field()
  productName!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price!: number;

  @Field(() => Int, { defaultValue: 0 })
  currentStock!: number;

  @Field(() => Int, { defaultValue: 0 })
  minStock!: number;

  @Field(() => Int, { defaultValue: 1000 })
  maxStock!: number;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  supplierId?: string;
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  productName?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  minStock?: number;

  @Field(() => Int, { nullable: true })
  maxStock?: number;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  supplierId?: string;

  @Field({ nullable: true })
  isActive?: boolean;
}

@InputType()
export class StockAdjustmentInput {
  @Field()
  productId!: string;

  @Field(() => Int)
  quantity!: number;

  @Field({ nullable: true })
  reason?: string;

  @Field(() => Float, { nullable: true })
  unitPrice?: number;
}