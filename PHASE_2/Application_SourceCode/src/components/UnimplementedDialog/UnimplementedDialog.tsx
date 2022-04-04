import Dialog  from "../Dialog/Dialog";

type DialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
}

const UnimplementedDialog = ({ isOpen, toggleOpen }: DialogProps) => {
  return (
    <>
      {isOpen ? (
        <Dialog title="Feature not implemented" close={toggleOpen}>Coming soon...</Dialog>
      ): null}
    </>
  )
}

export default UnimplementedDialog;
