const express = require("express")
const app = express()
const PORT = 4000

// Enable CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000") // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

app.use(express.json())

app.post("/login/submit", (req, res) => {
	console.log("Login:", req.body.body)
	res.send(req.body.body)
})

app.post("/signup/submit", (req, res) => {
	console.log("SignUp:", req.body.body)
	res.send(req.body.body)
})

app.post("/reset/submit", (req, res) => {
	console.log("Reset:", req.body.body)
	res.send(req.body.body)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
