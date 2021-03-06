import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Bookshelf} from '../bookshelves/entity/bookshelf.entity';
import {User} from './entity/user.entity';
import {UsersResolver} from './users.resolver';
import {UsersService} from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bookshelf])],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
