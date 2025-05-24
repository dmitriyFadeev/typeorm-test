import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Color } from './entities/color.entity';
import { ColorsService } from './color.service';
import { ColorsResolver } from './color.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorsService, ColorsResolver],
})
export class ColorModule {}
