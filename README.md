# Green Trust
<p> A Blockchain Revolution in Organic Farming <p/>

![Landing](https://user-images.githubusercontent.com/76661350/219805436-17bd9c16-1c68-4c98-bfe6-d8c0e7afbb21.jpg)

## Tech Stack

<li>Frameworks</li>

- [ReactJS](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next Js](https://nextjs.org/)
- [Polywrap](https://polywrap.io/)

<li>Libraries/Tools</li>
    
- [React Icons](https://react-icons.github.io/react-icons")
- [React Lottie](https://www.npmjs.com/package/react-lottie)
- [IPFS](https://ipfs.tech/)

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

![gt](https://user-images.githubusercontent.com/72497928/219967298-9968fab5-1913-48ad-a7d5-13e26acd6677.png)


## Team Members
- Mehul Todi
- Abhiraj Mengade
- Shashank S M
- Pranav Agarwal
- Parth Mittal
# GreenTrust
A blockchain revolution for organic farming.

## Setup
1. Touch `root/.env` file as follows:
```.env
GOERLI_PRIVATE_KEY=<key>
CONTRACT_ADDRESS=0x45124
```
2. `npm i`
3. `npx hardhat run ./scripts/deploy.js --network NETWORK_NAME`
