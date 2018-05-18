const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require("../config/keys");


class Mailer extends helper.Mail {
    constructor({subject,recipients}, content){
        super();

        this.from_email = new helper.Email('no-replay@node.com');
        this.subject = subject;
        this.body = new helper.Contnet("text/html", content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
    }

    formatAddresses(recipients){
        return recipients.map(({email})=>{
            return new helper.Email(email);
        })
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
    }

}

module.exports = Mailer;