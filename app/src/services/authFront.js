import auth from "../helper/auth"

class AuthFront {
    
    login(data){
        auth("/login", "POST", data)     
        .then(res => {
          localStorage.setItem('accessToken', res.body.accessToken);
          localStorage.setItem('refreshToken', res.body.refreshToken);
          localStorage.setItem('expires_in', res.body.expires_in);
        });
    }

    check(data){
        auth("/info", "POST", data)
        .then(res =>{
            if(res.status === 200)
                console.log(res);                      
        })
        .catch(err => {
            console.log.JSON(err);
        });
    }
}

module.export = new AuthFront(); 