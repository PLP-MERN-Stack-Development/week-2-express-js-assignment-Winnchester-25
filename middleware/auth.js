const auth = (req, res, next) => {
    const apikey = req.headers['x-api-key'];

    if (!apikey || apikey !== 'your-secret-api-key') {
        return res.status(401).json({ error: 'Unauthorized - Invalid API Key '});
    }
    
    next();

    };


module.exports = auth

