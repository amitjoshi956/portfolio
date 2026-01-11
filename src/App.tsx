import { useNavigateToSection } from "@common/hooks";
import AppLayout from "@components/AppLayout";
import Landing from "@pages/Landing";
import About from "@pages/About";
import Experience from "@pages/Experience";
import Projects from "@pages/Projects";
import Contact from "@pages/Contact";
import Causes from "@pages/Causes";

function App() {
  useNavigateToSection({
    "#projects": "projects",
  });

  return (
    <AppLayout>
      <Landing />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Causes />
    </AppLayout>
  );
}

export default App;
