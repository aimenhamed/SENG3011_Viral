import { FlexLayout } from "src/components/common/layouts/screenLayout";
import Text from "src/components/common/text/Text";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import { Container, ArticleResult } from "./style";

type BookmarkedCountriesProps = {
  countryClick: (countryName: string) => void;
};

const BookmarkedCountries = ({ countryClick }: BookmarkedCountriesProps) => {
  const { user } = useAppSelector(selectUser);

  const countries = user?.user.bookmarkedCountries
    ? [...user.user.bookmarkedCountries]
    : [];
  return (
    <FlexLayout>
      <Container>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <Text bold fontSize="2rem">
            Bookmarked Countries
          </Text>
          {user?.user.bookmarkedCountries.length === 0 ? (
            <Text>You have no bookmarked countries.</Text>
          ) : (
            countries.map((country) => (
              <ArticleResult
                key={country.countryId}
                onClick={() => {
                  countryClick(country.name);
                }}
              >
                <b>{country.name}</b>
              </ArticleResult>
            ))
          )}
        </div>
      </Container>
    </FlexLayout>
  );
};

export default BookmarkedCountries;
