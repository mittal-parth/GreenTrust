# Green Trust
<p> A Blockchain Revolution in Organic Farming <p/>

![Landing](https://user-images.githubusercontent.com/76661350/219805436-17bd9c16-1c68-4c98-bfe6-d8c0e7afbb21.jpg)

## Technologies Used

- [Next Js](https://nextjs.org/)
- [Next-PWA](https://www.npmjs.com/package/next-pwa) 
- [Tailwind CSS](https://tailwindcss.com/)
- [Solidity](https://soliditylang.org/)
- [IPFS](https://ipfs.tech/)
- [SuperFluid](https://www.superfluid.finance)
- [Arcana](https://www.mantle.xyz/)
- [Mantle](https://www.arcana.network/)
- [ChainLink](https://chain.link/)
- [Polygon](https://polygon.technology/)
- [Push Protocol](https://push.org)
- [Polywrap](https://polywrap.io/)
- [Raspberry Pi (IoT)](https://www.raspberrypi.org/)


<br/>

## Problems 

One of the significant issues in organic farming is that certifications are required from multiple parties for
the products to be deemed ‘organic’. Currently, there are two government sanctioned mechanisms
for issuance of certification:

1. PGS Participatory Guarantee Systems (PGS): Farmers in a group inspect each other’s land
and vouch for its organic credentials. The inspection is carried out at the start of every sowing
season and farmers visit each other almost weekly to provide counsel. If a farmer is found
to be in violation, her produce is not sold through the group till she rectifies her mistake.

2. Third party certification: The farms is certified by authorized third party certifying agencies.
The database of India’s organic products is very poor and traceability, which is key for export growth,
remains weak, while third party certification as insisted by APEDA is very costly. In addition, major
markets for export do not accepts PGS certification, and there is no mechanism to link certifications
by third parties and PGS. 

## Solution

GreenTrust offers a solution for obtaining certification in organic farming by organizing credible and decentralized Participatory Guarantee Systems (PGSs). 

In order to secure certification, every harvest must be sponsored by certified farmers who contribute a stake as a form of assurance that organic farming methods have been properly implemented. 

The platform utilizes decentralized IoT sensor data to monitor and track various environmental conditions. Additionally, any individual may challenge the organic authenticity of a particular harvest on the platform. 

These challenges are then evaluated by a certified inspector, and if the challenge is deemed to be valid, the challenger will receive the stake put forward for the harvest.

Conversely, if the challenge is found to be invalid, the challenger will lose the stake they put forward to initiate the challenge.

### 

#### Farmer
-  A Farmer joins the GreenTrust Platform for using the decentralized PGS system of verification for his organic Crops.
-  The onboarding of Farmers is simplified by using Arcana Auth which provides a seamless interface from Web2 to Web3.
-  This provides him a platform to gain credibility for his crops without paying high third party certification fees. (Incentive)
-  In doing so, a farmer pays a nominal subscription fee in terms of Superfluid's CFA (Continuous Flow Agreement) money streaming model.
-  The farmer can request stakes to be placed on his farm by stakeholders by clicking on Request Stake button, which sends a Push Notification to everyone subscribed to the GreenTrust Channel.
  
#### Verifier
- A Verifier is an authorized Organic Crop Verifier associated with our platform.
- The Verifier will get allocated with inspecting a Challenged Crop randomly through our system. (Future Work)
- Since the Crop challenges will be randomly allocated the bias in the verifier's judgement will be highly reduced.
- Verifier can either approve or reject a challenge after inspecting the challenged crop.
- Verifier always gets the same amount (his inspection fee) irrespective of his decision which reduces his bias further.(Incentive)
 
#### Stakeholder 
- A Stakeholder is a person who vouches for the credibility of an organic crop by placing a certain amount as stake.
- After a certain duration from the crop's harvest, the stake amount will be returned to all the stakeholders and a reward will be given using Superfluid's IDA (Instant Distribution Agreement) model automatically using Chainlink Upkeep. (Incentive)
- Stakeholder's Rewards are generated from the farmer's subscriptions by the smart contract deployed on Polygon.
- If a challenge on the crop is approved by a verifier, then the stakeholder loses his stake amount.
 
#### Consumer
- Consumer is the one who consumes the farmer's organic products.
- The organic products will have QR codes which can be scanned to access the Crop details like Crop Health data (Uploaded through an IoT device), Challenges on the crop, stakeholders, etc.
- The consumer can challenge an organic crop harvest's credibility by placing a challenge and staking a certain amount.
- If the verifier approves the challenge, the Stakeholders' stakes are transferred to the consumer as a compensation amount and his stake (the one he placed to challenge) is transferred to the Verifier as a fee. (Incentive)
- If the verifier rejects the challenge, the consumer loses his staked amount to the Verifier (as a fee).

## Advantages

- <b>Establishing traceability</b>: Placing information regarding the lifecycle of crops on a
blockchain will help improving trust in the self certification process and establishing
traceability at the point of sale.

- <b>Disintermediation of multiple stakeholders</b>: As highlighted, the process of third party
certification is often expensive, and in turn drives up cost of produce, making it harder for
farmers to sell. Disintermediation through peer to peer certification mechanisms, or
integration of third party certifiers into the PGS process would unlock large markets for
produce and reduce cost of production.

- <b> Programmable transfers </b>: Much like in supply chain, tracking of products using IoT devices
along their value chain can help increase efficiency in transfer of asset between
stakeholders, and alert stakeholders immediately of issues. 

## Links

- Figma - https://www.figma.com/file/QwfJiaDaLHx7Tav6Uwyiwf/GreenTrust?node-id=2%3A2&t=0jp5DXuTlfI99jiO-1

## Network Diagram 
![GreenTrustND](https://user-images.githubusercontent.com/72497928/219973576-d238d090-1636-49bb-a6d1-ea7a04fc57c3.png)

## Team Members
- Mehul Todi
- Abhiraj Mengade
- Shashank S M
- Pranav Agarwal
- Parth Mittal

## Setup 
### Contract
1. Touch `root/.env` file as follows:
```.env
GOERLI_PRIVATE_KEY=<key>
CONTRACT_ADDRESS=0x45124
```
2. `npm i`
3. `npx hardhat run ./scripts/deploy.js --network NETWORK_NAME`

### Frontend
1. `cd greentrust`
2. `npm i`
3. `npm run build`
4. `npm run start`
