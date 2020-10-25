import {
  Args,
  ID,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {BookshelfRecordsService} from '../bookshelf-records/bookshelf-records.service';
import {BookshelfRecordConnection} from '../bookshelf-records/graphql-types/connection.types';
import {BookshelvesService} from './bookshelves.service';
import {BookshelfRecordConnectionArgs} from './dto/record-connection.argstype';
import {Bookshelf} from './entity/bookshelf.entity';

@Resolver(() => Bookshelf)
export class BookshelvesResolver {
  constructor(
    private bookshelvesService: BookshelvesService,
    private bookshelfRecordService: BookshelfRecordsService,
  ) {}

  @Query(() => Bookshelf, {nullable: true})
  async bookshelf(@Args('id', {type: () => ID}) id: string) {
    return this.bookshelvesService.getBookshelf(id);
  }

  @ResolveField((of) => Int)
  async total(
    @Parent()
    bookshelf: Bookshelf,
  ) {
    return this.bookshelvesService.totalRecords(bookshelf.id);
  }

  @ResolveField((of) => BookshelfRecordConnection)
  async recordsConnection(
    @Parent()
    bookshelf: Bookshelf,

    @Args({type: () => BookshelfRecordConnectionArgs})
    connectionArgs: BookshelfRecordConnectionArgs,
  ) {
    const {orderBy: order} = connectionArgs;
    return this.bookshelfRecordService.findAndPaginate(
      {bookshelf: {id: bookshelf.id}},
      order,
      connectionArgs,
    );
  }
}
