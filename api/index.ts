import express from 'express';

const app = express();
const port = 8000;

app.use(express.json());

app.post('/send-push', async (req, res, next) => {
    const {token, title, body} = req.body;
    console.log(token);

    setTimeout(async () => {
        try {
            const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-Encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: token,
                    title: title || 'Default Title',
                    body: body || 'Default Body',
                    sound: 'default',
                }),
            });

            const data = await response.json();
            console.log('📤 Ответ от Expo:', data);
            res.status(200).json({success: true, expoResponse: data});
        } catch (error) {
            console.error('❌ Ошибка отправки:', error);
            res.status(500).json({success: false, error: 'Ошибка отправки'});
            next(error);
        }
    }, 10000);
})

app.listen(port, () => {
    console.log('we r port is ' + port);
});
