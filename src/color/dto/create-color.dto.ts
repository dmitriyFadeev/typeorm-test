import { InputType, Field } from '@nestjs/graphql';
import { IsString, Matches, Length } from 'class-validator';

@InputType()
export class CreateColorDto {
  @Field()
  @IsString()
  @Length(1, 50)
  c_name: string;

  @Field()
  @Matches(/^#([0-9A-F]{6}|[0-9A-F]{3})$/i, {
    message: 'c_hex must be a valid hex color code',
  })
  c_hex: string;

  @Field()
  @Matches(/^rgb\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\s*\)$/, {
    message: 'c_rgb must be a valid RGB string',
  })
  c_rgb: string;
}
