import mock from '../mock';

const reportDB = {
    report: [
        {
            id: '5725a6802d',
            from: {
                title: 'Architect Name',
                phone: '+66 123 455 87',
                email: 'hello@fuseinc.com',
            },
            client: {
                title: 'John Doe',
                address: '9301 Wood Street Philadelphia, PA 19111',
                phone: '+55 552 455 87',
                email: 'johndoe@mail.com'
            },
            number: 'P9-0004',
            date: 'Jul 19, 2019',
            dueDate: 'Aug 24, 2019',
            services: [
                {
                    id: '1',
                    title: 'Internal Plastering',
                    detail:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan, quam sed eleifend imperdiet.',
                    unit: '100',
                    planned: '100',
                    started: '20/05/2020',
                    finish: '19/05/2021'
                },
                {
                    id: '2',
                    title: 'Internal Painting',
                    detail:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan, quam sed eleifend imperdiet.',
                    unit: '60',
                    planned: '100',
                    started: '20/05/2020',
                    finish: '19/05/2021'
                },
                {
                    id: '3',
                    title: 'Ceramic Tiles Dry Area',
                    detail:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan, quam sed eleifend imperdiet.',
                    unit: '95',
                    planned: '100',
                    started: '20/05/2020',
                    finish: '19/05/2021'
                },
                {
                    id: '4',
                    title: 'Ceramic Tiles Wet Area',
                    detail:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan, quam sed eleifend imperdiet.',
                    unit: '70',
                    planned: '100',
                    started: '20/05/2020',
                    finish: '19/05/2021'
                },
                {
                    id: '5',
                    title: 'Staircase work',
                    detail:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan, quam sed eleifend imperdiet.',
                    unit: '100',
                    planned: '100',
                    started: '20/05/2020',
                    finish: '19/05/2021'
                },
                {
                    id: '6',
                    title: 'Marble Counter Tops',
                    detail:
                        'Vestibulum ligula sem, rutrum et libero id, porta vehicula metus. Cras dapibus neque sit amet laoreet vestibulum.',
                    unit: '0',
                    planned: '100',
                    started: '20/05/2020',
                    finish: '19/05/2021'
                },
                {
                    id: '7',
                    title: 'Wooden Door',
                    detail:
                        'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
                    unit: '20',
                    planned: '100',
                    started: '20/05/2020',
                    finish: '19/05/2021'
                },
                {
                    id: '7',
                    title: 'Aluminium Work',
                    detail:
                        'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
                    unit: '30',
                    planned: '100',
                    started: '20/05/2020',
                    finish: '19/05/2021'
                }
            ],
            subtotal: '8445',
            tax: '675.60',
            discount: '120.60',
            total: '9000'
        }
    ]
};

mock.onGet('/api/report/get-report').reply(config => {
    const { id } = config.params;
    const response = reportDB.report.find(invoice => invoice.id === id);
    return [200, response];
});
