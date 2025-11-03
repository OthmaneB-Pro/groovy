type FormElement = HTMLInputElement | HTMLSelectElement;

type ChangeHandler = React.ChangeEventHandler<FormElement>;
type FocusHandler = React.FocusEventHandler<FormElement>;

export type FormEvents = {
  onChange?: ChangeHandler;
  onFocus?: FocusHandler;
  onBlur?: FocusHandler;
};
