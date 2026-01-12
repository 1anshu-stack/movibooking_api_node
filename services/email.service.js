import axios from 'axios'
import User from '../models/user.model.js';

const sendMail = async (subject, id, content) => {
  // Fire & forget notification (do NOT block booking)
  const user = await User.findById(id)
  axios
    .post(process.env.NOTI_SERVICE + '/notiservice/api/v1/notifications', {
      subject: 'Your booking is successful',
      recepientEmails: [user.email],
      content: content
    })
    .catch((err) => {
      console.log('Notification failed:', err.message);
    });
};

export default sendMail;
