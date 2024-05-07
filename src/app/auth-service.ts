import { Injectable } from "@angular/core";
import { AuthConfig, OAuthService, UserInfo } from "angular-oauth2-oidc";
import { authCodeFlowConfig } from "./auth-code-flow-config";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userProfileSubject = new Subject<any>();

    constructor(private readonly oauthService: OAuthService) {
        oauthService.configure(authCodeFlowConfig);
        oauthService.loadDiscoveryDocument().then(() => {
            oauthService.tryLoginImplicitFlow().then(() => {
                if (!oauthService.hasValidAccessToken()) {
                    oauthService.initLoginFlow()
                } else {
                    oauthService.loadUserProfile().then((userProfile) => {
                        this.userProfileSubject.next(userProfile as UserInfo)
                    })
                }
            })
        })
    }

    isLoggedIn(): boolean {
        return this.oauthService.hasValidAccessToken()
    }

    signOut() {
        this.oauthService.logOut()
    }
}