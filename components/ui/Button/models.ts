export type TComponentProps = {
  text: string;
  disabled?: boolean;
};

export type TcomponentEmits = {
  (e: 'click'): void;
};

export const defautlProps = {
  disabled: false
};
