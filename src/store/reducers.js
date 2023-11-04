export const provider = (state = {}, action) => {
    switch (action.type) {
        case "PROVIDER_LOADED":
            return {
                ...state, connection: action.connection
            }
        case "NETWORK_LOADED":
            return {
                ...state, chainId: action.chainId
            }
        case "ACCOUNT_LOADED":
            return {
                ...state, account: action.account
            }
        case "ETHER_BALANCE_LOADED":
            return {
                ...state, balance: action.balance
            }
        default:
            return state
    }
}

const DEFAULT_TOKENS_STATE = {
    loaded: false, contracts: [], symbols: []
}

export const tokens = (state = DEFAULT_TOKENS_STATE, action) => {
    switch (action.type) {
        case "TOKEN_1_LOADED":
            return {
                ...state, loaded: true, contracts: [action.token], symbols: [action.symbol]
            }
        case "TOKEN_1_BALANCE_LOADED":
            return {
                ...state, balances: [action.balance]
            }
        case "TOKEN_2_LOADED":
            return {
                ...state,
                loaded: true,
                contracts: [...state.contracts, action.token],
                symbols: [...state.symbols, action.symbol]
            }
        case "TOKEN_2_BALANCE_LOADED":
            return {
                ...state, balances: [...state.balances, action.balance]
            }
        default:
            return state
    }
}

const DEFAULT_DEX_STATE = {
    loaded: false, contract: {}, transaction: {
        isSuccessful: false
    }, allOrders: {
        loaded: false, data: []
    }, cancelledOrders: {
        data: []
    },filledOrders: {
        data: []
    },
    events: []
}

export const decentralizedexchange = (state = DEFAULT_DEX_STATE, action) => {
    let index, data

    switch (action.type) {
        case "DEX_LOADED":
            return {
                ...state, loaded: true, contract: action.decentralizedexchange
            }
        // BALANCE CASES
        case "DEX_TOKEN_1_BALANCE_LOADED":
            return {
                ...state, balances: [action.balance]
            }
        case "DEX_TOKEN_2_BALANCE_LOADED":
            return {
                ...state, balances: [...state.balances, action.balance]
            }

        //ORDERS LOADED (CANCELLED, FILLED & ALL)
        case "CANCELLED_ORDERS_LOADED":
            return {
                ...state, cancelledOrders: {
                    loaded: true, data: action.cancelledOrders
                }
            }
        case "FILLED_ORDERS_LOADED":
            return {
                ...state, filledOrders: {
                    loaded: true, data: action.filledOrders
                }
            }
        case "ALL_ORDERS_LOADED":
            return {
                ...state, allOrders: {
                    loaded: true, data: action.allOrders
                }
            }

        // CANCELLING ORDERS
        case "ORDER_CANCELLATION_REQUESTED":
            return {
                ...state,
                transaction: {
                    transactionType: "Cancel",
                    isPending: true,
                    isSuccessful: false
                }
            }

        case "ORDER_CANCELLATION_SUCCESSFUL":
            return {
                ...state,
                transaction: {
                    transactionType: "Cancel",
                    isPending: false,
                    isSuccessful: true
                },
                cancelledOrders: {
                    ...state.cancelledOrders,
                    data: [
                        ...state.cancelledOrders.data,
                        action.order
                    ]
                },
                events: [action.event, ...state.events]
            }

        case "ORDER_CANCELLATION_FAILED":
            return {
                ...state,
                transaction: {
                    transactionType: "Cancel",
                    isPending: false,
                    isSuccessful: false,
                    isError: true
                }
            }

        // FILLING ORDERS
        case "FILL_ORDER_REQUESTED":
            return {
                ...state,
                transaction: {
                    transactionType: "Fill Order",
                    isPending: true,
                    isSuccessful: false
                }
            }
        case "FILL_ORDER_SUCCESSFUL":
            // Prevent duplicate orders
            index = state.filledOrders.data.findIndex(order => order.id.toString() === action.order.id.toString())

            if (index === -1) {
                data = [...state.filledOrders.data, action.order]
            } else {
                data = state.filledOrders.data
            }

            return {
                ...state,
                transaction: {
                    transactionType: "Fill Order",
                    isPending: false,
                    isSuccessful: true
                },
                filledOrders: {
                    ...state.filledOrders,
                    data
                },
                events: [action.event, ...state.events]
            }
        case "FILL_ORDER_FAILED":
            return {
                ...state,
                transaction: {
                    transactionType: "Fill Order",
                    isPending: false,
                    isSuccessful: false,
                    isError: true
                }
            }

        // TRANSFER CASES (DEPOSIT & WITHDRAWS)
        case "TRANSFER_REQUESTED":
            return {
                ...state, transaction: {
                    transactionType: "Transfer", isPending: true, isSuccessful: false
                }, transferInProgress: true
            }
        case "TRANSFER_SUCCESSFUL":
            return {
                ...state, transaction: {
                    transactionType: "Transfer", isPending: false, isSuccessful: true
                }, transferInProgress: false, events: [action.event, ...state.events]
            }
        case "TRANSFER_FAILED":
            return {
                ...state, transaction: {
                    transactionType: "Transfer", isPending: false, isSuccessful: false, isError: true

                }, transferInProgress: false
            }
        // MAKING ORDERS CASES
        case "NEW_ORDER_REQUESTED":
            return {
                ...state, transaction: {
                    transactionType: "New Order", isPending: true, isSuccessful: false
                },
            }
        case "NEW_ORDER_SUCCESSFUL":
            // Prevents duplicate orders
            index = state.allOrders.data.findIndex(order => order.id.toString() === action.order.id.toString())

            if (index === -1) {
                data = [...state.allOrders.data, action.order]
            } else {
                data = state.allOrders.data
            }

            return {
                ...state, allOrders: {
                    ...state.allOrders, data
                }, transaction: {
                    transactionType: "New Order", isPending: false, isSuccessful: true
                }, events: [action.event, ...state.events]
            }
        case "NEW_ORDER_FAILED":
            return {
                ...state, transaction: {
                    transactionType: "New Order", isPending: false, isSuccessful: false, isError: true
                },
            }
        default:
            return state
    }
}