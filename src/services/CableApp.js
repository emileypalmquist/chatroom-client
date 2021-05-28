import actioncable from 'actioncable'

const CableApp = {}

// can add token as query param and authorize user in the ApplicationCable::Channel on server
CableApp.consumer = actioncable.createConsumer('ws://localhost:3000/api/v1/cable')

export default CableApp;