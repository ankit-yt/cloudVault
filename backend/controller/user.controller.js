const userModel = require('../models/user.model');

module.exports.userSignup = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
		if (existingUser) {
			return res.status(400).json({ message: 'Username or email already in use' });
		}

		
		const hashedPassword = await userModel.hashPassword(password);
		const imgBase64 = req.file ? `data:image/png;base64,${req.file.buffer.toString("base64")}` : null;
		const newUser = new userModel({ username, email, password: hashedPassword , img:imgBase64 });
		await newUser.save();

	
		const token = await newUser.generateToken();
		res.cookie("token", token);

		console.log('User registered successfully:', newUser);

		return res.status(201).json({
			message: 'User registered successfully', token, 
			user: {
				username: newUser.username,
				email: newUser.email,
				img: newUser.img, // Base64 encoded image
			}
		 });
	} catch (error) {
		console.error('Error in userSignup:', error);
		return res.status(500).json({ message: 'Internal Server Error', error: error.message });
	}
};

module.exports.userLogin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

	
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		const token = await user.generateToken();
		res.cookie("token", token);
		console.log("his is cookie"+token)

		return res.status(200).json({
			message: 'User logged in successfully', token, 
			
			user: {
                username: user.username,
                email: user.email,
                img: user.img, // Base64 encoded image
            }
		 });
	} catch (error) {
		console.error('Error in userLogin:', error);
		return res.status(500).json({ message: 'Internal Server Error', error: error.message });
	} 
};


module.exports.userProfile = async (req, res) => { 
	try {
        const user = req.user;

        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error in userProfile:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

module.exports.logout = async (req, res) => {
	try {
        res.clearCookie("token");
        return res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error in logout:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}