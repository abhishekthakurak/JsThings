
class PubSub {
  constructor (extraArgs) {
    this.events = {}
    this.extraArgs = extraArgs
  }

  publish (name, ...args) {
    const handlers = this.events[name]
    if (!handlers) {
      return
    }
    handlers.forEach(handler => {
      let handlerArguments = args
      if (typeof this.extraArgs !== 'undefined') {
        handlerArguments = handlerArguments.concat(this.extraArgs)
      }
      handler.apply(this, handlerArguments)
    })
  }

  subscribe (name, handler) {
    let handlers = this.events[name]
    if (!handlers) {
      handlers = this.events[name] = []
    }
    handlers.push(handler)
  }

  unsubscribe (name, handler) {
    const handlers = this.events[name]
    if (!handlers) {
      return
    }
    const handlerIdx = handlers.indexOf(handler)
    handlers.splice(handlerIdx, 1)
  }
}

const pubSub = new PubSub([{ extraFields: 'fields' }])

pubSub.subscribe('produce', data => {
  console.log('something is produced', data)
})

pubSub.subscribe('produce', data => {
  console.log('I am also looking for produced item', data)
})

pubSub.publish('produce', [{ item: 'car' }])

pubSub.unsubscribe('produce', data => {
  console.log('I am also looking for produced item', data)
})

pubSub.publish('produce', [{ item: 'bike' }])
