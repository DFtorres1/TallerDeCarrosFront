import { BrowserRouter } from "react-router-dom";
import PageLayout from "./utils/layout";
import UserProvider from "./UserProvider";
import RenderRoutes from "./Routes";
import { QueryClient, QueryClientProvider } from "react-query";
export const queryClient = new QueryClient()

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PageLayout>
            <RenderRoutes />
          </PageLayout>
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
