import FeatureBooks from '../components/FeatureBooks';
import HeroBanner from '../components/HeroBanner';
import LibraryStats from '../components/LibraryStats';

const Home = () => {
    return (
        <div>
            <HeroBanner/>
            <LibraryStats/>
            <FeatureBooks/>
        </div>
    );
};

export default Home;