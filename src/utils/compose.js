// Compose converts the function parameters to a list of functions,
// then applies a reduce operation, applying the next function's corresponding arguments.
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

export default compose;