import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Bookshelf} from '../bookshelves/entity/bookshelf.entity';
import {User} from './entity/user.entity';
import {UsersService} from './users.service';

describe('UsersService with mocked TypeORM repository', () => {
  let usersRepogitory: Repository<User>;
  let bookshelvesRepogitory: Repository<Bookshelf>;

  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {provide: getRepositoryToken(User), useClass: Repository},
        {provide: getRepositoryToken(Bookshelf), useClass: Repository},
        UsersService,
      ],
    }).compile();

    usersRepogitory = module.get<Repository<User>>(getRepositoryToken(User));
    bookshelvesRepogitory = module.get<Repository<Bookshelf>>(
      getRepositoryToken(Bookshelf),
    );
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });
});