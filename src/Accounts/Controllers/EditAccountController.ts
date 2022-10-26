import {
    cLeading, cTop, cTopLeading, cTrailing, cVertical, HStack, ScrollView, Spinner,
    State,
    Text, UIController,
    UIScene,
    VStack
} from '@tuval/forms';


import { bindNavigate } from '@tuval/forms';

import { UIButtonView, UISwitch } from '@realmocean/buttons';
import { useOrgProvider } from '@realmocean/common';
import { UITextBoxView } from '@realmocean/inputs';
import { is } from '@tuval/core';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { Views } from '../../Views/Views';

export class EditAccountController extends UIController {

    @State()
    private formIsReady: boolean;

    @State()
    private account_id: string;


    @State()
    private accountName: string;

    @State()
    private accountFirstName: string;

    @State()
    private accountLastName: string;

    @State()
    private accountEmail: string;


    @State()
    private isRealmAdmin: boolean;

    @State()
    private isFormNotValid: boolean;

    public BindRouterParams({ account_id }) {

        this.BeginUpdate();

        this.account_id = account_id;


        const orgService = useOrgProvider();

        orgService.getAccountById(account_id).then(account => {
            this.accountName = account.Name;
            this.accountFirstName = account.FirstName;
            this.accountLastName = account.LastName;
            this.accountEmail = account.EMail;
            this.isRealmAdmin = account.IsRealmAdmin;
            this.EndUpdate();
            this.formIsReady = true;
        })

    }


    private isFormValid(): boolean {
        let result = true;

        if (is.nullOrEmpty(this.accountName)) {
            result = false;
        }

        this.isFormNotValid = !result;
        return result;
    }
    private action_Save() {

        if (this.isFormValid()) {
            const orgService = useOrgProvider();

            orgService.updateAccount(this.account_id, this.accountName, this.accountFirstName, this.accountLastName, this.accountEmail, !!this.isRealmAdmin).then(response => {
                this.navigotor(`/app(realmmanager)/account/list`, { state: { tenant_name: this.tenantName }, replace: true });
            });
        }
    }

    public LoadView(): any {
        this.navigotor = bindNavigate();
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(

                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Accounts'),
                        Views.RightSidePage({
                            title: `Update Account`,
                            content: this.formIsReady ? (
                                ScrollView({ axes: cVertical, alignment: cTop })(
                                    VStack({ alignment: cTop, spacing: 10 })(
                                        Views.FormSection({
                                            title: 'Account Info',
                                            content: (
                                                VStack({ spacing: 15 })(
                                                    UITextBoxView().placeholder('Account Name *')
                                                        .value(this.accountName)
                                                        .floatlabel(true)
                                                        .width('100%')
                                                        .change(e => this.accountName = e)
                                                        .lineColor(this.isFormNotValid ? 'red' : null)
                                                    ,
                                                    UITextBoxView().placeholder('First Name').value(this.accountFirstName).floatlabel(true).width('100%').change(e => this.accountFirstName = e),
                                                    UITextBoxView().placeholder('Last Name').value(this.accountLastName).floatlabel(true).width('100%').change(e => this.accountLastName = e),
                                                    UITextBoxView().placeholder('Email Address *').value(this.accountEmail).floatlabel(true).width('100%').change(e => this.accountEmail = e),
                                                )
                                            )

                                        }),
                                        Views.FormSection({
                                            title: 'Authorization',
                                            content: (
                                                HStack({ alignment: cLeading, spacing: 15 })(
                                                    Text('Realm Manager'),
                                                    UISwitch().checked(this.isRealmAdmin).change((e) => this.isRealmAdmin = e.checked)
                                                )
                                            ).height()

                                        }),
                                       
                                        HStack({ alignment: cTrailing })(
                                            UIButtonView().text('Update Account')
                                                .onClick(() => this.action_Save())

                                        ).height(),
                                    ).padding('1rem')
                                        .width(600).height()
                                )

                                /*  VStack({ alignment: cTopLeading, spacing: 10 })(
                                     Views.InputTextView('Full Name *', 'Enter a name', $(this.accountName), true, $(this.isAccountNameInvalid), 'Name is required.', this.formPostTried),
                                     Views.EmailInputView('Email Address *', 'Enter email address', $(this.accountEmail), $(this.isAccountEmailInvalid), this.formPostTried),
                                     Views.InputPasswordView('Password *', 'Enter a password', $(this.accountPassword), true, $(this.isAccountPasswordInvalid), 'Password required.', this.formPostTried),
                                     Views.SwitchView('Is Tenant Admin', $(this.isTenantAdmin)),
                                     Views.AcceptButton({ label: 'Create Account', action: () => this.ActionPost() }),

                                 ).background(Color.white) */
                            )
                                :
                                Spinner()

                        })
                    )

                )
            )
        }
    }
}