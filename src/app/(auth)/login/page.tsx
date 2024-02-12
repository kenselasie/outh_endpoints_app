import React from 'react'
import { redirect } from 'next/navigation';

const Login = async () => {
    redirect('https://api.stg.withrotate.com/api/auth/oauth_authorize?redirect_uri=http://localhost:3000');
}

export default Login