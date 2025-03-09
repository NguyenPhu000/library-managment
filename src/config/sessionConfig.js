import session from "express-session";
import flash from "connect-flash";

const sessionConfig = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "library_secret_key",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000, //1h
      },
    })
  );
  app.use(flash());

  app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
  });
};

export default sessionConfig;
