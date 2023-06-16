1. Clone / Download the repository

```bash
$ git clone https://github.com/Long2504/Manage-medical-records-using-fabric.git
```

2. **Before starting with the network is set-up start the docker.**

3. Run the following command to pull the docker images.

```bash
$ curl -sSL https://bit.ly/2ysbOFE | bash -s --  2.0.1 1.5.5 -s -b

```

It will pull the respective fabric docker images for the binaries.

4. Change the working directory to hospital-network

```bash
$ cd ./hospital-sdk
```

5. Use the following command to start the network, with 2 organization hospital and an Orderer node & then create an hospital-channel & deploy & Instantiate the hospital Contract on two peers.

```bash
$ ./hospitalNetwork.sh up
```

7. Use the Following Command to test the Chaincode is Successfully Installed & Instantiated on Two Peers

```bash
$ ./hospitalNetwork.sh validate
```

8. Use the Following Command to Pause the hospital network (it will stop all the containers but does not remove the ledger details)

```bash
$ ./hospitalNetwork.sh pause
```

9. Use the Following Command to Start the paused network

```bash
$ ./hospitalNetwork.sh start
```

10. Use this command to bring the network down <br>
    (Note: this will remove all the ledger details )

```bash
$ ./hospitalNetwork.sh down
```

## Hospital Node Server

Hospital Node Server is a Node.js server for connecting Client apps to hospital fabric network for interacting with hospital chaincode using http api endpoints.

### Installation

1. Change the working directory to /hospital-sdk/fabric-network

```bash
$ cd ./hospital-sdk/fabric-network
```

2. Install dependencies

```bash
$ npm install
```

this will install the packages used for connecting fabric-client to the fabric network

3. Change the working directory to /hospital-sdk/node-server

```bash
$ cd ./hospital-sdk/node-server
```

4. Install dependencies

```bash
$ npm install
```

3. Set up environment variables

```bash
$ cp .env.example .env
```

It will set the admin credentials for the mongodb containers into the .env file. <br>
(Note: Modification of the credientials in the .env file will lead to connection error with the mongodb container.)

### Usage

1. Start the server

```bash
$ npm start
```

This will start the server on port 3001.

2. Register and Enroll the Users. In Another Terminal, run the following command.

```bash
$ npm enroll
```

This will register,enroll and Create Wallet for Test users.

3. Access the Swagger documentation

```bash
$ http://localhost:3001/api-docs/
```

This will open the Swagger UI, which provides an easy way to explore and test the API.

## Troubleshooting

Incase if any of the commands fail due to configurations or the network was not brought down properly use the following commands to clear the corrupted docker images and fix the issue.

1. Stop the containers.

```bash
$docker stop $(docker ps -a -q)
```

2. Remove the containers

```bash
$docker rm -f $(docker ps -aq)
```

3. Remove all unused images not just dangling ones

```bash
$docker system prune -a
```

4. Remove all unused local volumes

```bash
$docker volume prune
```

5. Restart the docker.

6. Once the docker is up ,open a new terminal and download the images. (same as Step 3 in Bring up the network section)

```bash
$ curl -sSL https://bit.ly/2ysbOFE | bash -s --  2.0.1 1.5.5 -s -b
```

## Acknowledgments

We would like to express our gratitude to the following individuals and organizations for their contributions and support to our Fabric project:

- The Hyperledger Fabric community for developing and maintaining such a powerful and flexible platform for enterprise blockchain solutions.
- The authors and contributors of the following open-source projects, which we used extensively in our project:
  - [Network Samples](https://github.com/hyperledger/fabric-samples) by Hyperledger Fabric
  - [Patient Data Management Project](https://github.com/sgirdhar/hyperledger-fabric-patient-data-management) by [Sgirdhar](https://github.com/sgirdhar), [Vineet Bhat](https://github.com/bhatvineeth), [Towfi Caziz](https://github.com/towficaziz) and [Faraz Shamim](https://github.com/farazshamim9)

## Note

- This project is not yet production-ready and is intended for learning purposes only.

- This project is a Hyperledger Fabric network implementation that showcases the basic features of Fabric and demonstrates how to interact with the network using chaincodes.

- We created this project as a learning exercise to help us understand the basics of Fabric and how to build decentralized applications using the platform. We hope that it can serve as a starting point for others who are also interested in learning more about Fabric.

- Please keep in mind that this project is a work in progress and may contain bugs or other issues. We welcome feedback and contributions from the community to help improve the project.
