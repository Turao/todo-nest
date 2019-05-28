import { IsString, Max, Length, IsEmail } from 'class-validator';

export class UserDTO {
  @IsString()
  @Length(6, 30)
  readonly username: string;
  
  @IsString()
  @Length(6, 30)
  readonly password: string;
  
  @IsEmail()
  readonly email: string;
}