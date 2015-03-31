module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

	var users = {
    'andreisoare': {
      id: 'andreisoare',
      name: 'Andrei Soare',
      email: 'andrei@abcd.com',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI1E2v28XONg6XyfvbpqWYEE-P8-xb3oiJVm4FvRMJRD6aEHZs-A'
     },
    'vladberteanu': {
      id: 'vladberteanu',
      name: 'Vlad Berteanu',
      email: 'vlad@xyz.com',
     },
    'dgandhi': {
      id: 'dgandhi',
      name: 'Deepali Gandhi',
      email: 'deepali@ddd.com',
      photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFoAWgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIEBgcBAwj/xAAzEAACAQMCBQEGBQQDAAAAAAABAgMABBEFIQYSEzFBUQciYXGBkRQyQqHBUrHR8BWC4f/EABkBAAIDAQAAAAAAAAAAAAAAAAECAAMEBf/EACERAAICAgIBBQAAAAAAAAAAAAABAhEDMRIhYQQTIjJB/9oADAMBAAIRAxEAPwDcaa5AUknAA3p1Uz2uaxLo3BF/JbkrLcIbdWBwV5hgkfHFQiMj9o3tCvNc1Wezs7gxaRDJyoseR1cd2f13zgdsYqlx3zuSFVmRc7elQLdneQRpHknYACtG0PhC1a26s5YsfC7eKpnkjDZpx4pS0V7h/iPVNAuFu9Luump/MhJ5W+DL5reuBuPtP4mtCszpbahEvNLAxwCP6gT47fesY17g57NDcaa7FQMtEdxVZsr2W1vVlUFZoT2cf3HkfCjDIpaBkxOOz6+VlYBlIIO4I806sc9nftNsoov+O1ReknUYxOhLBAf047474rXba4iuYI57eRZIpFDI6nIYHsatsoao9qVKlUAKlSpVCCrOPbyrNwMxX9Nwn77fzWj1nvttdTwiluQSZrlRgeg3J+gBNB6DHZ8+8KRG41dQFzyxkgfb/NXuG+1b8Z0YkkEK91KBQf5qkWkyaTrxnXKwhjgkd1zWm3OshLAR5ZAxwWVS2B/7WPP9jo+mScdnhfaRqV/qKtDMghCgkN6Eehqo8eaSmj3tvcR9p1Ib0yMVczc3r2PUHK/IMRBWClj42FC+J9NutattPtvdN0spZiOwGCKXE6kkWZ4rhaM6tRiXqo5Ug592tC4Z4/1CwutOhjkkjtrd8SrIRiRSfygePn4onons+tl0uYSL1b1WDAntj+n5HcfWrPp3CWkTuqJojWiqCJeowOTjspBP32rW02Yeqpl84f1UarYrP1bdy3vDotkAf75otWc6Pw9NoesRrYXksMM0gVFUc3u92BzsBtkbZzitEQEAAnJxvTx8lMkk+h1KlSoiioDxfo8esaU8bMEkRWCO3ZeYYOfhij1QdZR30y6SNQxMTe6f1DyPtmgwrZ8m8QWkkVzJGxHTjcxRgHIwPTNTeHeIr2OSPTvw73RZuVApy3yx5q0cbcPI9091bKypKgJQk7N61Sbf8ToesW94mzwNkH1GMH9iaqaTVM0xbjK0azpttMIA72PRbGcOwH2r14bjeXXr4XCcvTSMKG+OTtSttTk1HRzLp3J13jDAsBjf0ovw/p8s4W+vECFl90K2D/2H381nxL5GvPJOAThItr+Zh2lhU4+Ks2f2ZftRi2mEkPVI5Qf05qva5cXFjpU13Bbi4mjwqpzBQeZgNz6US0yYzRqyjIIDf7863V+nP8BFmPMGzuDkYo8Dmq8TvsM8veiWmz8x6Wey5qCyCFKlSqCCrjDI3rtKoQz/AFCwCzTWkwIwfcPw7is54o4WmMTmGNWYNlQp8fKtq4jsppkSa2UOybMmNyPUUA6ImQHkB+Cj+aRoujLozrg2zudMtxBcMqv35M7r8/StD0eXmiCnuKFazpy2to9zGiq6uGbA3Ydtz570zSrvkYMTt538VQ3wn2aa54+g/dIssE0UmOV0IOflS02JYY0g55MIAF5pDuBUa7v7bp5MygsDgZ3PyxUqxYzQwziM4dASGGCu3Yjwa0GYJ7lMPvXraTdPUY1LYVl+/f8AxTLZXOwXIpGKN7lZBklNgQfNMKw/mlmoSMxGSSc0771BKJlcY481Ba9Yj3UA+e9D9WM97pt3brIVMsLoOXA3IoN0HiyRecQ6XaOyTXa86nBVAWwfpVbuNS0ya6J0i8XMpPNDgg575GapckVxZM1vfJiU4IGRj6UNuELSBoucSKQVKZyDVHuyuqNi9PFK7NDvIvxVjLCWIEi8uTuQfWqsYp9OmVbhSu2A3dW9MGjejX813pypeRgXEZxJtjOexx8d/rRa1ukClHVZIW2I7/tRnBTEhkeNnhojQXUGWiU3CNjnAGSuMgH96J8rbcqp1F2wfIrsVrZwxT3FtEiBhgFNgNvT5k121W5kiHVliI8EJuPrmrIql2Vyfdo69zjEY5uq3Zc7iplrByjLePFMtbOKBmK5Lt+Z2OSamLViQjPQbAUsmmiu0aAQ80xycbV2ke1IMB9Q0q2vXDXEKuV/KSNxTItNghXlihRF8BVA/tRY9q5QpBtgiTTj+aA8jj1Gx+BpsOj3N045ikIP5nVic/IetGMD0qHqU80et6dFHLIsbD3kViAd/IqPoiZJlfT9FspOdwkaL1Hd2yxH1qHw/wAR6br4n/42Xm6BHOCOUgHOD8jg/apurRxushdFY9A7kZ9aoPsvUJo16yAKxuGBIGCcAYqiU2k2PCKZpSyLzEBlJHcBhtXsrZrLuBJZH4jvOaRjzJKWye/vjvWmL2p4ZWwThxJAPpSpkfmn1oRUf//Z'
    },

  };
  usersRouter.get('/:id', function(req, res) {


    res.send({
      "user": users[req.params.id]
    });
  });

  usersRouter.post('/', function(req, res) {
    if (req.body.user.meta.operation === 'signup'){
    	var user = {
    		id: req.body.user.id,
    		name: req.body.user.name,
        	email: req.body.user.email
    	};
    	res.send({
			"user": user
    	});
    };
    if (req.body.user.meta.operation === 'login') {

    	if (users[req.body.user.id]){
        res.send({
				"user": users[req.body.user.id]
    		});

    	}
    	else {

        res.status(404).send('Unable to find your details. Please check that you have entered the correct username and password.');
    	}
    };
  });

  usersRouter.get('/:id', function(req, res) {
    res.send({
      'users': {
        id: req.params.id
      }
    });
  });

  usersRouter.put('/:id', function(req, res) {
    res.send({
      'users': {
        id: req.params.id
      }
    });
  });

  usersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/users', usersRouter);
};
