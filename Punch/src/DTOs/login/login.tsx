export class LoginRequest {
  username!: string; // can be email too, depends on your Keycloak config
  password!: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}