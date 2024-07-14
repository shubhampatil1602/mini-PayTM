import { Account } from '../models/account.model.js';

const accountBalance = async (req, res) => {
  const userId = req.userId;
  try {
    const account = await Account.findOne({
      userId,
    });

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error while getting balance',
    });
  }
};

export default accountBalance;
