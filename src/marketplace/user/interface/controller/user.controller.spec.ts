import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../infrastructure/services/user.service';
import { UserRepository } from '../../infrastructure/repository/user.repository';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    function mockModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,
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
        { provide: 'UserRepositoryInterface', useClass: UserRepository }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
