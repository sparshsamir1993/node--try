const mongoose =require('mongoose');
const requireLogin =require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyEmail");

const Survey = mongoose.model('surveys'); 
module.exports = (app) =>{
    app.post("/api/surveys", requireLogin, requireCredits,(req, res)=>{
          const { title, body, title, recipients } = req.body;

          const survey = new Survey({
              title,
              subject,
              body,
              recipients: recipients.split(",").map(email =>({email: email.trim() })),
              _user: req.user.id,
              dateSent: Date.now()            
          });

          //sending mail

          const mailer = new Mailer(survey, surveyTemplate(survey));
    });
}
