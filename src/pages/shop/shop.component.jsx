import React from 'react';
import { Route } from 'react-router-dom';

// import {default as CollectionsOverview} from '../../components/collections-overview/collections-overview.container';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
  </div>
);

export default ShopPage;
