import { render } from 'src/helpers/rtl';
import App from './App';

test('renders home page', () => {
  const { getByTestId } = render(
    <App />
  );
  expect(getByTestId("loading-page")).not.toBeNull();
});
