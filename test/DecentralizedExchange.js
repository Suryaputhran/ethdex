const {ethers} = require("hardhat");
const {expect} = require("chai");
const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
}
describe("Decentralized Exchange", () => {

    let deployer, feeAccount, decentralizedexchange, token1, token2, user1, user2, accounts

    const feePercent = 10

    beforeEach(async () => {
        const DecentralizedExchange = await ethers.getContractFactory("DecentralizedExchange")
        const Token = await ethers.getContractFactory("Token")

        token1 = await Token.deploy("Finix", "FNX", 18, "1000000")
        token2 = await Token.deploy("Auriga", "AUG", 18, "1000000")

        accounts = await ethers.getSigners()
        deployer = accounts[0]
        feeAccount = accounts[1]
        user1 = accounts[2]
        user2 = accounts[3]

        let transaction = await token1.connect(deployer).transfer(user1.address, tokens(100))
        await transaction.wait()

        decentralizedexchange = await DecentralizedExchange.deploy(feeAccount.address, feePercent)
    })

    describe("Deployment", () => {

        it("Tracks the fee account.", async () => {
            expect(await decentralizedexchange.feeAccount()).to.equal(feeAccount.address)
        })

        it("Tracks the fee percent.", async () => {
            expect(await decentralizedexchange.feePercent()).to.equal(feePercent)
        })

    })

    describe("Depositing Tokens", () => {

        let transaction, result
        let amount = tokens(10)

        describe("Success", () => {

            beforeEach(async () => {
                //Approve Tokens
                transaction = await token1.connect(user1).approve(decentralizedexchange.address, amount)
                result = await transaction.wait()
                //Deposit Tokens
                transaction = await decentralizedexchange.connect(user1).depositToken(token1.address, amount)
                result = await transaction.wait()
            })

            it("Tracks the token deposit.", async () => {
                expect(await token1.balanceOf(decentralizedexchange.address)).to.equal(amount)
                expect(await decentralizedexchange.tokens(token1.address, user1.address)).to.equal(amount)

            })

            it("Emits a Deposit event.", async () => {
                const event = result.events[1] // because more than one event are emitted.
                expect(event.event).to.equal("Deposit")

                const args = event.args
                expect(args.token).to.equal(token1.address)
                expect(args.user).to.equal(user1.address)
                expect(args.amount).to.equal(amount)
                expect(args.balance).to.equal(amount)
            })
        })

        describe("Failure", () => {
            it("Fails when no tokens are approved.", async () => {
                // Don't approve any tokens before depositing
                await expect(decentralizedexchange.connect(user1).depositToken(token1.address, amount)).to.be.reverted
            })
        })
    })

    describe("Withdrawing Tokens", () => {

        let transaction, result
        let amount = tokens(10)

        describe("Success", () => {

            beforeEach(async () => {
                //Approve Tokens
                transaction = await token1.connect(user1).approve(decentralizedexchange.address, amount)
                result = await transaction.wait()
                //Deposit Tokens
                transaction = await decentralizedexchange.connect(user1).depositToken(token1.address, amount)
                result = await transaction.wait()
                //Withdraw Tokens
                transaction = await decentralizedexchange.connect(user1).withdrawToken(token1.address, amount)
                result = await transaction.wait()
            })

            it("Withdraws token funds.", async () => {
                expect(await token1.balanceOf(decentralizedexchange.address)).to.equal(0)
                expect(await decentralizedexchange.tokens(token1.address, user1.address)).to.equal(0)
                expect(await decentralizedexchange.balanceOf(token1.address, user1.address)).to.equal(0)

            })

            it("Emits a Withdraw event.", async () => {
                const event = result.events[1] // because more than one event are emitted.
                expect(event.event).to.equal("Withdraw")

                const args = event.args
                expect(args.token).to.equal(token1.address)
                expect(args.user).to.equal(user1.address)
                expect(args.amount).to.equal(amount)
                expect(args.balance).to.equal(0)
            })
        })

        describe("Failure", () => {
            it("Fails for insufficient funds.", async () => {
                // Don't approve any tokens before depositing
                await expect(decentralizedexchange.connect(user1).withdrawToken(token1.address, amount)).to.be.reverted
            })
        })
    })

    describe("Checking Balances", () => {

        let transaction, result
        let amount = tokens(10)

        beforeEach(async () => {
            //Approve Tokens
            transaction = await token1.connect(user1).approve(decentralizedexchange.address, amount)
            result = await transaction.wait()
            //Deposit Tokens
            transaction = await decentralizedexchange.connect(user1).depositToken(token1.address, amount)
            result = await transaction.wait()
        })

        it("Returns user balance.", async () => {
            expect(await decentralizedexchange.balanceOf(token1.address, user1.address)).to.equal(amount)

        })
    })

    describe("Making orders.", () => {
        let transaction, result
        let amount = tokens(1)
        describe("Success", () => {

            beforeEach(async () => {
                transaction = await token1.connect(user1).approve(decentralizedexchange.address, amount)
                result = await transaction.wait()
                //Deposit Tokens
                transaction = await decentralizedexchange.connect(user1).depositToken(token1.address, amount)
                result = await transaction.wait()
                //Make an order
                transaction = await decentralizedexchange.connect(user1).makeOrder(token2.address, amount, token1.address, tokens(1))
                result = await transaction.wait()
            })

            it("Tracks the newly created order", async () => {
                expect(await decentralizedexchange.orderCount()).to.equal(1)
            })

            it("Emits an Order event", async () => {
                const event = result.events[0]
                expect(event.event).to.equal("Order")

                const args = event.args
                expect(args.id).to.equal(1)
                expect(args.user).to.equal(user1.address)
                expect(args.tokenGet).to.equal(token2.address)
                expect(args.amountGet).to.equal(tokens(1))
                expect(args.tokenGive).to.equal(token1.address)
                expect(args.amountGive).to.equal(tokens(1))
                expect(args.timestamp).to.at.least(1)
            })
        })

        describe("Failure", async () => {
            it("Rejects with no balance", async () => {
                await expect(decentralizedexchange.connect(user1).makeOrder(token2.address, tokens(1), token1.address, tokens(1))).to.be.reverted
            })
        })
    })

    describe("Order Actions", () => {

        let transaction, result
        let amount = tokens(1)

        beforeEach(async () => {

            transaction = await token1.connect(user1).approve(decentralizedexchange.address, amount)
            result = await transaction.wait()

            //Deposit Tokens
            transaction = await decentralizedexchange.connect(user1).depositToken(token1.address, amount)
            result = await transaction.wait()
            //Make an order

            transaction = await token2.connect(deployer).transfer(user2.address, tokens(100))
            result = await transaction.wait()

            transaction = await token2.connect(user2).approve(decentralizedexchange.address, tokens(2))
            result = await transaction.wait()

            transaction = await decentralizedexchange.connect(user2).depositToken(token2.address, tokens(2))
            result = await transaction.wait()

            transaction = await decentralizedexchange.connect(user1).makeOrder(token2.address, amount, token1.address, amount)
            result = await transaction.wait()

        })

        describe("Cancelling Orders", () => {

            describe("Success", () => {

                beforeEach(async () => {
                    transaction = await decentralizedexchange.connect(user1).cancelOrder(1)
                    result = await transaction.wait()
                })

                it("Updates cancelled orders.", async () => {
                    expect(await decentralizedexchange.orderCancelled(1)).to.equal(true)
                })

                it("Emits a cancel event.", async () => {
                    const event = result.events[0]
                    expect(event.event).to.equal("Cancel")

                    const args = event.args
                    expect(args.id).to.equal(1)
                    expect(args.user).to.equal(user1.address)
                    expect(args.tokenGet).to.equal(token2.address)
                    expect(args.amountGet).to.equal(tokens(1))
                    expect(args.tokenGive).to.equal(token1.address)
                    expect(args.amountGive).to.equal(tokens(1))
                    expect(args.timestamp).to.at.least(1)
                })

            })

            describe("Failure", () => {

                beforeEach(async () => {

                    transaction = await token1.connect(user1).approve(decentralizedexchange.address, amount)
                    result = await transaction.wait()

                    transaction = await decentralizedexchange.connect(user1).depositToken(token1.address, amount)
                    result = await transaction.wait()

                    transaction = await decentralizedexchange.connect(user1).makeOrder(token2.address, amount, token1.address, amount)
                    result = await transaction.wait()
                })

                it("Rejects invalid order ID.", async () => {
                    const invalidOrderId = 99999
                    await expect(decentralizedexchange.connect(user1).cancelOrder(invalidOrderId)).to.be.reverted
                })

                it("Rejects unauthorized cancels.", async () => {
                    await expect(decentralizedexchange.connect(user2).cancelOrder(1)).to.be.reverted
                })
            })
        })

        describe("Filling Orders", () => {

            describe("Success", () => {

                beforeEach(async () => {
                    transaction = await decentralizedexchange.connect(user2).fillOrder("1")
                    result = await transaction.wait()
                })

                it("Executes the trade and charge fees.", async () => {
                    expect(await decentralizedexchange.balanceOf(token1.address, user1.address)).to.equal(tokens(0))
                    expect(await decentralizedexchange.balanceOf(token1.address, user2.address)).to.equal(tokens(1))
                    expect(await decentralizedexchange.balanceOf(token1.address, feeAccount.address)).to.equal(tokens(0))

                    expect(await decentralizedexchange.balanceOf(token2.address, user1.address)).to.equal(tokens(1))
                    expect(await decentralizedexchange.balanceOf(token2.address, user2.address)).to.equal(tokens(0.9))
                    expect(await decentralizedexchange.balanceOf(token2.address, feeAccount.address)).to.equal(tokens(0.1))
                })

                it("Updates filled orders.", async () => {
                    expect(await decentralizedexchange.orderFilled(1)).to.equal(true)
                })

                it("Emits a Trade event.", async () => {
                    const event = result.events[0]
                    expect(event.event).to.equal("Trade")

                    const args = event.args
                    expect(args.id).to.equal(1)
                    expect(args.user).to.equal(user2.address)
                    expect(args.tokenGet).to.equal(token2.address)
                    expect(args.amountGet).to.equal(tokens(1))
                    expect(args.tokenGive).to.equal(token1.address)
                    expect(args.amountGive).to.equal(tokens(1))
                    expect(args.creator).to.equal(user1.address)
                    expect(args.timestamp).to.at.least(1)
                })
            })

            describe("Failure", () => {

                it("Rejects invalid Order IDs", async () => {
                    const invalidOrderId = 99999
                    await expect(decentralizedexchange.connect(user2).fillOrder(invalidOrderId)).to.be.reverted
                })

                it("Rejects already filled Orders.", async () => {
                    transaction = await decentralizedexchange.connect(user2).fillOrder("1")
                    result = await transaction.wait()

                    await expect(decentralizedexchange.connect(user2).fillOrder(1)).to.be.reverted
                })

                it("Rejects Cancelled Orders.", async () => {
                    transaction = await decentralizedexchange.connect(user1).cancelOrder(1)
                    result = await transaction.wait()

                    await expect(decentralizedexchange.connect(user2).fillOrder(1)).to.be.reverted
                })
            })

        })
    })
})