import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  categoryId!: string;

  @Field()
  categoryName!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  isActive!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}