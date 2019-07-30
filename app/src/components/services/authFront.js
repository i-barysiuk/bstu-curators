import auth from "../../helper/auth"

class AuthFront {
    login(data){
        auth("/login", "POST", { login: data.login, password: data.password})     
        .then(res => {
          localStorage.setItem('accessToken', res.body.accessToken);
          localStorage.setItem('refreshToken', res.body.refreshToken);
          localStorage.setItem('expires_in', res.body.expires_in);
          document.location.replace("/");
        });
    }
    check(data){
        auth("/info", "POST", {login: data.login})
        .then(res =>{
            if(res.status === 200)
                next();           
        })
        .catch(err => {
            console.log.JSON(err);
        });
    }
}

module.export = new AuthFront(); 