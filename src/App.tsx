import React from "react";
import { StoreProvider, rootStore } from "./state/rootStore";

import { Home } from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <StoreProvider value={rootStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
