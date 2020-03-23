import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  // Password between 8 and 20 characters; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace.
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /(?=^.{8,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
    {
      message:
        'Password is too week! Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    },
  )
  password: string;
}
