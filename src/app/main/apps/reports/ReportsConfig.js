import React from 'react';

const ReportAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/report',
            component: React.lazy(() => import('./Report'))
        }
    ]
};

export default ReportAppConfig;
