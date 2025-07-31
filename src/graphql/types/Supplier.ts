import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class SupplierType {
  @Field(() => ID)
  supplierId!: string;

  @Field()
  supplierName!: string;

  @Field({ nullable: true })
  contactPerson?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field()
  isActive!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}