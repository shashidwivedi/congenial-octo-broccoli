import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchParams from "./SearchParams";
import Details from "./Details";
import AdoptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPetHook = useState(null);

  return (
    <div
      className="m-0 p-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperC.jpg)",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPetHook}>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
