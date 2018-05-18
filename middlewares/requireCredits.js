module.exports = (req, res, next) => {
    if (req.user.credits && req.user.credits <=0) {
        return res.status(403).send({ error: "You dont have enough credits!" });
    }
    next();
};