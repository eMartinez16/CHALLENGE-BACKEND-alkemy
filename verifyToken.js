const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log({ authHeader });

    if (typeof authHeader !== 'undefined') {
        try {
            const token = authHeader.split(' ')[1];

            req.token = token;

            next();
        } catch (err) {
            res.sendStatus(403);
        }
    } else {
        res.status(404).json('Token must be provided');
    }
};

module.exports = verifyToken;