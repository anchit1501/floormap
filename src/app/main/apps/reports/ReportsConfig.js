import React from 'react';

const ReportAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/reports',
            component: React.lazy(() => import('./Report'))
        },
        {
            path:'/apps/report/:id',
            component: React.lazy(() => import('./DateWiseReport'))
        }
    ]
};

export default ReportAppConfig;
