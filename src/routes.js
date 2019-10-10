import HomeContainer from 'containers/HomeContainer';
import FormCreateUserContainer from 'containers/FormCreateUserContainer';
import TargetsContainer from 'containers/TargetsContainer';
import Readme from 'components/Readme';
import Auth from 'components/Auth';
import UserProfileContainer from 'containers/UserProfileContainer';
import UserProfile from 'components/UserProfile';


export default [
    {
        path: '/',
        exact: true,
        menuName: 'Home',
        component: HomeContainer,
    },
    {
        path: '/users',
        exact: true,
        menuName: 'Users',
        component: FormCreateUserContainer,
    },
    {
        path: '/users/me',
        exact: true,
        menuName: '',
        component: UserProfileContainer,
    },
    {
        path: '/users/:id',
        exact: true,
        menuName: '',
        component: HomeContainer,
    },
    {
        path: '/users/profile/:id',
        exact: true,
        menuName: '',
        component: UserProfile,
    },
    {
        path: '/targets',
        exact: true,
        menuName: 'Targets',
        component: TargetsContainer,
    },
    {
        path: '/readme',
        exact: true,
        menuName: 'Readme',
        component: Readme,
    },
    {
        path: '/auth',
        exact: true,
        menuName: '',
        component: Auth,
    },
]