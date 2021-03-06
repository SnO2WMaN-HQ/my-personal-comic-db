import {Field, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
@ObjectType()
export class Book extends Document {
  @Prop({type: () => String})
  _id!: string;

  @Prop({text: true})
  @Field(() => String)
  title!: string;

  @Prop({required: false})
  @Field(() => String, {nullable: true})
  isbn?: string;

  @Prop({required: true})
  authors!: {
    author: string;
    roles: string[];
  }[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
