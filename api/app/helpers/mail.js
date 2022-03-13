const _ = require('lodash');
const fs = require('fs');
const nodemailer = require('nodemailer');

const { logger } = require('./logger');

const moduleLogger = logger.child({ module: 'mail' });

class Mail {
  constructor() {
    this.transportConfig = {
      host: process.env.SCHWARM_SMTP_HOST,
      port: process.env.SCHWARM_SMTP_PORT
      // secure: process.env.SMTP_SECURE === 'true'
    };

    if (process.env.SCHWARM_MTP_SECURE === 'true') {
      this.transportConfig.auth = {
        user: process.env.SCHWARM_SMTP_AUTH_USER,
        pass: process.env.SCHWARM_SMTP_AUTH_PASS
      };
    }

    if (process.env.SCHWARM_SMTP_DEBUG === 'true') {
      this.transportConfig.debug = true;
    }
    if (process.env.SCHWARM_SMTP_LOGGER === 'true') {
      this.transportConfig.logger = true;
    }

    this.transporter = nodemailer.createTransport(this.transportConfig);

    this.transporter.verify((error, success) => {
      if (error) {
        moduleLogger.error("Couldn't verify Mailserver ", error);
      } else {
        moduleLogger.info('Mailserver is ready to take our messages', success);
      }
    });
    moduleLogger.debug({ transportConfig: this.transportConfig }, 'mail class initialized');
  }

  static replaceTemplateValues(content, templateValues) {
    let convertedContent = content;
    _.forEach(templateValues, (value, key) => {
      convertedContent = _.replace(convertedContent, new RegExp(`{${key}}`, 'g'), value);
    });
    return convertedContent;
  }

  async sendEmail({ from, to, subject, templatePath, templateValues } = {}) {
    moduleLogger.debug({ from, to, subject, templatePath, templateValues }, 'sendEmail triggered');

    fs.readFile(templatePath, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        this.moduleLogger.error(err, 'Error occurred while reading template file');
        // should not throw error because it will crash the app
        return;
      }

      const renderedHtml = Mail.replaceTemplateValues(html, templateValues);
      moduleLogger.debug({ renderedHtml }, 'HTML file loaded for email, send now');
      const sendData = {
        from: from || `"${process.env.SCHWARM_EMAIL_FROM_NAME}" <${process.env.SCHWARM_EMAIL_FROM_ADDRESS}>`,
        to,
        subject,
        html: renderedHtml
      };

      this.transporter
        .sendMail(sendData)
        .then(data => {
          moduleLogger.debug(data);
        })
        .catch(e => {
          moduleLogger.error(e);
        });
    });
  }

  async sendVerificationEmail(to, name, verficationToken) {
    // Send email to user with confirmation URL
    await this.sendEmail({
      to,
      subject: 'Email verification',
      templatePath: 'app/emailtemplates/register-confirm.html',
      templateValues: {
        first_name: name,
        verification_link: `${process.env.SCHWARM_FRONTEND_URL}/register-confirm?key=${verficationToken}`
      }
    })
      .then(success => {
        moduleLogger.debug(success);
      })
      .catch(e => {
        moduleLogger.error(e);
      });
  }
}

module.exports = new Mail();
