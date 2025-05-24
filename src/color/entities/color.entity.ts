import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'v_color' })
export class Color {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'c_name' })
  c_name: string;

  @Field()
  @Column({ name: 'c_hex' })
  c_hex: string;

  @Field()
  @Column({ name: 'c_rgb' })
  c_rgb: string;
}
