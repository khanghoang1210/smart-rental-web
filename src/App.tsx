import ButtonAdd from "./ui/ButtonAdd";
import ButtonClick from "./ui/ButtonClick";



function App() {
  return (
    <div className="mt-10 mx-10 space-y-6 space-x-6">
      <ButtonClick name="Enable"/>
      <ButtonAdd name="Add"/>
    </div>
  );
}

export default App;