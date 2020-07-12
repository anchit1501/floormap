import mock from '../mock';

const architect = {
	timeline: {
		activities: [
			{
				id: '1',
				user: {
					name: 'Alice Freeman',
					avatar: 'assets/images/avatars/alice.jpg'
				},
				message: 'started following you.',
				time: '13 mins. ago'
			},
			{
				id: '2',
				user: {
					name: 'Andrew Green',
					avatar: 'assets/images/avatars/andrew.jpg'
				},
				message: 'sent you a message.',
				time: 'June 10,2015'
			},
			{
				id: '3',
				user: {
					name: 'Garry Newman',
					avatar: 'assets/images/avatars/garry.jpg'
				},
				message: 'shared a public post with your group.',
				time: 'June 9,2015'
			},
			{
				id: '4',
				user: {
					name: 'Carl Henderson',
					avatar: 'assets/images/avatars/carl.jpg'
				},
				message: 'wants to play Fallout Shelter with you.',
				time: 'June 8,2015'
			},
			{
				id: '5',
				user: {
					name: 'Jane Dean',
					avatar: 'assets/images/avatars/jane.jpg'
				},
				message: 'started following you.',
				time: 'June 7,2015'
			},
			{
				id: '6',
				user: {
					name: 'Juan Carpenter',
					avatar: 'assets/images/avatars/james.jpg'
				},
				message: 'sent you a message.',
				time: 'June 6,2015'
			},
			{
				id: '7',
				user: {
					name: 'Judith Burton',
					avatar: 'assets/images/avatars/joyce.jpg'
				},
				message: 'shared a photo with you.',
				time: 'June 5,2015'
			},
			{
				id: '8',
				user: {
					name: 'Vincent Munoz',
					avatar: 'assets/images/avatars/vincent.jpg'
				},
				message: 'shared a photo with you.',
				time: 'June 4,2015'
			}
		],
		posts: [
			{
				id: '1',
				user: {
					name: 'Garry Newman',
					avatar: 'assets/images/avatars/garry.jpg'
				},
				message: 'Remember the place we were talking about the other night? Found it!',
				time: '32 minutes ago',
				type: 'post',
				like: 5,
				share: 21,
				media: {
					type: 'image',
					preview: 'assets/images/profile/morain-lake.jpg'
				},
				comments: [
					{
						id: '1',
						user: {
							name: 'Alice Freeman',
							avatar: 'assets/images/avatars/alice.jpg'
						},
						time: 'June 10, 2015',
						message:
							'That’s a wonderful place. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et eleifend ligula. Fusce posuere in sapien ac facilisis. Etiam sit amet justo non felis ornare feugiat.'
					}
				]
			},
			{
				id: '2',
				user: {
					name: 'Andrew Green',
					avatar: 'assets/images/avatars/andrew.jpg'
				},
				message: 'Hey, man! Check this, it’s pretty awesome!',
				time: 'June 12, 2015',
				type: 'article',
				like: 98,
				share: 6,
				article: {
					title: 'Never stop changing!',
					subtitle: 'John Westrock',
					excerpt:
						"John Westrock's new photo album called 'Never stop changing' is published! It features more than 200 photos that will take you right in.",
					media: {
						type: 'image',
						preview: 'assets/images/profile/never-stop-changing.jpg'
					}
				},
				comments: [
					{
						id: '1',
						user: {
							name: 'Alice Freeman',
							avatar: 'assets/images/avatars/alice.jpg'
						},
						time: 'June 10, 2015',
						message:
							'That’s a wonderful place. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et eleifend ligula. Fusce posuere in sapien ac facilisis. Etiam sit amet justo non felis ornare feugiat.'
					}
				]
			},
			{
				id: '3',
				user: {
					name: 'Carl Henderson',
					avatar: 'assets/images/avatars/carl.jpg'
				},
				message:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et eleifend ligula. Fusce posuere in sapien ac facilisis. Etiam sit amet justo non felis ornare feugiat. Aenean lorem ex, ultrices sit amet ligula sed...',
				time: 'June 10, 2015',
				type: 'something',
				like: 4,
				share: 1
			}
		]
	},
	photosVideos: [
		{
			id: '1',
			name: 'June 2018',
			info: '5 Photos',
			media: [
				{
					type: 'photo',
					title: 'A Walk Amongst Friends',
					preview: 'assets/images/profile/a-walk-amongst-friends-small.jpg'
				},
				{
					type: 'photo',
					title: 'Braies Lake',
					preview: 'assets/images/profile/braies-lake-small.jpg'
				},
				{
					type: 'photo',
					title: 'Fall Glow',
					preview: 'assets/images/profile/fall-glow-small.jpg'
				},
				{
					type: 'photo',
					title: 'First Snow',
					preview: 'assets/images/profile/first-snow-small.jpg'
				},
				{
					type: 'photo',
					title: 'Lago di Braies',
					preview: 'assets/images/profile/lago-di-braies-small.jpg'
				}
			]
		},
		{
			id: '2',
			name: 'May 2018',
			info: '7 Photos, 3 Videos',
			media: [
				{
					type: 'photo',
					title: 'Lago di Sorapis',
					preview: 'assets/images/profile/lago-di-sorapis-small.jpg'
				},
				{
					type: 'photo',
					title: 'Morain Lake',
					preview: 'assets/images/profile/morain-lake-small.jpg'
				},
				{
					type: 'photo',
					title: 'Never Stop Changing',
					preview: 'assets/images/profile/never-stop-changing-small.jpg'
				},
				{
					type: 'photo',
					title: 'Reaching',
					preview: 'assets/images/profile/reaching-small.jpg'
				},
				{
					type: 'photo',
					title: 'Yosemite',
					preview: 'assets/images/profile/yosemite-small.jpg'
				},
				{
					type: 'photo',
					title: 'A Walk Amongst Friends',
					preview: 'assets/images/profile/a-walk-amongst-friends-small.jpg'
				},
				{
					type: 'photo',
					title: 'Braies Lake',
					preview: 'assets/images/profile/braies-lake-small.jpg'
				},
				{
					type: 'photo',
					title: 'Fall Glow',
					preview: 'assets/images/profile/fall-glow-small.jpg'
				},
				{
					type: 'photo',
					title: 'First Snow',
					preview: 'assets/images/profile/first-snow-small.jpg'
				},
				{
					type: 'photo',
					title: 'Lago di Braies',
					preview: 'assets/images/profile/lago-di-braies-small.jpg'
				}
			]
		},
		{
			id: '3',
			name: 'April 2018',
			info: '7 Photos',
			media: [
				{
					type: 'photo',
					title: 'Lago di Sorapis',
					preview: 'assets/images/profile/lago-di-sorapis-small.jpg'
				},
				{
					type: 'photo',
					title: 'Morain Lake',
					preview: 'assets/images/profile/morain-lake-small.jpg'
				},
				{
					type: 'photo',
					title: 'Never Stop Changing',
					preview: 'assets/images/profile/never-stop-changing-small.jpg'
				},
				{
					type: 'photo',
					title: 'Reaching',
					preview: 'assets/images/profile/reaching-small.jpg'
				},
				{
					type: 'photo',
					title: 'Yosemite',
					preview: 'assets/images/profile/yosemite-small.jpg'
				},
				{
					type: 'photo',
					title: 'A Walk Amongst Friends',
					preview: 'assets/images/profile/a-walk-amongst-friends-small.jpg'
				},
				{
					type: 'photo',
					title: 'Braies Lake',
					preview: 'assets/images/profile/braies-lake-small.jpg'
				}
			]
		}
	],
	about: [
		{
			id: 1,
			first_name: 'Jessika',
			last_name: 'Harriagn',
			position: 'Assistant Media Planner',
			avatar: 'http://dummyimage.com/201x104.png/5fa2dd/ffffff',
			address: '40 Lawn Plaza'
		},
		{
			id: 2,
			first_name: 'Pietro',
			last_name: 'Greatbach',
			position: 'Human Resources',
			avatar: 'http://dummyimage.com/168x213.png/cc0000/ffffff',
			address: '42113 Golf View Terrace'
		},
		{
			id: 3,
			first_name: 'Rianon',
			last_name: 'McGray',
			position: 'Registered Nurse',
			avatar: 'http://dummyimage.com/142x141.jpg/5fa2dd/ffffff',
			address: '5972 Lien Pass'
		},
		{
			id: 4,
			first_name: 'Elka',
			last_name: 'McFarland',
			position: 'Analyst Programmer',
			avatar: 'http://dummyimage.com/238x195.bmp/ff4444/ffffff',
			address: '53808 Holy Cross Place'
		},
		{
			id: 5,
			first_name: 'Michaeline',
			last_name: 'Whiscard',
			position: 'Tax Accountant',
			avatar: 'http://dummyimage.com/101x201.png/dddddd/000000',
			address: '31 Loomis Junction'
		},
		{
			id: 6,
			first_name: 'Daniella',
			last_name: 'Van Hesteren',
			position: 'Operator',
			avatar: 'http://dummyimage.com/123x246.png/cc0000/ffffff',
			address: '6851 Esch Trail'
		}
	]
};

mock.onGet('/api/achitect/timeline').reply(config => {
	return [200, architect.timeline];
});

mock.onGet('/api/acritect/photos-videos').reply(config => {
	return [200, architect.photosVideos];
});

mock.onGet('/api/architect/about').reply(config => {
	return [200, architect.about];
});
