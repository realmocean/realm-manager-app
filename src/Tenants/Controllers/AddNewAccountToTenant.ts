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
    cVertical
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

export class AddNewAccountToTenant extends UIController {

    @State()
    private tenant_id: string;

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

    public BindRouterParams({ tenant_id }) {

        this.tenant_id = tenant_id;


        const orgService = useOrgProvider();

        orgService.getTenantById(tenant_id).then(tenant => {
            this.tenantName = tenant.Name;
        })

    }
    public BindModel() {

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

            orgService.createAccountAndAddToTenant(this.tenant_id, this.accountName, this.accountFirstName, this.accountLastName, this.accountPassword, this.accountEmail, !!this.isTenantAdmin).then(response => {
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
                            content: (
                                ScrollView({ axes: cVertical, alignment: cTop })(
                                    VStack({ alignment: cTop, spacing: 10 })(
                                        Views.FormSection({
                                            title: 'Account Info',
                                            content: (
                                                VStack({ spacing: 15 })(
                                                    UITextBoxView().placeholder('Account Name *').value(this.accountName)
                                                        .floatlabel(true)
                                                        .width('100%')
                                                        .change(e => this.accountName = e)
                                                        .lineColor(this.isFormNotValid ? 'red' : null)
                                                    ,
                                                    UITextBoxView().value(this.accountFirstName).placeholder('First Name').floatlabel(true).width('100%').change(e => this.accountFirstName = e),
                                                    UITextBoxView().value(this.accountLastName).placeholder('Last Name').floatlabel(true).width('100%').change(e => this.accountLastName = e),
                                                    UITextBoxView().value(this.accountEmail).placeholder('Email Address *').floatlabel(true).width('100%').change(e => this.accountEmail = e),
                                                )
                                            )

                                        }),
                                        Views.FormSection({
                                            title: 'Authorization',
                                            content: (
                                                HStack({ alignment: cLeading, spacing: 15 })(
                                                    Text('Tenant Manager'),
                                                    UISwitch().checked(this.isTenantAdmin).change((e)=> this.isTenantAdmin = e.checked)
                                                )
                                            ).height()

                                        }),
                                        Views.FormSection({
                                            title: 'Password',
                                            content: (
                                                VStack({ spacing: 15 })(
                                                    UITextBoxView().value(this.accountPassword).placeholder('Password *').floatlabel(true).width('100%').change(e => this.accountPassword = e),
                                                    UITextBoxView().value(this.accountPassword1).placeholder('Password Again *').floatlabel(true).width('100%').change(e => this.accountPassword1 = e)
                                                )
                                            )

                                        }),
                                        HStack({ alignment: cTrailing })(
                                            UIButtonView().text(this.tenant_info == null ? 'Create Account' : 'Update Tenant')
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

                        })
                    )
                )
            )
        }
    }
}