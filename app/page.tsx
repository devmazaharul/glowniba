import FAQSection from './components/client/FAQ';
import BackgroundImageSlider from './components/client/Hero';
import WhatsAppButton from './components/others/Whatapps';
import Category from './components/server/Category';
import Common from './components/server/Common';
import FeatureProduct from './components/server/FeatureProduct';
import InstagramPost from './components/server/InstagramPost';
import NewArrivals from './components/server/NewArrivals';
import Reviews from './components/server/Reviews';
import Step from './components/server/Step';

export default function page() {
  return (
    <div>
      <BackgroundImageSlider />
      <Category />
      <FeatureProduct />
      <NewArrivals />
      <Common />
      <Step />
      <InstagramPost />
      <Reviews />
      <WhatsAppButton />
      <FAQSection />
    </div>
  );
}
