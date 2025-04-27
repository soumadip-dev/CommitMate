// IMPORTING MODULES
import { ConnectionRequest } from '../models/connectionRequest.models.js';
import { User } from '../models/user.models.js';
// CONTROLLER FOR GETTING ALL PENDING CONNECTION REQUESTS
const getAllConnectionRequestsController = async (req, res) => {
  try {
    // Middleware has added user to req
    const loggedInUser = req.user;

    // Getting all connection request from the database
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: 'like',
    }).populate(
      'fromUserId',
      'firstName lastName photoUrl age gender about skills',
    );
    // Sending the response back to the client
    res.status(200).json({
      message:
        'Connection requests retrieved successfully of ' +
        loggedInUser.firstName,
      data: connectionRequests,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Error fetching connection requests: ${error.message}` });
  }
};

// CONTROLLER FOR GETTING ALL ESTABLISHED CONNECTIONS
const getAllEstablishedConnectionsController = async (req, res) => {
  try {
    // Middleware has added user to req
    const loggedInUser = req.user;

    // Fetching all established connections (status: 'match') where user is either sender or receiver
    const establishedConnections = await ConnectionRequest.find({
      status: 'match',
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).populate([
      {
        path: 'fromUserId',
        select: 'firstName lastName photoUrl age gender about skills',
      },
      {
        path: 'toUserId',
        select: 'firstName lastName photoUrl age gender about skills',
      },
    ]);

    // Extracting the 'other' user from each connection
    const data = establishedConnections.map((conn) =>
      conn.fromUserId._id.equals(loggedInUser._id)
        ? conn.toUserId
        : conn.fromUserId,
    );

    // Sending the response back to the client
    res.status(200).json({
      message: `Established connections retrieved successfully for ${loggedInUser.firstName}`,
      data,
    });
  } catch (error) {
    res.status(400).json({
      error: `Error fetching established connections: ${error.message}`,
    });
  }
};

// CONTROLLER FOR GETTING USER FEED
const getFeedController = async (req, res) => {
  try {
    // Middleware has added user to req
    const loggedInUser = req.user;

    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // Find all connections involving the logged-in user
    const userConnections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select('fromUserId toUserId');

    // Store IDs of users the logged-in user is already connected with
    const connectedUserIds = new Set();

    userConnections.forEach((connection) => {
      connectedUserIds.add(connection.fromUserId.toString());
      connectedUserIds.add(connection.toUserId.toString());
    });

    // Find users who are not already connected and not the logged-in user
    const suggestedUsers = await User.find({
      $and: [
        { _id: { $nin: Array.from(connectedUserIds) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select('firstName lastName photoUrl age gender about skills')
      .skip(skip)
      .limit(limit);

    // Send the suggested users as the feed
    res.status(200).json({
      message: `User feed retrieved successfully for ${loggedInUser.firstName}`,
      data: suggestedUsers,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: `Error fetching user feed: ${error.message}` });
  }
};

// EXPORTING CONTROLLERS
export {
  getAllConnectionRequestsController,
  getAllEstablishedConnectionsController,
  getFeedController,
};
