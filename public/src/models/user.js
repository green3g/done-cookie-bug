// models/user.js
import connect from 'can-connect';

import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/list';
import set from 'can-set';

// Bring in the feathers service behavior
import feathersServiceBehavior from 'can-connect-feathers/service';

import dataParse from 'can-connect/data/parse/parse';
import constructor from 'can-connect/constructor/constructor';
import constructorStore from 'can-connect/constructor/store/store';
import constructorCallbacksOnce from 'can-connect/constructor/callbacks-once/callbacks-once';
import canMap from 'can-connect/can/map/map';
import canRef from 'can-connect/can/ref/ref';
import dataCallbacks from 'can-connect/data/callbacks/callbacks';
import realtime from 'can-connect/real-time/real-time';

// Bring in the feathersClient instance.
import feathersClient from './feathers-client';

// Use feathersClient.service(url) to create a service
const userService = feathersClient.service( '/api/users' );

const User = DefineMap.extend( 'User', {
    _id: 'string',
    email: 'string',
    password: 'string'
} );

User.algebra = new set.Algebra(
    set.comparators.id( '_id' )
);

User.List = DefineList.extend( { '*': User } );

User.connection = connect( [

    // Include the feathers service behavior in the behaviors list.
    feathersServiceBehavior,
    dataParse,
    constructor,
    constructorStore,
    constructorCallbacksOnce,
    canMap,
    canRef,

    // Include both the dataCallbacks and realtime behaviors.
    dataCallbacks,
    realtime
], {
    idProp: '_id',
    Map: User,
    List: User.List,

    // Pass the service as the `feathersService` property.
    feathersService: userService,
    name: 'users',
    algebra: User.algebra
} );

export default User;