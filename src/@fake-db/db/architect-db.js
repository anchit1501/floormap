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
			first_name: 'Eng. Arafat ',
			last_name: 'Farsani',
			position: 'Tahalof Engineering Consultants Co.',
			avatar:
				'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
			address: '966-56-2937029',
			email: 'arafat@tahalof.com;info@tahalof.com'
		},
		{
			id: 2,
			first_name: 'Mohammed',
			last_name: 'Al-Sharief',
			position: 'Dubai Center Engineering Consultant',
			avatar:
				'https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/324/419665d2-74b7-49d4-b3c8-3aea253f966f.jpg',
			address: '+966-555936611',
			email: 'mohd@dubai.com.sa;majed@dubai.com.sa;arch.jed@dubai.com.sa;safety.jed@dubai.com.sa'
		},
		{
			id: 3,
			first_name: 'Mr. Moath',
			last_name: '',
			position: 'Vision Dimension Engineering Consultancy',
			avatar: 'https://image.shutterstock.com/image-photo/isolated-shot-young-handsome-male-260nw-762790210.jpg',
			address: '966-568603766',
			email: 'safety@vision-d2030.com;info@vision-d2030.com'
		},
		{
			id: 4,
			first_name: 'Eng. Muath',
			last_name: 'Abdulrahman',
			position: 'Al Hussain Safety Consultant',
			avatar: 'https://image.shutterstock.com/image-photo/isolated-shot-young-handsome-male-260nw-762790210.jpg',
			address: '+966-540448201,+966-539222188',
			email: 'muath.jamal@hec.sa'
		},
		{
			id: 5,
			first_name: 'Eng. Samer',
			last_name: ' Mahmod',
			position: 'Ziyad Krishan Office for Consulting Engineering',
			avatar: 'https://image.shutterstock.com/image-photo/isolated-shot-young-handsome-male-260nw-762790210.jpg',
			address: '0503591511',
			email: 'samermando@hotmail.com'
		},
		{
			id: 6,
			first_name: 'Ragab Abdel',
			last_name: 'Salam',
			position: 'AZM Engineering Consultances',
			avatar: 'https://image.shutterstock.com/image-photo/isolated-shot-young-handsome-male-260nw-762790210.jpg',
			address: '054302584',
			email: 'azm@saudieng.org'
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
