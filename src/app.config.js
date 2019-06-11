function getEnv () {
  if (window.location.host.match(/local/)) {
    return 'http://localhost:5000'
  }
}
export default {
  'API_BASE_URL': getEnv()
}
