import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    function mockModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
