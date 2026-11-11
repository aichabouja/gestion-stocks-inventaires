import { useState } from "react";

import Products from "./pages/Products";
import Profile from "./pages/Profile";

function App() {
  const [selected, setSelected] = useState("Products");

  return (
    <>
      {selected === "Products" && (
        <Products selected={selected} setSelected={setSelected} />
      )}

      {selected === "Profile" && (
        <Profile selected={selected} setSelected={setSelected} />
      )}
    </>
  );
}

export default App;