const { PolywrapClient } = require('@polywrap/client-js');

async function main() {
	const client = new PolywrapClient({
		uri: 
	});
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
 