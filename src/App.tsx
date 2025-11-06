import AppLayout from "@components/AppLayout";
import Landing from "./pages/Landing";
import About from "@pages/About";

function App() {
  return (
    <AppLayout>
      <Landing />
      <About />
    </AppLayout>
  );
}

export default App;
