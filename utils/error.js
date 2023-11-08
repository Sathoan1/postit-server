const handleError = (err)=> {
    let errors = {
        username: '',
        email: '',
        password: '',
    };
    if (err.code === 11000 && err.keyValue.email){
        errors.email = 'Email is already in use';
        return errors
     };
     if (err.code === 11000 && err.keyValue.username){
        errors.username = 'Username exists already';
        return errors
     };
    //  taking error message from auth
       if (err.message=== 'no user'){
        errors.email= 'this email is not registered'
        return errors;
       }
       if (err.message=== 'invalid'){
        errors.email= 'email or password is incorrect'
        errors.password= 'email or password is incorrect'
        return errors;
       }
    //  handle user validation error
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach((properties)=>{
          errors[properties.path]= properties.message
        })
        return errors;
    }
    }
    module.exports= handleError
