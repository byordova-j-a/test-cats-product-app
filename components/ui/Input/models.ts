export enum EType {
  TEXT = 'text',
  PASSWORD = 'password'
}

export type TComponentProps = {
  label: string;
  type: EType;
  errorMessage?: string;
};
