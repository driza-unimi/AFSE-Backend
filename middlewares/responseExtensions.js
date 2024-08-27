function responseMiddleware(req, res, next) {
    res.success = (message = 'Success', data = {}, statusCode = 200) => {
        res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    res.badRequest = (message = 'Bad Request', errors = []) => {
        res.status(400).json({
            success: false,
            message,
            errors
        });
    }


    res.unauthorized = (message = 'Unauthorized access') => {
        res.status(401).json({
            success: false,
            message
        });
    }

    res.forbidden = (message = 'Forbidden access') => {
        res.status(403).json({
            success: false,
            message
        });
    }

    res.notFound = (message = 'Not Found') => {
        res.status(404).json({
            success: false,
            message
        });
    }

    res.serverError = (message = 'Something went wrong, please try again later') => {
        res.status(500).json({
            success: false,
            message
        });
    }

    next();
}

module.exports = responseMiddleware;
