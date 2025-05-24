import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Color } from '../entities/color.entity';

@ObjectType()
export class PaginatedColorsType {
  @Field(() => [Color])
  items: Color[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;
}
