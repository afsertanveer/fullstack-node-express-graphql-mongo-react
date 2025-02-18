import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFOund";
import Project from "./Pages/Project";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5011/graphql",
  cache: cache,
});
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/project/:id' element={<Project/>} />
              <Route path='*' element={<NotFound/>} />
              
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
