const globalErrorHandeler = (err, _req, res, next) => {
    if (res.headersSent) {
        next(err);
        return;
    }
    const stack = err instanceof Error ? err.stack : err;
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error(stack);
    res.status(500).json({
        success: false,
        message: message || "Internal Server Error",
    });
};
export default globalErrorHandeler;
//# sourceMappingURL=globalErrorHandeler.js.map