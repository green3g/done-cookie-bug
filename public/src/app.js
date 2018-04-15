import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';
import 'can-debug#?./is-dev';
import Session from './models/session';
import User from './models/user';
import 'can-stache-bindings';

const AppViewModel = DefineMap.extend({
    session: {
        get(){
            return Session.current;
        }
    },
    env: {
        default: () => ({NODE_ENV:'development'}),
        serialize: false
    },
    message: {
        default: 'Hello World!',
        serialize: false
    },
    title: {
        default: 'public',
        serialize: false
    },
    loginPromise: {serialize: false},
    username: {type: 'string', default: 'feathers@example.com',serialize: false},
    password: {type: 'string', default: 'secret',serialize: false},
    login(){
        const user = new User({
            email: this.username,
            password: this.password
        });
        this.loginPromise = new Session({
            strategy: 'local',
            user
        }).save();

        this.loginPromise.then(result => {
            this.session.user._id = result.userId;
        });
    },
    logoutPromise: {serialize:false},
    logout(){
        this.logoutPromise = this.session.destroy();
    }
});

export default AppViewModel;
