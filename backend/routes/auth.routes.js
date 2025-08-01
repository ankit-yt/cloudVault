const express = require('express');
const axios = require('axios');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.get('/dropbox/callback', async (req, res) => {
	const { code } = req.query;
  
	try {
	  const tokenResponse = await axios.post('https://api.dropbox.com/oauth2/token', null, {
		params: {
		  code,
		  grant_type: 'authorization_code',
		  client_id: 'bsdwapln8fyz71n',
		  client_secret: 'drb5erhz8nt6bas',
		  redirect_uri: 'https://cloudvault-jk10.onrender.com/auth/dropbox/callback'
		},
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded'
		}
	  });
  
	  const { access_token } = tokenResponse.data;
  
	  // ✅ Get user info
	  const accountInfo = await axios.post(
		'https://api.dropboxapi.com/2/users/get_current_account',
		null,
		{
		  headers: {
			Authorization: `Bearer ${access_token}`,
			'Content-Type': 'application/json',
		  },
		}
	  );
  
		const { email, name, profile_photo_url, account_id } = accountInfo.data;
		
		let newUser = await User.findOne({ email });
		if (!newUser) {
		  newUser = new User({ email,username:name.display_name,img: profile_photo_url});
		  await newUser.save();
		}
		if (!newUser.img) {
			newUser.img = profile_photo_url;
			await newUser.save();
		}
		const token = await newUser.generateToken();
		console.log(newUser.username)
		
		const newUserString = encodeURIComponent(JSON.stringify(newUser));
  
	  // ✅ Redirect to frontend with token + user info
	  
  
	  res.redirect(`https://cloud-vault-gamma.vercel.app/?token=${token}&dropboxToken=${access_token}&user=${newUserString}`);
  
	} catch (err) {
	  console.error(err.response?.data || err.message);
	  res.status(500).send('Dropbox auth failed');
	}
  });
  

module.exports = router;
