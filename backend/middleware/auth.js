let auth = (req, res, next) => {
    let condition=0
    if(condition){
        return res.json({
            isAuth: false,
            error: true
          });
    }
    next();
};

module.exports = { auth };
