import AppLayout from "@components/AppLayout";
import Landing from "@pages/Landing";
import About from "@pages/About";
import Contact from "@pages/Contact";

function App() {
  return (
    <AppLayout>
      <Landing />
      <About />
      <Contact />
    </AppLayout>
  );
}

export default App;
