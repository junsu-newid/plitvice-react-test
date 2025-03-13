import { Link } from 'react-router';

import { paths } from '@/config/paths';

const NotFoundRoute = () => {
    return (
        <div>
            <Link to={paths.app.root.getHref()} replace>
                Go to Dashboard
            </Link>
        </div>
    );
};

export default NotFoundRoute;
