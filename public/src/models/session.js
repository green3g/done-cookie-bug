// models/session.js
import connect from 'can-connect';

import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import feathersSessionBehavior from 'can-connect-feathers/session/session';
import dataParse from 'can-connect/data/parse/parse';
import construct from 'can-connect/constructor/constructor';
import constructStore from 'can-connect/constructor/store/store';
import constructCallbacksOnce from 'can-connect/constructor/callbacks-once/callbacks-once';
import canMap from 'can-connect/can/map/map';
import canRef from 'can-connect/can/ref/ref';
import dataCallbacks from 'can-connect/data/callbacks/callbacks';

// Bring in your user model to setup the relation in your DefineMap.
import User from './user';

// Bring in the feathersClient instance.
import feathersClient from './feathers-client';

const Session = DefineMap.extend( 'Session', {
    seal: false
}, {
    exp: 'any',
    userId: 'any',
    user: {
        Type: User,
        serialize(user){
            return user && user.serialize ? user.serialize(): user;
        },
        // Automatically populate the user data when a userId is received.
        get( lastSetVal, resolve ) {
            if ( lastSetVal ) {
                return lastSetVal;
            }
            if ( this.userId ) {
                User.get( { _id: this.userId } ).then( resolve );
            }
        }
    }
} );


const SessionList = DefineList.extend({
    '#': Session
});
Session.List = SessionList;

connect( [

    // Include the feathers session behavior in the behaviors list.
    feathersSessionBehavior,
    dataParse,
    canMap,
    canRef,
    construct,
    constructStore,
    constructCallbacksOnce,

    // Include the realtime behavior.
    dataCallbacks
], {

    // Pass the feathers client as the `feathersClient` property.
    feathersClient: feathersClient,
    idProp: 'exp',
    Map: Session,
    List: SessionList,
    name: 'session'
} );
export default Session;