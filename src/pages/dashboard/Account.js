import Button from "../../components/Button";
import { checkEmailVerificationStatus, sendVerifyEmailRequest, XSRF_HEADER } from "../../lib/auth";
import { preventDefaults } from "../../lib/utils";
import  { useEffect, useState } from "react";


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

export default function Account() {
    function submit(e) {
        preventDefaults(e);
        console.log("Submitting form...");
    }


    return (
    <div>
        <EmailVerification className="mb-8"/>
        <form action="#" method="POST" onSubmit={ submit } className="grid gap-4 mb-16">
            <h1 className="text-4xl">Update Password</h1>
            <div>
                <label htmlFor="current_password">Current Password</label><br />
                <input type="password" name="current_password" id="current_password" />
            </div>
            <div>
                <label htmlFor="new_password">New Password</label><br />
                <input type="password" name="new_password" id="new_password" />
            </div>
            <div>
                <label htmlFor="confirm_new_password">Confirm New Password</label><br />
                <input type="password" name="confirm_new_password" id="confirm_new_password" />
            </div>
            <Button onClick={ submit } className="bg-green-500 text-white w-fit">Update Password</Button>

        </form>
    </div>
    );
}