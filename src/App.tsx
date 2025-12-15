import AppLayout from "@components/AppLayout";
import Landing from "@pages/Landing";
import About from "@pages/About";
import Contact from "@pages/Contact";
import Causes from "@pages/Causes";

function App() {
  return (
    <AppLayout>
      <Landing />
      <About />
      <Contact />
      <Causes />
    </AppLayout>
  );
}

export default App;
