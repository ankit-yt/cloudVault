require('dotenv').config();
const express = require('express');
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors({
	origin: "https://cloud-vault-gamma.vercel.app",  // Allow frontend origin
	credentials: true  // Allow cookies to be sent
  }));
app.use(express.urlencoded({ extended: true }))
const db = require('./config/db')
const userRouter = require("./routes/user.routes")

const cookieParser = require('cookie-parser');

const dropboxRouter = require("./routes/dropbox.routes")

app.use(express.json()); 
app.use(cookieParser());

app.use("/dropbox", dropboxRouter)
app.use("/user", userRouter)
app.use("/auth" , require("./routes/auth.routes"))


app.listen(3000, () => {
	console.log('Server is running on port 3000')
})