import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: string;

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

  getId(): string {
    return this._id;
  }

  getPassword(): string {
    return this.password;
  }

  getClaims() {
    return {
      sub: this.username,
      username: this.username,
      email: this.email,
      bio: this.bio,
      image: this.image || 'https://picsum.photos/200',
    };
  }

  toJson(): Record<string, any> {
    const { password, bio, image, ...properties } = this;

    return {
      image: image || 'https://picsum.photos/200',
      bio: bio || null,
      ...properties,
    };
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
