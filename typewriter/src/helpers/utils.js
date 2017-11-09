const tryAsJson = (thing) => {
    try {
      let result = JSON.parse(thing)
        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (result && typeof result === 'object') {
          return result
        }
    }
    catch (e) { }

    return thing
}

export {
  tryAsJson,
}

export default {
  tryAsJson,
}
