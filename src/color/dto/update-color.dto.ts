import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateColorDto } from './create-color.dto';

@InputType()
export class UpdateColorDto extends PartialType(CreateColorDto) {
  @Field(() => Int)
  id: number;
}
