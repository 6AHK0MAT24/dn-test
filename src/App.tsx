import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SomeConvenientWidget } from "./components/SomeConvenientWidget";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SomeConvenientWidget />
      </QueryClientProvider>
    </>
  );
};

export default App;
