const axios = require('axios');
const config = require('./server-config.json');

module.exports.validateWebView = async (req, res) => {
    try {
        console.log('Got body:', req.body);
        console.log('Got client id:', req.headers['client-id']);
        console.log('Got client secret:', req.headers['client-secret']);
        if (await validateToken(req.body.token)) {
            return axios.get(
                `${config.urls.api}api/v5/patients/${req.body.accountId}`,
                {
                    headers: {
                        Authorization: `Bearer ${req.body.token}`,
                    },
                },
            ).then((accountResponse) => {
                console.log('Got account data :', accountResponse.data);
                let now = new Date();
                now.setTime(now.getTime() + (5 * 60 * 1000));
                const cookieAttributes = {
                    secure: true,
                    httpOnly: true,
                    expires: now,
                }
                res.cookie('token', req.body.token, cookieAttributes);
                res.cookie('patientId', accountResponse.data.id, cookieAttributes);
                res.cookie('preferredLang', accountResponse.data.preferredLanguage, cookieAttributes);
                res.cookie('benefitsBalance', req.body.benefitsBalance, cookieAttributes);
                res.sendFile(__dirname + '/dist/hsbclifehk/index.html');
            }).catch((accountError) => {
                console.log('Got account verify error:', accountError.response.data);
                res.status(accountError.response.status).send(accountError.response.data);
            });
        } else {
            res.status(400).json({
                errormessage: `Invalid Token`,
            });
        }
    } catch (e) {
        res.status(500).json({
            errormessage: `[Server API Validate Web View - Error:] ${e} `,
        });
    }
};

module.exports.mockWebApp = async (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
}

module.exports.testWebView = async (req, res) => {
    try {
        console.log('Got params:', req.params);
        if (await validateToken(req.params.token)) {
            return axios.get(
                `${config.urls.api}api/v5/patients/${req.params.accountId}`,
                {
                    headers: {
                        Authorization: `Bearer ${req.params.token}`,
                    },
                },
            ).then((accountResponse) => {
                console.log('Got account data :', accountResponse.data);
                res.cookie('token', req.params.token);
                res.cookie('patientId', accountResponse.data.id);
                res.cookie('preferredLang', accountResponse.data.preferredLanguage);
                res.cookie('benefitsBalance', req.params.benefitsBalance);
                res.sendFile(__dirname + '/dist/hsbclifehk/index.html');
            }).catch((accountError) => {
                console.log('Got account verify error:', accountError.response.data);
                res.status(accountError.response.status).send(accountError.response.data);
            });
        } else {
            res.status(400).json({
                errormessage: `Invalid Token`,
            });
        }
    } catch (e) {
        res.status(500).json({
            errormessage: `[Server API Validate Web View - Error:] ${e} `,
        });
    }
};

validateToken = async (token) => {
    return axios.get(
        `${config.urls.api}api/v2/token/validate`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    ).then(() => {
        return true;
    }).catch((tokenValidateError) => {
        console.log('Got validate token error:', tokenValidateError.response.data);
        return false;
    });
}

