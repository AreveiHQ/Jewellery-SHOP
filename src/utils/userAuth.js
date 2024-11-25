import jwt from 'jsonwebtoken';
import { ForbiddenError } from '@/lib/errors';
export  const UserAuth = (req)=>{
  try{
    const headToken = req.headers.get('Authorization');

    if (!headToken || !headToken.startsWith('Bearer ')) {
      throw new ForbiddenError('Invalid Token');
    }
    const token = headToken.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.NEXT_PUBLIC_JWT_SECRET)
    return decodedToken.userId;
}catch(error){
  throw new Error(error)
}
}