import nodemailer, { createTestAccount } from "nodemailer";
import { __prod__ } from "../constants";

// TODO: Rewrite email handling
export async function sendMail(to: string, subject: string, text: string) {
	let acc = await createTestAccount();
	let transporter = nodemailer.createTransport({
		host: __prod__ ? "smtp.zoho.eu" : acc.smtp.host,
		port: __prod__ ? 465 : acc.smtp.port,
		secure: __prod__,
		auth: {
			user: __prod__ ? process.env.NODEMAILER_EMAIL : acc.user,
			pass: __prod__ ? process.env.NODEMAILER_PASSWORD : acc.pass
		}
	});

	transporter.verify((err) => {
		if (err) {
			console.log(err);
		}
	});

	// @ts-ignore
	let info = await transporter.sendMail({
		from: "Filip at Kindie!<ivanusecfilip@zohomail.eu>",
		to: to,
		subject: subject,
		text,
		html: text
	});
}

export const VerifyEmailTemplate = (token: string): string => {
	return `
  <!doctype html>
  <html ⚡4email data-css-strict>
  
  <head>
      <meta charset="utf-8">
      <style amp4email-boilerplate>
          body {
              visibility: hidden
          }
      </style>
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <style amp-custom>
          .es-desk-hidden {
              display: none;
              float: left;
              overflow: hidden;
              width: 0;
              max-height: 0;
              line-height: 0;
          }
  
          s {
              text-decoration: line-through;
          }
  
          body {
              width: 100%;
              font-family: "Open Sans", sans-serif;
          }
  
          table {
              border-collapse: collapse;
              border-spacing: 0px;
          }
  
          table td,
          html,
          body,
          .es-wrapper {
              padding: 0;
              Margin: 0;
          }
  
          .es-content,
          .es-header,
          .es-footer {
              table-layout: fixed;
              width: 100%;
          }
  
          p,
          hr {
              Margin: 0;
          }
  
          h1,
          h2,
          h3,
          h4,
          h5 {
              Margin: 0;
              line-height: 120%;
              font-family: roboto, "helvetica neue", helvetica, arial, sans-serif;
          }
  
          .es-left {
              float: left;
          }
  
          .es-right {
              float: right;
          }
  
          .es-p5 {
              padding: 5px;
          }
  
          .es-p5t {
              padding-top: 5px;
          }
  
          .es-p5b {
              padding-bottom: 5px;
          }
  
          .es-p5l {
              padding-left: 5px;
          }
  
          .es-p5r {
              padding-right: 5px;
          }
  
          .es-p10 {
              padding: 10px;
          }
  
          .es-p10t {
              padding-top: 10px;
          }
  
          .es-p10b {
              padding-bottom: 10px;
          }
  
          .es-p10l {
              padding-left: 10px;
          }
  
          .es-p10r {
              padding-right: 10px;
          }
  
          .es-p15 {
              padding: 15px;
          }
  
          .es-p15t {
              padding-top: 15px;
          }
  
          .es-p15b {
              padding-bottom: 15px;
          }
  
          .es-p15l {
              padding-left: 15px;
          }
  
          .es-p15r {
              padding-right: 15px;
          }
  
          .es-p20 {
              padding: 20px;
          }
  
          .es-p20t {
              padding-top: 20px;
          }
  
          .es-p20b {
              padding-bottom: 20px;
          }
  
          .es-p20l {
              padding-left: 20px;
          }
  
          .es-p20r {
              padding-right: 20px;
          }
  
          .es-p25 {
              padding: 25px;
          }
  
          .es-p25t {
              padding-top: 25px;
          }
  
          .es-p25b {
              padding-bottom: 25px;
          }
  
          .es-p25l {
              padding-left: 25px;
          }
  
          .es-p25r {
              padding-right: 25px;
          }
  
          .es-p30 {
              padding: 30px;
          }
  
          .es-p30t {
              padding-top: 30px;
          }
  
          .es-p30b {
              padding-bottom: 30px;
          }
  
          .es-p30l {
              padding-left: 30px;
          }
  
          .es-p30r {
              padding-right: 30px;
          }
  
          .es-p35 {
              padding: 35px;
          }
  
          .es-p35t {
              padding-top: 35px;
          }
  
          .es-p35b {
              padding-bottom: 35px;
          }
  
          .es-p35l {
              padding-left: 35px;
          }
  
          .es-p35r {
              padding-right: 35px;
          }
  
          .es-p40 {
              padding: 40px;
          }
  
          .es-p40t {
              padding-top: 40px;
          }
  
          .es-p40b {
              padding-bottom: 40px;
          }
  
          .es-p40l {
              padding-left: 40px;
          }
  
          .es-p40r {
              padding-right: 40px;
          }
  
          .es-menu td {
              border: 0;
          }
  
          a {
              text-decoration: none;
          }
  
          p,
          ul li,
          ol li {
              font-family: "Open Sans", sans-serif;
              line-height: 150%;
          }
  
          ul li,
          ol li {
              Margin-bottom: 15px;
          }
  
          .es-menu td a {
              text-decoration: none;
              display: block;
              font-family: "Open Sans", sans-serif;
          }
  
          .es-menu amp-img,
          .es-button amp-img {
              vertical-align: middle;
          }
  
          .es-wrapper {
              width: 100%;
              height: 100%;
          }
  
          .es-wrapper-color {
              background-color: #EFF2F7;
          }
  
          .es-header {
              background-color: #0050D8;
          }
  
          .es-header-body {
              background-color: #0C66FF;
          }
  
          .es-header-body p,
          .es-header-body ul li,
          .es-header-body ol li {
              color: #EFEFEF;
              font-size: 12px;
          }
  
          .es-header-body a {
              color: #FFFFFF;
              font-size: 12px;
          }
  
          .es-content-body {
              background-color: #FEFEFE;
          }
  
          .es-content-body p,
          .es-content-body ul li,
          .es-content-body ol li {
              color: #8492A6;
              font-size: 14px;
          }
  
          .es-content-body a {
              color: #0C66FF;
              font-size: 14px;
          }
  
          .es-footer {
              background-color: #141B24;
          }
  
          .es-footer-body {
              background-color: #273444;
          }
  
          .es-footer-body p,
          .es-footer-body ul li,
          .es-footer-body ol li {
              color: #8492A6;
              font-size: 12px;
          }
  
          .es-footer-body a {
              color: #FFFFFF;
              font-size: 12px;
          }
  
          .es-infoblock,
          .es-infoblock p,
          .es-infoblock ul li,
          .es-infoblock ol li {
              line-height: 120%;
              font-size: 16px;
              color: #FFFFFF;
          }
  
          .es-infoblock a {
              font-size: 16px;
              color: #FFFFFF;
          }
  
          h1 {
              font-size: 26px;
              font-style: normal;
              font-weight: bold;
              color: #3C4858;
          }
  
          h2 {
              font-size: 18px;
              font-style: normal;
              font-weight: normal;
              color: #3C4858;
          }
  
          h3 {
              font-size: 16px;
              font-style: normal;
              font-weight: bold;
              color: #888888;
              letter-spacing: 0px;
          }
  
          .es-header-body h1 a,
          .es-content-body h1 a,
          .es-footer-body h1 a {
              font-size: 26px;
          }
  
          .es-header-body h2 a,
          .es-content-body h2 a,
          .es-footer-body h2 a {
              font-size: 18px;
          }
  
          .es-header-body h3 a,
          .es-content-body h3 a,
          .es-footer-body h3 a {
              font-size: 16px;
          }
  
          a.es-button,
          button.es-button {
              border-style: solid;
              border-color: #0C66FF;
              border-width: 15px 30px 15px 30px;
              display: inline-block;
              background: #0C66FF;
              border-radius: 0px;
              font-size: 14px;
              font-family: "Open Sans", sans-serif;
              font-weight: bold;
              font-style: normal;
              line-height: 120%;
              color: #FFFFFF;
              text-decoration: none;
              width: auto;
              text-align: center;
          }
  
          .es-button-border {
              border-style: solid solid solid solid;
              border-color: #0C66FF #0C66FF #0C66FF #0C66FF;
              background: #0C66FF;
              border-width: 0px 0px 0px 0px;
              display: inline-block;
              border-radius: 0px;
              width: auto;
          }
  
          .es-p-default {
              padding-top: 20px;
              padding-right: 15px;
              padding-bottom: 0px;
              padding-left: 15px;
          }
  
          .es-p-all-default {
              padding: 0px;
          }
  
          @media only screen and (max-width:600px) {
  
              p,
              ul li,
              ol li,
              a {
                  line-height: 150%
              }
  
              h1,
              h2,
              h3,
              h1 a,
              h2 a,
              h3 a {
                  line-height: 120%
              }
  
              h1 {
                  font-size: 28px;
                  text-align: left
              }
  
              h2 {
                  font-size: 20px;
                  text-align: left
              }
  
              h3 {
                  font-size: 14px;
                  text-align: left
              }
  
              h1 a {
                  text-align: left
              }
  
              .es-header-body h1 a,
              .es-content-body h1 a,
              .es-footer-body h1 a {
                  font-size: 28px
              }
  
              h2 a {
                  text-align: left
              }
  
              .es-header-body h2 a,
              .es-content-body h2 a,
              .es-footer-body h2 a {
                  font-size: 20px
              }
  
              h3 a {
                  text-align: left
              }
  
              .es-header-body h3 a,
              .es-content-body h3 a,
              .es-footer-body h3 a {
                  font-size: 14px
              }
  
              .es-menu td a {
                  font-size: 14px
              }
  
              .es-header-body p,
              .es-header-body ul li,
              .es-header-body ol li,
              .es-header-body a {
                  font-size: 14px
              }
  
              .es-content-body p,
              .es-content-body ul li,
              .es-content-body ol li,
              .es-content-body a {
                  font-size: 14px
              }
  
              .es-footer-body p,
              .es-footer-body ul li,
              .es-footer-body ol li,
              .es-footer-body a {
                  font-size: 14px
              }
  
              .es-infoblock p,
              .es-infoblock ul li,
              .es-infoblock ol li,
              .es-infoblock a {
                  font-size: 14px
              }
  
              *[class="gmail-fix"] {
                  display: none
              }
  
              .es-m-txt-c,
              .es-m-txt-c h1,
              .es-m-txt-c h2,
              .es-m-txt-c h3 {
                  text-align: center
              }
  
              .es-m-txt-r,
              .es-m-txt-r h1,
              .es-m-txt-r h2,
              .es-m-txt-r h3 {
                  text-align: right
              }
  
              .es-m-txt-l,
              .es-m-txt-l h1,
              .es-m-txt-l h2,
              .es-m-txt-l h3 {
                  text-align: left
              }
  
              .es-m-txt-r amp-img {
                  float: right
              }
  
              .es-m-txt-c amp-img {
                  margin: 0 auto
              }
  
              .es-m-txt-l amp-img {
                  float: left
              }
  
              .es-button-border {
                  display: block
              }
  
              a.es-button,
              button.es-button {
                  font-size: 14px;
                  display: block;
                  border-bottom-width: 20px;
                  border-right-width: 0px;
                  border-left-width: 0px
              }
  
              .es-btn-fw {
                  border-width: 10px 0px;
                  text-align: center
              }
  
              .es-adaptive table,
              .es-btn-fw,
              .es-btn-fw-brdr,
              .es-left,
              .es-right {
                  width: 100%
              }
  
              .es-content table,
              .es-header table,
              .es-footer table,
              .es-content,
              .es-footer,
              .es-header {
                  width: 100%;
                  max-width: 600px
              }
  
              .es-adapt-td {
                  display: block;
                  width: 100%
              }
  
              .adapt-img {
                  width: 100%;
                  height: auto
              }
  
              td.es-m-p0 {
                  padding: 0px
              }
  
              td.es-m-p0r {
                  padding-right: 0px
              }
  
              td.es-m-p0l {
                  padding-left: 0px
              }
  
              td.es-m-p0t {
                  padding-top: 0px
              }
  
              td.es-m-p0b {
                  padding-bottom: 0
              }
  
              td.es-m-p20b {
                  padding-bottom: 20px
              }
  
              .es-mobile-hidden,
              .es-hidden {
                  display: none
              }
  
              tr.es-desk-hidden,
              td.es-desk-hidden,
              table.es-desk-hidden {
                  width: auto;
                  overflow: visible;
                  float: none;
                  max-height: inherit;
                  line-height: inherit
              }
  
              tr.es-desk-hidden {
                  display: table-row
              }
  
              table.es-desk-hidden {
                  display: table
              }
  
              td.es-desk-menu-hidden {
                  display: table-cell
              }
  
              table.es-table-not-adapt,
              .esd-block-html table {
                  width: auto
              }
  
              table.es-social {
                  display: inline-block
              }
  
              table.es-social td {
                  display: inline-block
              }
          }
      </style>
  </head>

<body data-new-gr-c-s-check-loaded="8.887.0" data-gr-ext-installed>
    <div class="es-wrapper-color">
        <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#eff2f7"></v:fill> </v:background><![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td valign="top">
                    <table class="es-header" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                            <td style="background-color: transparent" bgcolor="transparent" align="center">
                                <table class="es-header-body" style="background-color: #0c66ff" width="600"
                                    cellspacing="0" cellpadding="0" bgcolor="#0c66ff" align="center">
                                    <tr>
                                        <td class="es-p20t es-p20b es-p15r es-p15l" align="left">
                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td class="es-m-p0r" width="570" valign="top" align="center">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation">
                                                            <tr>
                                                                <td class="es-m-txt-c" style="font-size: 0px"
                                                                    align="center"><a target="_blank"
                                                                        <amp-img
                                                                            src="https://uffrxz.stripocdn.email/content/guids/05946903-ad70-4566-b208-84dbe64104ed/images/logo.png"
                                                                            alt style="display: block" width="210"
                                                                            height="74"></amp-img>
                                                                    </a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                            <td align="center">
                                <table class="es-content-body" width="600" cellspacing="0" cellpadding="0"
                                    bgcolor="#fefefe" align="center">
                                    <tr>
                                        <td class="es-p40t es-p40b es-p15r es-p15l" align="left">
                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td width="570" valign="top" align="center">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation">
                                                            <tr>
                                                                <td align="center">
                                                                    <h1>Thank you for using Kindie.</h1>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="es-p10t" align="center">
                                                                    <p>Thank you for becoming our user, and giving us
                                                                        your time to have loving relationship.<br>Now
                                                                        that you created your account you must verify
                                                                        it.<br></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="es-p40t es-p20b" align="center"><span
                                                                        class="es-button-border"><a
                                                                            href="${process.env.CORS_ORIGIN}/verify-account/${token}"
                                                                            class="es-button" target="_blank">Verify
                                                                            your account</a></span></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table class="es-footer" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                            <td align="center">
                                <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0"
                                    bgcolor="#ffffff" align="center">
                                    <tr>
                                        <td class="es-p40t es-p40b es-p15r es-p15l" align="left">
                                            <!--[if mso]><table width="570" cellpadding="0" cellspacing="0"><tr><td width="180" valign="top"><![endif]-->
                                            <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                <tr>
                                                    <td class="es-m-p20b" width="180" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td style="display: none" align="center"></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td width="20"></td>
<td width="370" valign="top"><![endif]-->
                                            <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                <tr>
                                                    <td width="370" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation">
                                                            <tr>
                                                                <td class="es-m-txt-c" style="font-size: 0px"
                                                                    align="center"><a target="_blank"
                                                                        <amp-img
                                                                            src="https://uffrxz.stripocdn.email/content/guids/05946903-ad70-4566-b208-84dbe64104ed/images/logo.png"
                                                                            alt style="display: block" width="150"
                                                                            height="53"></amp-img>
                                                                    </a></td>
                                                            </tr>
                                                            <tr>
                                                                <td class="es-m-txt-c es-p20t es-p20b" align="left">
                                                                    <p><br></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                            <td align="center">
                                <table class="es-content-body" style="background-color: transparent" width="600"
                                    cellspacing="0" cellpadding="0" bgcolor="transparent" align="center">
                                    <tr>
                                        <td class="es-p30t es-p30b es-p20r es-p20l" align="left">
                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td width="560" valign="top" align="center">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td style="display: none" align="center"></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>
  `;
};
