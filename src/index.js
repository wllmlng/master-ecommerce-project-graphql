import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//allows app to access apollo State
import { ApolloProvider } from 'react-apollo';
//let us connect our client to spacific end point (/graphql)
import { createHttpLink } from 'apollo-link-http';
//caches pages you've been to to optimize
import { InMemoryCache } from 'apollo-cache-inmemory';
//bundle of smaller library to make apollo easier for us
import { ApolloClient, gql } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import { resolvers, typeDefs } from './graphql/resolvers';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  //acts as our localstorage
  cache,
  typeDefs,
  resolvers

});

client.writeData({
  data: {
    cartHidden: true,
    cartItems: []
  }
})

client.query({
  query: gql`
    {
      getCollectionsByTitle(title: "hats"){
        id
        title
        items {
          id
          name
          price
          imageUrl
        }
      }
    }
  `
}).then(res => console.log(res));


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
