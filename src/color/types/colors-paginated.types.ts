import { ObjectType, Field } from '@nestjs/graphql';
import { Color } from '../entities/color.entity';

@ObjectType()
export class PaginatedColors {
  @Field(() => [Color])
  items: Color[];

  @Field()
  totalItems: number;

  @Field()
  totalPages: number;

  @Field()
  currentPage: number;
}
