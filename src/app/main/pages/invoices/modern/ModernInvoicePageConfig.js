import React from 'react';

const ModernInvoicePageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	routes: [
		{
			path: '/pages/invoices/modern',
			component: React.lazy(() => import('./ModernInvoicePage'))
		}
	]
};

export default ModernInvoicePageConfig;
