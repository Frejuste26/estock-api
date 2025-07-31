import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { UserRole } from '../../types';

// Register enum for GraphQL
registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role in the system',
});

@ObjectType()
export class UserType {
  @Field(() => ID)
  userId!: string;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field(() => UserRole)
  role!: UserRole;

  @Field()
  isActive!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}