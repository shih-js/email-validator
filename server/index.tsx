const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(bodyParser.json());

console.log('>>> 💻 Starting express server...');

app.post('/validate', async (request, response) => {
	const email = request.body.email;
	const API_KEY = 'test_f7be4179d2469588d5146adc27e311d7fad7eadc39d24a68cfec26a492cfe524';
	// const API_KEY = 'live_d3a52f6c261d115e02c194822a0fad11df4c7b8c06d590a700d583b318d95734';

	await fetch(`https://api.kickbox.com/v2/verify?email=${email}&apikey=${API_KEY}`)
		.then((response) => response.json())
		.then((data) => response.send(data))
		.catch((error) => console.log(error));
});

app.listen(PORT);

console.log(`>>> ✅ Successfully started on port ${PORT}.`);
