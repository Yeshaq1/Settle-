const nodemailer = require('nodemailer');
const path = require('path');
const isProd = process.env.NODE_ENV === 'prod';

module.exports = {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
        session: false
    },
    PAGINATION_PERPAGE: 10,
    android_serverKey: 'AAAA--U1itk:APA91bHrb92x3pImrnrbEungvULxPJhYLxagXWEs2m-6YpuJacjSrgwqhlTgii-Q-2em6KGfDRdg253cuzy7L7SUqnCNuVwUDY_AQUb707GS1-Pq7HsjDUM-EW5BM6_DsIcZcDdk6hWc',
    ios_key: path.join(__dirname, '/key_file/AuthKey_7XGMBSUZ7H.p8'),
    ios_keyId: '7XGMBSUZ7H',
    ios_teamId: 'H23W3EERLK',
    isProd,
    getPort: process.env.PORT || 1415,
    getAdminFolderName: process.env.ADMIN_FOLDER_NAME || 'admin',
    getApiFolderName: process.env.API_FOLDER_NAME || 'api',
    FRONT_URL:'http://104.211.229.156/elephant-trunk/#/',
    nonSecurePaths: [],
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        }
    }),
}