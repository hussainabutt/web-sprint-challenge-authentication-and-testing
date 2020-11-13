const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../api/DB-Model')
router.post('/register', async (req, res) => {
  // implement registration
  try{
    const {username, password} = req.body
    const hash =bcrypt.hashSync(password,10)
    const user = {username, password:hash}
    const addedUser = await Users.add(user)
    res.json(addedUser)
  }
  catch(err){
    res.status(500).json({ message:err.message})
  }
});

router.post('/login', async (req, res) => {
  // implement login
  try{
    const [user] = await Users.findBy({username:req.body.username})
    if( user && bcrypt.compareSync(req.body.password, user.password)){
      req.session.user = user;
      res.json({ message: `welcome back ${user.username}, you jokester!`})
    } else {
      res.status(401).json({message:'bad credentials'})
    }
  } catch (err){
    res.status(500).json({message: err.message})
  }
});

module.exports = router;
