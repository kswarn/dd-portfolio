import "./App.css";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import Work from "./components/Work.tsx";
import About from "./components/About.tsx";
import Contact from "./components/Contact.tsx";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
    </div>
  );
}

export default App;
