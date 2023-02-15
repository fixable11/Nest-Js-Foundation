import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema({ timestamps: true })
export class Tag extends Document {
  @Prop({ type: String, required: true })
  name: string;

  toJson: () => Record<string, any>;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.methods.toJson = function (): Record<string, any> {
  const { name } = this;

  return {
    name,
  };
};
