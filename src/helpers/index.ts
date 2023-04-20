import crypto from 'crypto';


const SECRETE ="RAHEEM-API"
export const random =()=> crypto.randomBytes(128).toString("base64");
export const authentication =(salt:string |undefined,password:string)=>{
    return crypto.createHmac("sha256",[salt,password].join('/')).update(SECRETE).digest('hex');
}