import { gql } from 'apollo-boost';

import { addItemToCart } from './cart.utils';

//type definition
export const typeDefs = gql `
    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]
    }
`;

//read from our cache the initial value so we can flip the boolean
//'@client' lets apollo know this is on the client side (called client directive)
//lets apollo know that whenever this query is called, its checking locally not server
const GET_CART_HIDDEN = gql `
    {
        cartHidden @client
    }

`;

const GET_CART_ITEMS = gql `
    {
        cartHidden @client
    }
`;

//Apollo Server needs to know how to populate data for every field in your schema 
//so that it can respond to requests for that data.
//resolver is a function that's responsible for populating the data for a single field in your schema
export const resolvers = {
    Mutation: {
        //toggleCartHidden = type mutation js
        toggleCartHidden: (_root, _args, { cache }) => {
            //reads the cache
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });
            // console.log('CACHE STUFF LOOK',GET_CART_HIDDEN)
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: {cartHidden: !cartHidden}
            });
            return !cartHidden;
        },
        
        addItemToCart: (_root, {item}, {cache}) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });
            
            const newCartItems = addItemToCart(cartItems, item);
            
            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems}
            });
            
            return newCartItems;
        }
    }

}