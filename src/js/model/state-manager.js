class StateManager {
    #selectedSymbol = undefined
    delegate = undefined

    setSymbol(symbol) {
        this.#selectedSymbol = symbol
        
        if (this.delegate) {
            this.delegate()
        }
    }

    getSymbol() {
        return this.#selectedSymbol
    }
}

export default new StateManager()