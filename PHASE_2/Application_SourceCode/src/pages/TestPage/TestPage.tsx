import ReviewBox from "src/components/ReviewBox/ReviewBox";
import ReviewItem from "src/components/ReviewItem/ReviewItem";
import { Review } from "src/interfaces/ViralInterface";


const TestPage = () => {
  return (
    <>
      <ReviewBox reviews={test} averageRating={3.3} />
      <ReviewItem review={test[0]} />
    </>
)
}

const test:Review[] = [
  {
    reviewId: 'abba',
    createdBy: {
      userId: 'basdad',
      name: 'based',
      email: 'lit'
    },
    rating: 4,
    title: 'Super Hot',
    mainText: 'hgjdhgsjdhgufhuhdgufhdshfjldh jgh gusdhuhv uhgush ughushgufheduxghushulighld grghurhuh ',
    date: new Date(),
    upvotedBy: []
  },
  {
    reviewId: 'abba',
    createdBy: {
      userId: 'basdad',
      name: 'based',
      email: 'lit'
    },
    rating: 4,
    title: 'Super Hot',
    mainText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: new Date(),
    upvotedBy: []
  },
  {
    reviewId: 'abba',
    createdBy: {
      userId: '0985fec7-f5ed-4c96-85f4-733627004ab4a',
      name: 'based',
      email: 'lit'
    },
    rating: 4,
    title: 'Super Hot',
    mainText: 'hgjdhgsjdhgufhuhdgufhdshfjldh jgh gusdhuhv uhgush ughushgufheduxghushulighld grghurhuh ',
    date: new Date(),
    upvotedBy: []
  },
]


export default TestPage;
