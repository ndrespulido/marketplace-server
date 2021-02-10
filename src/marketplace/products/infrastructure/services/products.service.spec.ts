import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../user/infrastructure/repository/user.repository';
import { ProductRepository } from '../repository/product.repository';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    function mockModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService,
        {
          provide: getModelToken('Product'),
          useValue: mockModel
        },
        {
          provide: getModelToken('User'),
          useValue: mockModel
        },
        {
          provide: getModelToken('Client'),
          useValue: mockModel
        },
        {
          provide: getModelToken('Vendor'),
          useValue: mockModel
        },
        { provide: 'ProductRepositoryInterface', useClass: ProductRepository },
        { provide: 'UserRepositoryInterface', useClass: UserRepository }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
