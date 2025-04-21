// Add this to your existing backend code
const auth = require('./middleware/auth'); // You'll need to create this middleware

// Protected user data endpoint
app.get('/api/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// auth middleware (create middleware/auth.js)
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token') || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};