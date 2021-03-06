import React from 'react';
import { server } from '../../lib/api';
import { ListingsData, DeleteListingData, DeleteListingVariables } from './types';

const LISTINGS = `
    query Listings {
        listings{
            id
            title
        }
    }
`;

const DELETE_LISTING = `
    mutation DeleteListing($id: ID!) {
        deleteListing(id: $id){
            id
            title
        }
    }
`;

interface Props {
    title: string;
}

export const Listings = ({ title }: Props) => {

    const fetchListings = async () => {
        const { data } = await server.fetch<ListingsData>({ query: LISTINGS});
        console.log(data)
    };

    const deleteListing = async () =>{
        const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>({
            query: DELETE_LISTING,
            variables: {
                id: '5e5f71911c9d440000657fe2'
            }
        });
        console.log(data)
    };

    return (
        <div>
            <h1>{title}</h1>
            <button onClick={fetchListings}>Query Listings!</button>
            <button onClick={deleteListing}>Delete a listing!</button>
        </div>
    );
};
