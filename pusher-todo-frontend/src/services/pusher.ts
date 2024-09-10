import Pusher from "pusher-js";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY as string, {
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER as string,
});

export default pusher;
