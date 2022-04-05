import { Image } from "../common/image/Image";
import { LoadingAnimation } from "../common/image/imageIndex";
import Dialog from "../Dialog/Dialog";



type LoadingDialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const LoadingDialog = ({ isOpen, toggleOpen}:  LoadingDialogProps) => {
  return (
    <>
      {isOpen ? (
        <Dialog close={toggleOpen} modalSize="30">
          <Image src={LoadingAnimation} width="100%" />
        </Dialog>
      ): null}
    </>
  )
}

export default LoadingDialog;