import MainVisual from './MainVisual';
import BreedList from './Parent';
import News from './News';
import ScrollAnimation from './ScrollAnimation';
import BackToTop from './BackToTop';

const HomePageContent: React.FC = () => {
    return (
        <>
            <MainVisual />
            <BreedList />
            <News />
            <ScrollAnimation />
            <BackToTop />
        </>
    );
  };
  
  export default HomePageContent;