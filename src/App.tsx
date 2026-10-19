import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { QuickStart } from "./components/QuickStart";
import { SiteHeader } from "./components/SiteHeader";

function App() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <SiteHeader />
      <main>
        <Hero />
        <QuickStart />
      </main>
      <Footer />
    </div>
  );
}

export default App;
