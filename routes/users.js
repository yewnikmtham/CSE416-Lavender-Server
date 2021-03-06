const express = require("express");
const router = express.Router();
const { Users, Points } = require("../models");


router.get("/", async (req, res) => {
  //res.send('GET All Users');
  const limit = req.params ? req.params.limit : 100;
  const listOfUsers = await Users.findAll({
    limit: limit,
    order: [['points', 'DESC']],
  });
  if (listOfUsers == null) {
    res.sendStatus(400);
    return;
  }
  res.json(listOfUsers);
});

router.post("/", async (req, res) => {
  res.send('POST User');
  //const user = req.body;
  //await Users.create(user);
  //res.json(user);
});

router.get('/:user_id', async (req, res) => {
  //res.send(`GET User by ID ${req.params.user_id}`);
  const user = await Users.findOne({ where: { user_id: req.params.user_id } })
    .catch(err => {
      console.log('Get User error: ', err);
      res.sendStatus(500);
    });
  if (user == null) {
    res.sendStatus(404);
    return;
  }
  const points = await user.getPoints({
    limit: 100,
    order: [['points', 'DESC']]
  });
  res.status(200).json({ user: user, points: points });
});

router.put('/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const updates = req.body.user_fields;

  const check = await Users.findOne({ 
    where: { 
      username: updates.username 
    } 
  }).catch(err => {
    console.log("Unique Name: ", err);
  });

  if (check === null) {
    await Users.update({ username: updates.username }, {
      where: {
        user_id: user_id
      }
    }).catch(err => {
      console.log('PUT user: ', err);
      res.sendStatus(404);
    })
    res.sendStatus(200);
  } else {
    res.sendStatus(409);
  }
})

module.exports = router;
