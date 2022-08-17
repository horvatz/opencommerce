import { ArgsType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';

@ArgsType()
export class CreateProductMediaArgs {
  @Field(() => String, {
    nullable: false,
    description: 'The ID of the product variant to attach the media to.',
  })
  productId!: string;

  @Field(() => String, {
    nullable: true,
    description: 'Metadata about the media.',
  })
  metadata?: string;

  @Field(() => GraphQLUpload, {
    nullable: false,
    description: 'The media to attach.',
  })
  file!: FileUpload;
}
