import Home from 'components/Home';
import Users from 'containers/UsersContainer';
import Form from 'containers/FormContainer';

export default [
    {
        path: '/',
        exact: true,
        menuName: 'Home',
        component: Home,
    },
    {
        path: '/users',
        exact: true,
        menuName: 'Users',
        component: Users,
    },
    {
        path: '/comments',
        exact: true,
        menuName: 'Comments',
        component: Form,
    },
]