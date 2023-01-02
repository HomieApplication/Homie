import { auth } from "../firebase/config.js";

export async function decodeIdToken(req, res, next) {
    if (req.headers?.authorization?.startsWith("Bearer ")) {
        const idToken = req.headers.authorization.split("Bearer ")[1];
        try {
            const decodedToken = await auth.verifyIdToken(idToken);
            req["currentUser"] = decodedToken;
            next();
        } catch (error) {
            res.status(403).send({
                message: error.message,
            });
        }
    } else {
        res.status(403).send({
            message: "Invalid token",
        });
    }
}
