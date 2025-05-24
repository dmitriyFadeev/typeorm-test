import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { PaginatedColorsType } from './dto/paginated-colors.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepo: Repository<Color>,
  ) {}

  findAll(): Promise<Color[]> {
    return this.colorRepo.find();
  }

  async findPaginated(
    page: number,
    limit: number,
  ): Promise<PaginatedColorsType> {
    const totalItems = await this.colorRepo.count();

    const totalPages = Math.ceil(totalItems / limit);

    const items = await this.colorRepo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    console.log(items);

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  async findByName(c_name: string): Promise<Color> {
    const color = await this.colorRepo
      .createQueryBuilder('color')
      .where('LOWER(color.c_name) = LOWER(:name)', { name: c_name })
      .getOne();

    if (!color) {
      throw new NotFoundException(`Color not found`);
    }
    return color;
  }

  create(data: {
    c_name: string;
    c_hex: string;
    c_rgb: string;
  }): Promise<Color> {
    const color = this.colorRepo.create(data);
    return this.colorRepo.save(color);
  }

  async update(data: Partial<Color>): Promise<Color> {
    const color = await this.colorRepo.findOneBy({ id: data.id });
    if (!color) throw new NotFoundException(`Color not found`);
    Object.assign(color, data);
    return this.colorRepo.save(color);
  }

  async remove(id: number): Promise<Color> {
    const color = await this.colorRepo.findOneBy({ id });
    if (!color) throw new NotFoundException(`Color not found`);
    await this.colorRepo.delete(id);
    return color;
  }
}
