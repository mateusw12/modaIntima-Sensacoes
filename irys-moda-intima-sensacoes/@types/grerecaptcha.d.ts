declare interface Grecaptcha {
  ready: (cb: () => Promise<void>) => void;
  execute: (secret: key, config: any) => Promise<string>;
}

declare const grecaptcha: Grecaptcha;
