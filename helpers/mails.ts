import nodemailer from "nodemailer";
export interface personalInfoType {
  email: string;
  name: string;
  token: string;
}
export const registerVerification = async({email, name, token}: personalInfoType) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: 2525,
        secure: true,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASSWORD
        }
      });

      transport.verify()
      .then(()=>{
      console.log("transport successfully verified");
      })
      .catch((error)=>{
      console.error(error);
      });
      // email template
       await transport.sendMail({
    from:`task-tracker app - <accounts@task-tracker.com> `,
        to: email,
        subject: `task-tracker app - verify your email account`,
        text: `Verify your email account`,
        html: 
        `
        <p> <strong>Hi! ${name}</strong> - verify your task-tracker account, click on the link below</p>

      
        <a href="${process.env.FRONTEND_URL}/confirm-account/${token}"> Verify Account</a>
  <hr/>
        <small>If you did not create an account, no further action is required.
        You are receiving this email because this is an important message regarding your account.</small>
        `
})
};



export const forgottenPasswordVerification = async({email, name, token}: personalInfoType) => {
  const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD
      }
    });

    transport.verify()
      .then(()=>{
      console.log("gmail successfully updated")
      })
      .catch((error)=>{
      console.error(error);
      });

    const emailInfo = await transport.sendMail({
  from:`task-tracker app - <accounts@task-tracker.com> `,
      to: email,
      subject: `task-tracker app - Recovery password action`,
      text: `Recovery password action`,
      html: 
      `
      <p> <strong>Hi! ${name}</strong> - this email is being sent to you because you asked for a recovery password action</p>
<p>Follow the link belog and reset your password</p>
        
        <a href="${process.env.FRONTEND_URL}/forgotten-password/recovery?token=${token}">Reset password</a>

        <p>If you did not asked for a recovery password action please dismiss this email</p>
      
      `
})
};
