document.addEventListener('DOMContentLoaded', event => {
  const peer = new Peer('receiver', {
    host: 'localhost',
    port: 9000,
    path: '/'
  })

  let localStream = null
  const startChat = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true
    })

    document.querySelector('video#local').srcObject = localStream
  }

  startChat()

  peer.on('call', call => {
    call.answer(localStream)

    call.on('stream', remoteStream => {
      document.querySelector('video#remote').srcObject = remoteStream
    })
  })
})
