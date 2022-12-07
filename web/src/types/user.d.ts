export interface LoginInfo {
  account: string;
  password: string;
  remember: boolean;
  captcha: {
    id: string;
    text: string;
  };
}

export interface UserInfo {
  avatar: string;
  account: string;
  nickName: string;
}
