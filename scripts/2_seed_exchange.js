// noinspection JSUnusedAssignment
/* eslint-disable no-undef */

const config = require("../src/config.json")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
}

const wait = (seconds) => {
    const milliseconds = seconds * 1000
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function main() {

    // Fetch accounts from wallet - these are unlocked
    const accounts = await ethers.getSigners()

    //Fetch networks
    const { chainId } = await ethers.provider.getNetwork()
    console.log("using chainId:", chainId)

    // Fetch the deployed contract or tokens
    const Finix = await ethers.getContractAt("Token", config[chainId].Finix.address )
    console.log(`Finix fetched: ${Finix.address}`)
    
    const Auriga = await ethers.getContractAt("Token", config[chainId].Auriga.address)
    console.log(`Auriga fetched: ${Auriga.address}`)
    
    const Empyrean = await ethers.getContractAt("Token", config[chainId].Empyrean.address)
    console.log(`Empyrean fetched: ${Empyrean.address}`)
    
    const Helix = await ethers.getContractAt("Token", config[chainId].Helix.address)
    console.log(`Helix fetched: ${Helix.address}`)

    const Quantum = await ethers.getContractAt("Token", config[chainId].Quantum.address)
    console.log(`Quantum fetched: ${Quantum.address}`)

    const Sirius = await ethers.getContractAt("Token", config[chainId].Sirius.address)
    console.log(`Sirius fetched: ${Sirius.address}`)

    const Zeroconium = await ethers.getContractAt("Token", config[chainId].Zeroconium.address)
    console.log(`Zeroconium fetched: ${Zeroconium.address}`)

    //Fetch the deployed DecentralizedExchange
    const decentralizedexchange = await ethers.getContractAt("DecentralizedExchange", config[chainId].decentralizedexchange.address)
    console.log(`Decentralized Exchange fetched: ${decentralizedexchange.address}\n`)

    //Give tokens to account
    const sender = accounts[0]
    const receiver = accounts[1]
    let amount = tokens(10000)

    let transaction, result
    //user1 transfers 10,000 Finix
    transaction = await Finix.connect(sender).transfer(receiver.address, amount)
    console.log(`Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`)
    //user1 transfers 10,000 Auriga
    transaction = await Auriga.connect(sender).transfer(receiver.address, amount)
    console.log(`Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`)
    //user1 transfers 10,000 Empyrean
    transaction = await Empyrean.connect(sender).transfer(receiver.address, amount)
    console.log(`Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`)
    //user11 transfers 10,000 Helix
    transaction = await Helix.connect(sender).transfer(receiver.address, amount)
    console.log(`Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`)
    //user1 transfers 10,000 Quantum
    transaction = await Quantum.connect(sender).transfer(receiver.address, amount)
    console.log(`Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`)
    //user1 transfers 10,000 Sirius
    transaction = await Sirius.connect(sender).transfer(receiver.address, amount)
    console.log(`Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`)
    //user1 transfers 10,000 Zeroconium
    transaction = await Zeroconium.connect(sender).transfer(receiver.address, amount)
    console.log(`Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`)

    //Set up exchange users
    const user1 = accounts[0]
    const user2 = accounts[1]
    amount = tokens(10000)

    //APPROVES AND DEPOSITS OF 100,000 TOKENs

    //FINIX TOKENs
    //User1 approves
    transaction = await Finix.connect(user1).approve(decentralizedexchange.address, amount)
    await transaction.wait()
    console.log(`Approved ${amount} Finix tokens from ${user1.address}`)

    //User1 deposit
    transaction = await decentralizedexchange.connect(user1).depositToken(Finix.address, amount)
    await transaction.wait()
    console.log(`Deposited ${amount} Finix tokens from ${user1.address}\n`)

    //AURIGA TOKENs
    //User2 approves 10,000 Auriga tokens
    transaction = await Auriga.connect(user2).approve(decentralizedexchange.address, amount)
    await transaction.wait()
    console.log(`Approved ${amount} Auriga tokens from ${user2.address}`)

    //user2  deposits 10,000 Auriga tokens
    transaction = await decentralizedexchange.connect(user2).depositToken(Auriga.address, amount)
    await transaction.wait()
    console.log(`Deposited ${amount} Auriga tokens from ${user2.address}\n`)

    //EMPYREAN TOKENs
    // User1 approves
    transaction = await Empyrean.connect(user1).approve(decentralizedexchange.address, amount)
    await transaction.wait()
    console.log(`Approved ${amount} Empyrean tokens from ${user1.address}`)

    // User1 deposit
    transaction = await decentralizedexchange.connect(user1).depositToken(Empyrean.address, amount)
    await transaction.wait()
    console.log(`Deposited ${amount} Empyrean tokens from ${user1.address}\n`)

    // HELIX TOKENS
    // User2 approves 10,000 Helix tokens
    transaction = await Helix.connect(user2).approve(decentralizedexchange.address, amount)
    await transaction.wait()
    console.log(`Approved ${amount} Helix tokens from ${user2.address}`)

    // User2 deposits 10,000 Helix tokens
    transaction = await decentralizedexchange.connect(user2).depositToken(Helix.address, amount)
    await transaction.wait()
    console.log(`Deposited ${amount} Helix tokens from ${user2.address}\n`)

    // QUANTUM TOKENS
    // User1 approves
    transaction = await Quantum.connect(user1).approve(decentralizedexchange.address, amount)
    await transaction.wait()
    console.log(`Approved ${amount} Quantum tokens from ${user1.address}`)

    // User1 deposit
    transaction = await decentralizedexchange.connect(user1).depositToken(Quantum.address, amount)
    await transaction.wait()
    console.log(`Deposited ${amount} Quantum tokens from ${user1.address}\n`)

    // SIRIUS TOKENS
    // User2 approves 10,000 Sirius tokens
    transaction = await Sirius.connect(user2).approve(decentralizedexchange.address, amount)
    await transaction.wait()
    console.log(`Approved ${amount} Sirius tokens from ${user2.address}`)

    // User2 deposits 10,000 Sirius tokens
    transaction = await decentralizedexchange.connect(user2).depositToken(Sirius.address, amount)
    await transaction.wait()
    console.log(`Deposited ${amount} Sirius tokens from ${user2.address}\n`)

    // ZEROCONIUM TOKENS
    // User1 approves
    transaction = await Zeroconium.connect(user1).approve(decentralizedexchange.address, amount)
    await transaction.wait()
    console.log(`Approved ${amount} Zeroconium tokens from ${user1.address}`)

    // User1 deposit
    transaction = await decentralizedexchange.connect(user1).depositToken(Zeroconium.address, amount)
    await transaction.wait()
    console.log(`Deposited ${amount} Zeroconium tokens from ${user1.address}\n`)

    //MAKE AND CANCEL ORDERS
    let orderId
    //user1 Makes Order using Auriga to get Finix
    transaction = await decentralizedexchange.connect(user1).makeOrder(Auriga.address, tokens(100), Finix.address, tokens(10))
    result = await transaction.wait()
    console.log(`Made order from ${user1.address}`)

    //Cancel Orders
    //user1 cancels order
    orderId = result.events[0].args.id
    transaction = await decentralizedexchange.connect(user1).cancelOrder(orderId)
    console.log(result.events);
    result = await transaction.wait()
    console.log(`Cancelled order from ${user1.address}\n`)
    //wait 1 seconds
    await wait(1)

    //Fill Orders
    //user1 makes order to get tokens
    transaction = await decentralizedexchange.connect(user1).makeOrder(Auriga.address, tokens(100), Finix.address, tokens(10))
    result = await transaction.wait()
    console.log(`Made order from ${user1.address}`)

    //user2 fills order
    orderId = result.events[0].args.id
    transaction = await decentralizedexchange.connect(user2).fillOrder(orderId)
    result = await transaction.wait()
    console.log(`Filled order from ${user1.address}\n`)
    //wait 1 seconds
    await wait(1)

    //user1 makes another order
    transaction = await decentralizedexchange.makeOrder(Auriga.address, tokens(50), Finix.address, tokens(15))
    result = await transaction.wait()
    console.log(`Made order from ${user1.address}`)

    //user2 fills the another order
    orderId = result.events[0].args.id
    transaction = await decentralizedexchange.connect(user2).fillOrder(orderId)
    result = await transaction.wait()
    console.log(`Filled order from ${user1.address}\n`)

    //wait 1 seconds
    await wait(1)

    //users1 makes final order
    transaction = await decentralizedexchange.connect(user1).makeOrder(Auriga.address, tokens(200), Finix.address, tokens(20))
    result = await transaction.wait()
    console.log(`Made order from ${user1.address}`)

    //user2 fills final order
    orderId = result.events[0].args.id
    transaction = await decentralizedexchange.connect(user2).fillOrder(orderId)
    result = await transaction.wait()
    console.log(`Filled order from ${user1.address}\n`)
    //wait 1 seconds
    await wait(1)


    //SEED OPEN ORDERs
    //user1 makes 10 orders
    for (let i = 1; i <= 10; i++) {
        transaction = await decentralizedexchange.connect(user1).makeOrder(Auriga.address, tokens(10 * i), Finix.address, tokens(10))
        result = await transaction.wait()

        console.log(`Made order from ${user1.address}`)

        // Wait 1 second
        await wait(1)
    }
    //user2 makes 10 orders
    for (let i = 1; i <= 10; i++) {
        transaction = await decentralizedexchange.connect(user2).makeOrder(Finix.address, tokens(10), Auriga.address, tokens(10 * i))
        result = await transaction.wait()

        console.log(`Made order from ${user2.address}`)

        // Wait 1 second
        await wait(1)
    }

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});