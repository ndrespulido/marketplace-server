import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../infrastructure/services/products.service';
import { ProductRepository } from '../../infrastructure/repository/product.repository';
import { UserRepository } from '../../../user/infrastructure/repository/user.repository';

describe('ProductsController', () => {
  let controller: ProductsController;

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
      controllers: [ProductsController],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});