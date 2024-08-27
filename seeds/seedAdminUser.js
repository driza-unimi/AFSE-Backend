const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = async () => {
    try {
        const adminExists = await User.findOne({ username: 'admin' });
        if (adminExists) {
            console.log('Admin user already exists');
            return;
        }
        const hashedPassword = await bcrypt.hash('admin', 10);

        const adminUser = new User({
            username: 'admin',
            email: 'admin@afse.com',
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
}
