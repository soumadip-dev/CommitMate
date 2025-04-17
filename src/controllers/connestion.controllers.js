// IMPORTING MODULES
import { ConnectionRequest } from '../models/connectionRequest.models.js';
import { User } from '../models/user.models.js';

// CONTROLLER FOR SENDING A CONNECTION REQUEST
const sendConnectionController = async (req, res) => {
  try {
    // Extracting sender and receiver user IDs and status
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    // Only 'like' or 'pass' are valid statuses
    const allowedStatuses = ['like', 'pass'];
    if (!allowedStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    // Check if the toUser is an valid user or not
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      throw new Error('User not found');
    }

    // Check if toUser and fromUser are not the same
    if (fromUserId.equals(toUserId)) {
      throw new Error('Cannot send connection request to yourself');
    }

    // Check if the same connection request already exists
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingRequest) {
      throw new Error('Connection request already exists');
    }

    // Create a new connection request
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    // Save the connection request to the database
    const data = await connectionRequest.save();

    // Return success response
    res.status(200).json({
      message: 'Connection request sent successfully',
      data,
    });
  } catch (err) {
    res.status(400).send('Something went wrong: ' + err.message);
  }
};

// CONTROLLER FOR REVIEWING A CONNECTION REQUEST
const reviewConnectionController = async (req, res) => {
  try {
  } catch (err) {
    res.status(400).send('Something went wrong: ' + err.message);
  }
};

// EXPORTING CONTROLLERS
export { reviewConnectionController, sendConnectionController };
