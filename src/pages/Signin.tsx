import { SigninleftComp } from "../components/signincomp/SigninleftComp"
import { SigninInput } from "../components/signincomp/SigninInput"

export const Signin = () =>{
    return (
        <div className="grid grid-cols-2 ">
            <SigninInput type="signin"></SigninInput>
            <SigninleftComp></SigninleftComp>
        </div>
    )
}
