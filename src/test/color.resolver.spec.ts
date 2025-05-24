import { Test, TestingModule } from '@nestjs/testing';
import { ColorsResolver } from '../color/color.resolver';
import { ColorsService } from '../color/color.service';

const mockColors = [
  { id: 1, c_name: 'Yellow', c_hex: '#FFFF00', c_rgb: 'rgb(255, 255, 0)' },
];

const mockService = {
  findAll: jest.fn().mockResolvedValue(mockColors),
  create: jest.fn().mockResolvedValue(mockColors[0]),
  remove: jest.fn().mockResolvedValue(mockColors[0]),
};

describe('ColorsResolver', () => {
  let resolver: ColorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColorsResolver,
        { provide: ColorsService, useValue: mockService },
      ],
    }).compile();

    resolver = module.get<ColorsResolver>(ColorsResolver);
  });

  it('should create color', async () => {
    const yellow = {
      id: 1,
      c_name: 'Yellow',
      c_hex: '#FFFF00',
      c_rgb: 'rgb(255, 255, 0)',
    };
    const result = await resolver.createColor(yellow);
    expect(result).toEqual({ id: expect.any(Number), ...yellow });
    expect(mockService.create).toHaveBeenCalledWith(yellow);
  });

  it('should list colors', async () => {
    const result = await resolver.getColors();
    expect(result).toEqual(mockColors);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should delete color', async () => {
    const result = await resolver.deleteColor(1);
    expect(result).toEqual(mockColors[0]);
    expect(mockService.remove).toHaveBeenCalledWith(1);
  });
});
