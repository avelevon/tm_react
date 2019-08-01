import HomeContainer from 'containers/HomeContainer';
import FormCreateUserContainer from 'containers/FormCreateUserContainer';
import FormContainer from 'containers/FormContainer';

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
        path: '/comments',
        exact: true,
        menuName: 'Comments',
        component: FormContainer,
    },
]