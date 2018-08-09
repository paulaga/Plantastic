const ensureLoggedIn = () => {
  return (req, res, next) => {
      if(req.user){
          next();
      } else {
          console.log("fuckyou")
      }
  }
}

const ensureLoggedOut = () => {
  return (req, res, next) => {
      if(!req.user){
          next();
      }
  }
}

module.exports = { ensureLoggedIn, ensureLoggedOut }