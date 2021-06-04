import { gql } from 'apollo-boost';

//type definition
export const typeDefs = gql `
    extend type Mutation {
        ToggleCartHidden: Boolean!
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
        }
    }
}