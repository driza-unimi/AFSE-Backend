module.exports = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};


// module.exports = (callback) => {
//     return async (req, res, next) => {
//         try {
//             await callback(req, res, next);
//         } catch (err) {
//             next(err);
//         }
//     }
// }
