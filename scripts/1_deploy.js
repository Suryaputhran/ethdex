// import {ethers} from "ethers";

async function main() {
    // eslint-disable-next-line no-undef
    const Token = await ethers.getContractFactory("Token");
    // eslint-disable-next-line no-undef
    const DecentralizedExchange = await ethers.getContractFactory("DecentralizedExchange");

    //Fetch accounts
    // eslint-disable-next-line no-undef
    const accounts = await ethers.getSigners()
    console.log(`Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`);

    //deploy contract
    const Auriga = await Token.deploy("Auriga", "AUG", "18", "100000000");
    await Auriga.deployed();
    console.log(`Auriga deployed to: ${Auriga.address}`);

    const Empyrean = await Token.deploy("Empyrean", "EMP", "18", "100000000");
    await Empyrean.deployed();
    console.log(`Empyrean deployed to: ${Empyrean.address}`);

    const Finix = await Token.deploy("Finix", "FNX", "18", "100000000");
    await Finix.deployed();
    console.log(`Finix deployed to: ${Finix.address}`);

    const Helix = await Token.deploy("Helix", "HLX", "18", "100000000");
    await Helix.deployed();
    console.log(`Helix deployed to: ${Helix.address}`);

    const Quantum = await Token.deploy("Quantum", "QTM", "18", "100000000");
    await Quantum.deployed();
    console.log(`Quantum deployed to: ${Quantum.address}`);

    const Sirius = await Token.deploy("Sirius", "SRS", "18", "100000000");
    await Sirius.deployed();
    console.log(`Sirius deployed to: ${Sirius.address}`);

    const Zeroconium = await Token.deploy("Zeroconium", "ZRC", "18", "100000000");
    await Zeroconium.deployed();
    console.log(`Zeroconium deployed to: ${Zeroconium.address}`);

    const decentralizedexchange = await DecentralizedExchange.deploy(accounts[1].address, 10);
    await decentralizedexchange.deployed();
    console.log(`DecentralizedExchange deployed to: ${decentralizedexchange.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });