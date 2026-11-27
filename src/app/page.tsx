import MarketingLayout from "./(marketing)/layout";
import HomePage from "./(marketing)/page";

// This file serves "/", so the home page's SEO metadata must be exported here.
export { metadata } from "./(marketing)/page";

export default function RootPage() {
  return (
    <MarketingLayout>
      <HomePage />
    </MarketingLayout>
  );
}
