import { GoogleSignIn } from "client-sdk";
import { UserData } from "client-sdk/dist/types";
import React from "react";

export const LoginButton = ({ user }: { user?: UserData }) => user === null ? <GoogleSignIn /> : undefined;
