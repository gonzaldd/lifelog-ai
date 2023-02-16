export default async (req, res, next) => {
 try {
    if(!req.body['g-recaptcha-response']){
        throw new Error('recaptcha error');
    }
  
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify";

    const response = await fetch(verificationURL, {
        method: "POST",
        body: `secret=${process.env.RECAPTCHA_TOKEN}&response=${req.body['g-recaptcha-response']}`, 
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = await response.json();
    if(!data.success) throw "reCaptcha success error"
    next()
 }catch (error){
    res.status(401).send({ message: "reCaptcha error" })
 }
}