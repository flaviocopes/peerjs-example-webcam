const peer = new Peer('sender', { host: 'localhost', port: 9000, path: '/' })

/*
const conn = peer.connect('receiver')

conn.on('open', () => {
  conn.send('hi!')
})
*/

const startChat = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true
  })
  document.querySelector('video#local').srcObject = localStream
  const call = peer.call('receiver', localStream)

  call.on('stream', remoteStream => {
    document.querySelector('video#remote').srcObject = remoteStream
  })
}

startChat()
