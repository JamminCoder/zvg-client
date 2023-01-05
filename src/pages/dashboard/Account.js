import Button from "../../components/Button";
import { checkEmailVerificationStatus, sendVerifyEmailRequest } from "../../lib/auth";
import { preventDefaults } from "../../lib/utils";
import  { useEffect, useState } from "react";
import { updatePassword } from "../../api";

import * as authEndpoints from "../../endpoints/auth";


function EmailVerification({ className }) {
    const [isVerified, setIsVerified] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        if (isLoaded) return;

        if (!isVerified) {
            checkEmailVerificationStatus()
            .then(isVerifiedResult => {
                setIsVerified(isVerifiedResult);
            })
            .catch(err => console.log(err));
            setIsLoaded(true);
        }
    });

    function handleClick() {
        sendVerifyEmailRequest();
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

function UpdatePasswordForm() {
    const formID = "update_password_form";

    function submit(e) {
        preventDefaults(e);
        updatePassword(document.getElementById(formID))
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
            <input type="text" name="password" id="password" />
        </div>
        <div>
            <label htmlFor="password_confirmation">Confirm New Password</label><br />
            <input type="text" name="password_confirmation" id="password_confirmation" />
        </div>
        <Button onClick={ submit } className="bg-green-500 text-white w-fit">Update Password</Button>

    </form>
    )
}

export default function Account() {
    return (
    <div>
        <EmailVerification className="mb-8"/>
        <UpdatePasswordForm/>
    </div>
    );
}