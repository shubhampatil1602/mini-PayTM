import { z } from 'zod';
import { Account } from '../models/account.model.js';
import mongoose from 'mongoose';

const transferBalanceSchema = z.object({
  to: z.string(),
  amount: z.number(),
});

const transferBalance = async (req, res) => {
  const { success } = transferBalanceSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      msg: 'Error while transfering balance',
    });
  }

  const session = await mongoose.startSession();

  session.startTransaction();
  const { to, amount } = req.body;

  try {
    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      res.status(400).json({
        msg: 'Insufficient balance',
      });
    }

    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      res.status(400).json({
        msg: 'Invalid Account.',
      });
    }

    await Account.updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    await session.commitTransaction();

    res.status(200).json({
      msg: 'Transfered successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error while transfering balance',
    });
  }
};

export default transferBalance;
