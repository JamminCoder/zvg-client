import Button from "../../components/Button";
import { preventDefaults } from "../../lib/utils";
import  { useEffect, useState } from "react";
import { LoadingPage } from "../../components/Loading";
import * as authEndpoints from "../../endpoints/auth";


function EmailVerification({ className }) {
    const [isVerified, setIsVerified] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        if (isLoaded) return;

        if (!isVerified) {
            authEndpoints.checkEmailVerificationStatus()
            .then(isVerifiedResult => {
                setIsVerified(isVerifiedResult);
            })
            .catch(err => console.log(err));
            setIsLoaded(true);
        }
    });

    function handleClick() {
        authEndpoints.sendVerifyEmailRequest();
        setRequestSent(true);
    }

    if (!isVerified && isLoaded) return (
        <div className={ className }>
            {
                requestSent
                ? "An email verification link has been sent to you inbox"
                : <div>
                    <p>Your email is not verified</p>

                    <Button 
                    onClick={ handleClick } 
                    className="bg-green-500 text-white w-fit">Verify Email</Button>
                </div>
            }
        </div>
    );

    if (isLoaded && isVerified) return "Email is verified";

    return;
}

function UpdateEmailForm({ user }) {
    const [confirmation, setConfirmation] = useState(false);
    const [message, setMessage] = useState(null);
    const formID = "update_email_form";

    function handleConfirmClick(e) {
        preventDefaults(e);

        setConfirmation(!confirmation);
    }

    function submit(e) {
        preventDefaults(e);
        authEndpoints.updateEmail(document.getElementById(formID))
        .then(res => {
            setMessage(res.data);
        });
    }

    
    return (
    <div className="grid gap-4">
        <EmailVerification className="mb-8" />
        <form
        id={ formID } method="POST" action={ authEndpoints.ADMIN_EMAIL_UPDATE }>
            <label htmlFor="email">Admin Email:</label><br />
            <input className="mb-4" type="email" name="email" defaultValue={ user.email }/>
            <Button onClick={ handleConfirmClick } className="bg-slate-700 text-white block">{ confirmation ? "Cancel": "Update Email" }</Button>
            {
                confirmation
                ? <div className="grid gap-4 w-fit">
                    <p>Enter your password first.</p>
                    { message }
                    <input type="password" name="password" id="password" required/>
                    <Button onClick={ submit } className="bg-green-500 text-white block">Confirm</Button>
                  </div>
                : ""
            }
        </form>
    </div>
    );
}

function UpdatePasswordForm() {
    const formID = "update_password_form";

    function submit(e) {
        preventDefaults(e);
        authEndpoints.updatePassword(document.getElementById(formID))
        .then(console.log)
        .catch(console.log);
    }

    return (
    <form id={ formID } action={ authEndpoints.ADMIN_PASSWORD_UPDATE } method="POST" onSubmit={ submit } className="grid gap-4 mb-16">
        <h1 className="text-4xl">Update Password</h1>
        <div>
            <label htmlFor="password">Current Password</label><br />
            <input type="text" name="current_password" id="current_password" />
        </div>
        <div>
            <label htmlFor="password">New Password</label><br />
            <input type="password" name="password" id="password" />
        </div>
        <div>
            <label htmlFor="password_confirmation">Confirm New Password</label><br />
            <input type="password" name="password_confirmation" id="password_confirmation" />
        </div>
        <Button onClick={ submit } className="bg-green-500 text-white w-fit">Update Password</Button>

    </form>
    )
}

export default function Account() {
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (isLoaded) return;
        
        authEndpoints.getUser()
        .then(user => {
            setUser(user);
            console.log(user);
        }).catch(console.error)
        .finally(() => setIsLoaded(true));
    });

    if (!isLoaded) return <LoadingPage/>

    return (
    <div className="grid gap-8">
        {
            user
            ? <UpdateEmailForm user={ user }/>
            : ""
        }
        <UpdatePasswordForm/>
    </div>
    );
}