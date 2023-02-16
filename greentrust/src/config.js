const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

export const APP_ADDRESS = "851e2f9b3e599f9ea4f8f1a3c2c9012d3543dc2b";
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
