const mongodb = require('../db/connect');

const getData = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('Profile').collection('MyProfile').find();
    const data = await result.toArray();
    res.status(200).json(data[0]); // just return JSON
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile data' });
  }
};

module.exports = { getData };
