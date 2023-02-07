import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop()
  bio: string;

  @Prop()
  image: string;

  getId: () => string;

  getPassword: () => string;

  getClaims: () => Record<string, any>;

  toJson: () => Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.getId = function (): string {
  return this._id;
};

UserSchema.methods.getPassword = function (): string {
  return this.password;
};

UserSchema.methods.getClaims = function (): Record<string, any> {
  return {
    sub: this.username,
    username: this.username,
    email: this.email,
    bio: this.bio,
    image: this.image || 'https://picsum.photos/200',
  };
};

UserSchema.methods.toJson = function (): Record<string, any> {
  const { _id, email, username, bio, image } = this;

  return {
    _id,
    email,
    username,
    image: image || 'https://picsum.photos/200',
    bio: bio || null,
  };
};
