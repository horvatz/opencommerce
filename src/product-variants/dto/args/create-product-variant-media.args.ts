import { ArgsType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';

@ArgsType()
export class CreateProductVariantMediaArgs {
  @Field(() => String, { nullable: false })
  productVariantId!: string;

  @Field(() => GraphQLUpload, { nullable: false })
  file!: FileUpload;
}
