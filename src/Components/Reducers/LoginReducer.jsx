export const reducer = (state, action) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    switch (action.type) {

        case "email":
           if(action.payload.match(mailformat)){
                return {
                    ...state, emailId: action.payload
                    , emailError: action.payload === "" ? "Please Enter Email" : ""
                }
            }
            else{
                return{
                    ...state,emailId:action.payload
                    ,emailError:"Please enter valid email"
                }
            }

        case "password":
            return { ...state, password: action.payload, 
                passError: action.payload === "" ? "Please Enter Password" : action.payload.length !== 6 ? "Please enter 6 characters password" : "" 
            }

        case "login":
            return{
                ...state,
                emailError: action.payload[0] === "" ? "Please Enter Email" :action.payload[0].match(mailformat)? "":"Please enter valid email",
                passError: action.payload[1] === "" ? "Please Enter Password" : action?.payload?.length !== 6 ? "Please enter 6 characters password" : ""
            
            }
     }


 }
