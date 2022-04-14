import { FlexLayout } from "../common/layouts/screenLayout";
import { Image } from "../common/image/Image";
import { LoadingAnimation } from "../common/image/imageIndex";
import { Container } from "./style";

const LoadingPage = () => {
  return (
    <FlexLayout data-testid="loading-page">
      <Container>
        <Image src={LoadingAnimation} width="600px" />
      </Container>
    </FlexLayout>
  );
};

export default LoadingPage;
