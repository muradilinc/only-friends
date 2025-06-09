import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import userRouter from './routes/user';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.use('/auth', userRouter);

// app.post('/send-push', async (req, res, next) => {
//     const {token, title, body} = req.body;
//     console.log(token);
//
//     setTimeout(async () => {
//         try {
//             const response = await fetch('https://exp.host/--/api/v2/push/send', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'Accept-Encoding': 'gzip, deflate',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     to: token,
//                     title: title || 'Default Title',
//                     body: body || 'Default Body',
//                     sound: 'default',
//                 }),
//             });
//
//             const data = await response.json();
//             console.log('📤 Ответ от Expo:', data);
//             res.status(200).json({success: true, expoResponse: data});
//         } catch (error) {
//             console.error('❌ Ошибка отправки:', error);
//             res.status(500).json({success: false, error: 'Ошибка отправки'});
//             next(error);
//         }
//     }, 10000);
// })

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log('connecting port: ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
    console.log('disconnected');
  });
};

void run();
