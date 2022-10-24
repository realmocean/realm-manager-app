import {
    cLeading,
    cTopLeading,
    HStack,
    Spacer,
    Spinner,
    State,
    Text,
    TextField,
    UIButton,
    UIController,
    UIScene,
    VStack,
    cHorizontal,
    Toggle,
    $,
    cTop,
    cTrailing,
    ForEach,
    ScrollView,
    cVertical,
    RenderingTypes
} from '@tuval/forms';

import { RealmBrokerClient, IGetTenantByIdResponse } from '../../Services/RealmBrokerClient';
import { TenantsGrid } from '../Views/TenantsGrid';
import { Color, UIImage, UIRouteLink, NavigateFunction, bindNavigate, Binding } from '@tuval/forms';
import { ActionButton } from '../../Views/ActionButton';
import { TenantsController } from './TenantsController';
import { Services } from '../../Services/Services';
import { Views } from '../../Views/Views';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { UITextBoxView } from '@realmocean/inputs';
import { UIButtonView, UISwitch } from '@realmocean/buttons';
import { useOrgProvider } from '@realmocean/common';
import { is } from '@tuval/core';

export class EditTenantAccount extends UIController {

    @State()
    private formIsReady: boolean;

    @State()
    private tenant_id: string;

    @State()
    private account_id: string;

    @State()
    private tenantName: string;



    @State()
    private accountName: string;

    @State()
    private accountFirstName: string;

    @State()
    private accountLastName: string;

    @State()
    private accountEmail: string;

    @State()
    private accountPassword: string;

    @State()
    private accountPassword1: string;

    @State()
    private isTenantAdmin: boolean;

    @State()
    private isFormNotValid: boolean;

    public BindRouterParams({ tenant_id, account_id }) {

        this.BeginUpdate();

        this.tenant_id = tenant_id;
        this.account_id = account_id;


        const orgService = useOrgProvider();

        orgService.getTenantById(tenant_id).then(tenant => {
            this.tenantName = tenant.Name;
        })

        orgService.getAccountById(account_id).then(account => {
            this.accountName = account.Name;
            this.accountFirstName = account.FirstName;
            this.accountLastName = account.LastName;
            this.accountEmail = account.EMail;
            this.isTenantAdmin = account.IsTenantAdmin;
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

            orgService.updateTenantAccount(this.account_id, this.accountName, this.accountFirstName, this.accountLastName, this.accountEmail, !!this.isTenantAdmin).then(response => {
                this.navigotor(`/app(realmmanager)/tenant/${this.tenant_id}/accounts`, { state: { tenant_name: this.tenantName }, replace: true });
            });
        }

    }

    private ActionCancel(AppController_ContextAction_SetController: Function) {
        AppController_ContextAction_SetController(new TenantsController());
    }

    public LoadView(): any {
        this.navigotor = bindNavigate();
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(

                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Tenants'),
                        Views.RightSidePage({
                            title: `Add Account to ${this.tenantName}`,
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
                                                    Text('Tenant Manager'),
                                                    UISwitch().checked(this.isTenantAdmin).change((e) => this.isTenantAdmin = e.checked)
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