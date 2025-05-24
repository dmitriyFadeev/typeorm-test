import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ColorsService } from './color.service';
import { Color } from './entities/color.entity';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PaginatedColors } from './types/colors-paginated.types';

@Resolver(() => Color)
export class ColorsResolver {
  constructor(private readonly colorsService: ColorsService) {}

  @Query(() => [Color], { name: 'colors' })
  getColors() {
    return this.colorsService.findAll();
  }

  @Query(() => PaginatedColors, { name: 'colorsPaginated' })
  getColorsPaginated(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    try {
      return this.colorsService.findPaginated(page, limit);
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  }

  @Query(() => Color)
  getColorByName(@Args('c_name') c_name: string) {
    try {
      return this.colorsService.findByName(c_name);
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  }

  @Mutation(() => Color, { name: 'colorCreate' })
  createColor(@Args('createColorDto') createColorDto: CreateColorDto) {
    try {
      return this.colorsService.create(createColorDto);
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  }

  @Mutation(() => Color, { name: 'colorUpdate' })
  updateColor(@Args('updateColorDto') updateColorDto: UpdateColorDto) {
    try {
      return this.colorsService.update(updateColorDto);
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  }

  @Mutation(() => Color, { name: 'colorDelete' })
  deleteColor(@Args('id', { type: () => Int }) id: number) {
    try {
      return this.colorsService.remove(id);
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  }
}
