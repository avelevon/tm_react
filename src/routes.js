import HomeContainer from 'containers/HomeContainer';
import FormCreateUserContainer from 'containers/FormCreateUserContainer';
import TargetsContainer from 'containers/TargetsContainer';

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
        path: '/users/:id',
        exact: true,
        menuName: '',
        component: HomeContainer,
    },
    {
        path: '/targets',
        exact: true,
        menuName: 'Targets',
        component: TargetsContainer,
    },
]